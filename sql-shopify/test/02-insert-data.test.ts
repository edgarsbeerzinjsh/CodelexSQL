import _ from "lodash";
import { Database } from "../src/database";
import { ShopifyCsvLoader } from "../src/data/shopify-csv-loader";
import { App, Category, AppCategory, KeyBenefit, Review, PricingPlan, PricingPlanPrice } from "../src/data/shopify-types";
import { APPS, CATEGORIES, KEY_BENEFITS, PRICING_PLANS, REVIEWS, APPS_CATEGORIES, APPS_PRICING_PLANS } from "../src/shopify-table-names";
import { escape } from "../src/utils";
import { minutes, seconds } from "./utils";
import { 
    selectCount, 
    selectRowById, 
    selectCategoryByTitle, 
    selectAppCategoriesByAppId, 
    selectUnigueRowCount } from "../src/queries/select";
import { resolve } from "path";

const pricingPlansDir = resolve(__dirname, "../_data/pricing_plans.csv");

const insertApps = (apps: App[]) => {
    return (
        `todo` + 
        apps.map(app => `('${app.url}',
            '${escape(app.title)}',
            '${escape(app.tagline)}',
            '${escape(app.developer)}',
            '${escape(app.developerLink)}',
            '${escape(app.icon)}',
            ${app.rating},
            ${app.reviewsCount},
            '${escape(app.description)}',
            '${escape(app.pricingHint)}')`).join(",")
    );
};

const insertCategories = (categories: Category[]) => {
    return (
        `todo` + 
        categories.map(category => `('${category.title}')`).join(",")
    );
};

const insertAppCategories = (appCategories: AppCategory[]) => {
    return (
        `todo` + 
        appCategories.map(appCategory => 
            `('${appCategory.shopifyAppId}',
            '${appCategory.categoryId}')`).join(",")
    );
};

const insertKeyBenefits = (keyBenefits: KeyBenefit[]) => {
    return (
        `todo` + 
        keyBenefits.map(keyBenefit => 
            `('${keyBenefit.shopifyAppId}',
            '${escape(keyBenefit.title)}',
            '${escape(keyBenefit.description)}')`).join(",")
    );
};

const insertPricingPlans = (pricingPlans: string[]) => {
    return (
        `todo` + 
        pricingPlans.map(pricingPlan => 
            `('${pricingPlan}')`).join(",")
    );
};

const insertReviews = (reviews: Review[]) => {
    return (
        `todo`+ 
            reviews.map(review => `(
                ${review.shopifyAppId},
                '${escape(review.author)}',
                '${escape(review.body)}',
                ${review.rating},
                ${review.helpfulCount},
                '${review.dateCreated}',
                '${escape(review.developerReply)}',
                '${review.developerReplyDate}')`).join(",")
    );
};

const insertAppPricingPlans = (pricingPlans: PricingPlan[], prices: PricingPlanPrice[]) => {
    return (
        `todo` + 
        pricingPlans.map(pricingPlan => 
            `('${pricingPlan.shopifyAppId}', '${prices.find(it => it.price === pricingPlan.price)!.id}')
            `).join(",")
    );
};

describe("Insert Data", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("01", "02");
        await ShopifyCsvLoader.load();
    }, seconds(30));

    it("should insert apps data", async done => {
        const apps = await ShopifyCsvLoader.apps();
        const chunks = _.chunk(apps, 500);

        for (const ch of chunks){
            await db.insert(insertApps(ch));
        }
        const count = await db.selectSingleRow(selectCount(APPS));
        expect(count.c).toBe(2831);

        const row = await db.selectSingleRow(selectRowById(1000, APPS));
        expect(row.title).toEqual("Yottie ‑ YouTube Video App");

        done();
    },
    minutes(1));

    it("should insert categories data", async done => {
        const categories = await ShopifyCsvLoader.categories();
        await db.insert(insertCategories(categories));

        const count = await db.selectSingleRow(selectCount(CATEGORIES));
        expect(count.c).toBe(12);

        const row = await db.selectSingleRow(selectRowById(5, CATEGORIES));
        expect(row.title).toEqual("Customer support");

        const rowByTitle = await db.selectSingleRow(selectCategoryByTitle("Places to sell"));
        expect(rowByTitle.id).toEqual(12);

        done();
    },
    minutes(1));

    it("should insert app categories data", async done => {
        const appCategories = await ShopifyCsvLoader.appCategories();
        const chunks = _.chunk(appCategories, 500);
        for (const ch of chunks){
            await db.insert(insertAppCategories(ch));
        }

        const count = await db.selectSingleRow(selectCount(APPS_CATEGORIES));
        expect(count.c).toEqual(4155);

        const appCategoriesRows = await db.selectMultipleRows(selectAppCategoriesByAppId(1056));
        expect(appCategoriesRows).toEqual([
            { app_title: "mmuze", category_id: 1, category_title: "Store design" },
            { app_title: "mmuze", category_id: 2, category_title: "Sales and conversion optimization" },
            { app_title: "mmuze", category_id: 3, category_title: "Marketing" },
            { app_title: "mmuze", category_id: 5, category_title: "Customer support" }
        ]);
        done();
    },
    minutes(1));

    it("should insert key benefits data", async done => {
        const keyBenefits = await ShopifyCsvLoader.keyBenefits();
        await db.execute("PRAGMA foreign_keys = ON");
        await db.insert(insertKeyBenefits(keyBenefits));
    
        const count = await db.selectSingleRow(selectCount(KEY_BENEFITS));
        expect(count.c).toEqual(7446);

        const uniqueValues = await db.selectSingleRow(selectUnigueRowCount(KEY_BENEFITS, "description"));
        expect(uniqueValues.c).toEqual(7281);
        done();
    },
    minutes(1));

    it("should insert pricing plans", async done => {
        const pricingPlans = await ShopifyCsvLoader.loadUniquePricingPlans(pricingPlansDir);
        await db.insert(insertPricingPlans(pricingPlans));

        const count = await db.selectSingleRow(selectCount(PRICING_PLANS));
        expect(count.c).toEqual(365);

        const row = await db.selectSingleRow(selectRowById(333, PRICING_PLANS));
        expect(row.price).toEqual("$23.70/month");
        done();
    },
    minutes(1));

    it("should insert review data", async done => {
        const reviews = await ShopifyCsvLoader.reviews();
        const chunks = _.chunk(reviews, 500);
        for (const ch of chunks){
            await db.insert(insertReviews(ch));
        }

        const count = await db.selectSingleRow(selectCount(REVIEWS));
        expect(count.c).toEqual(291767);

        const uniqueAuthors = await db.selectSingleRow(selectUnigueRowCount(REVIEWS, "author"));
        expect(uniqueAuthors.c).toEqual(191707);

        done();
    },
    minutes(2)
);

    it("should insert apps pricing plans data", async done => {
        const pricePlans = await ShopifyCsvLoader.pricingPlans();
        const prices = (await db.selectMultipleRows(`todo`)) as PricingPlanPrice[];
        
        const chunks = _.chunk(pricePlans, 500);
        for (const ch of chunks){
            await db.insert(insertAppPricingPlans(ch, prices));
        }

        const count = await db.selectSingleRow(selectCount(APPS_PRICING_PLANS));
        expect(count.c).toEqual(4896);
        done();
    },
    minutes(1));
});