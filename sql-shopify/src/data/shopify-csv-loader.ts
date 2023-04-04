import { App, Category, KeyBenefit, PricingPlan, Review, AppCategory } from "./shopify-types";
import csv from "csvtojson";
import { resolve } from "path";
import _ from "lodash";
import { link } from "fs";

const DATA_DIR = resolve(__dirname, "../../_data");

const toApp = (line: any) => {
    return {
        shopifyAppId: parseInt(line.id),
        url: line.url,
        title: line.title,
        tagline: line.tagline,
        developer: line.developer,
        developerLink: line.developer_link,
        icon: line.icon,
        rating: parseFloat(line.rating),
        reviewsCount: parseInt(line.reviews_count),
        description: line.description.replace(/\s/g, " "),
        pricingHint: line.pricing_hint
    } as App;
}
const toCategory = (line: any) => {
    return {
        title: line.title
    } as Category;
}

const toKeyBenefit = (line: any) => {
    return {
        shopifyAppId: parseInt(line.app_id),
        title: line.title,
        description: line.description
    } as KeyBenefit;
}

const toPricingPlan = (line: any) => {
    return {
        shopifyAppId: parseInt(line.app_id),
        price: line.price
    } as PricingPlan;
}

const toReview = (line: any) => {
    return {
        shopifyAppId: parseInt(line.app_id),
        author: line.author,
        body: line.body.replace(/\s/g, " "),
        rating: parseInt(line.rating),
        helpfulCount: parseInt(line.helpful_count),
        dateCreated: line.posted_at,
        developerReply: line.developer_reply.replace(/\s/g, " "),
        developerReplyDate: line.developer_reply_posted_at
    } as Review;
}

const toAppCategory = (line: any) => {
    return {
        shopifyAppId: parseInt(line.app_id),
        categoryId: parseInt(line.category_id)
    } as AppCategory;
}

let apps: App[] = [];
let categories: Category[] = [];
let keyBenefits: KeyBenefit[] = [];
let pricingPlans: PricingPlan[] = [];
let reviews: Review[] = [];
let appCategories: AppCategory[] = [];

export class ShopifyCsvLoader {

    static async load(): Promise<void> {
        await this.apps();
        await this.categories();
        await this.keyBenefits();
        await this.pricingPlans();
        await this.reviews();
        await this.appCategories();
    }

    static async loadApps(filePath: string): Promise<App[]> {
        return csv().fromFile(filePath).then(items => items.map(toApp));
    }

    static async apps(): Promise<App[]> {
        if (apps.length > 0) {
            return apps;
        }
        return this.loadApps(DATA_DIR + "/apps.csv");
    }

    static async loadCategories(filePath: string): Promise<Category[]> {
        return csv().fromFile(filePath).then(items => items.map(toCategory));
    }

    static async categories(): Promise<Category[]> {
        if (categories.length > 0) {
            return categories;
        }
        return this.loadCategories(DATA_DIR + "/categories.csv");
    }

    static async loadAppCategories(filePath: string): Promise<AppCategory[]>{
        return csv().fromFile(filePath).then(items => items.map(toAppCategory));
    }

    static async appCategories(): Promise<AppCategory[]> {
        if (appCategories.length > 0) {
            return appCategories;
        }
        return this.loadAppCategories(DATA_DIR + "/apps_categories.csv")
    }

    static async loadKeyBenefits(filePath: string): Promise<KeyBenefit[]> {
        return csv().fromFile(filePath).then(items => items.map(toKeyBenefit));
    }

    static async keyBenefits(): Promise<KeyBenefit[]> {
        if (keyBenefits.length > 0) {
            return keyBenefits;
        }
        return this.loadKeyBenefits(DATA_DIR + "/key_benefits.csv");
    }

    static async loadPricingPlans(filePath: string): Promise<PricingPlan[]> {
        return csv().fromFile(filePath).then(items => items.map(toPricingPlan));
    }

    static async pricingPlans(): Promise<PricingPlan[]> {
        if (pricingPlans.length > 0) {
            return pricingPlans;
        }
        return this.loadPricingPlans(DATA_DIR + "/pricing_plans.csv");
    }

    static async loadUniquePricingPlans(filePath: string): Promise<string[]> {
        let pricingPlans = await this.loadPricingPlans(filePath);
        let prices = pricingPlans.map(plan => plan.price)
        return _.uniq(prices);
    }

    static async loadReviews(filePath: string): Promise<Review[]> {
        return csv().fromFile(filePath).then(items => items.map(toReview));
    }

    static async reviews(): Promise<Review[]> {
        if (reviews.length > 0) {
            return reviews;
        }
        return this.loadReviews(DATA_DIR + "/reviews.csv");
    }


};