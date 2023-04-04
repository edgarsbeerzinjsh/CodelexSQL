import { Database } from "../src/database";
import {
    ALL_SHOPIFY_TABLES,
    APPS,
    APPS_CATEGORIES,
    CATEGORIES,
    KEY_BENEFITS,
    PRICING_PLANS,
    APPS_PRICING_PLANS,
    REVIEWS
} from "../src/shopify-table-names";
import { tableInfo, indexList } from "../src/queries/table-info";

const CREATE_APPS_TABLE = `todo`;

const CREATE_CATEGORIES_TABLE = `todo`;

const CREATE_APPS_CATEGORIES_TABLE = `todo`;

const CREATE_KEY_BENEFITS_TABLE = `todo`;

const CREATE_PRICING_PLANS_TABLE = `todo`;

const CREATE_APPS_PRICING_PLANS_TABLE = `todo`;

const CREATE_REVIEWS_TABLE = `todo`;

const CREATE_INDEX_REVIEWS_AUTHOR = `todo`;

const CREATE_INDEX_PRICING_PLANS_PRICE = `todo`;

const CREATE_UNIQUE_INDEX_APPS_ID = `todo`;

describe("Create Tables", () => {
    let db: Database;

    beforeAll(async () => (db = await Database.fromExisting("00", "01")));

    const selectTableInfo = async (table: string) => {
        return db.selectMultipleRows(tableInfo(table));
    };

    const selectIndexList = async (table: string) => {
        return db.selectMultipleRows(indexList(table));
    };

    it("should create tables", async done => {
        const queries = [
            CREATE_APPS_TABLE,
            CREATE_CATEGORIES_TABLE,
            CREATE_APPS_CATEGORIES_TABLE,
            CREATE_KEY_BENEFITS_TABLE,
            CREATE_PRICING_PLANS_TABLE,
            CREATE_APPS_PRICING_PLANS_TABLE,
            CREATE_REVIEWS_TABLE
        ];

        for (const query of queries) {
            await db.createTable(query);
        }

        for (const table of ALL_SHOPIFY_TABLES) {
            const exists = await db.tableExists(table);
            if (!exists) {
                console.log(`No table with name:'${table}' found!`)
            }
            expect(exists).toBeTruthy();
        }
        done();
    });

    it("should have correct columns and column names", async done => {
        const mapFn = (row: any) => {
            return {
                name: row.name,
                type: row.type
            };
        };

        const apps = (await selectTableInfo(APPS)).map(mapFn);
        expect(apps).toEqual([
            { name: "id", type: "integer" },
            { name: "url", type: "text" },
            { name: "title", type: "text" },
            { name: "tagline", type: "text" },
            { name: "developer", type: "text" },
            { name: "developer_link", type: "text" },
            { name: "icon", type: "text" },
            { name: "rating", type: "real" },
            { name: "reviews_count", type: "integer" },
            { name: "description", type: "text" },
            { name: "pricing_hint", type: "text" }
        ]);

        const categories = (await selectTableInfo(CATEGORIES)).map(mapFn);
        expect(categories).toEqual([
            { name: "id", type: "integer" },
            { name: "title", type: "text" }
        ]);

        const appsCategories = (await selectTableInfo(APPS_CATEGORIES)).map(mapFn);
        expect(appsCategories).toEqual([
            { name: "app_id", type: "integer" },
            { name: "category_id", type: "integer" }
        ]);

        const keyBenefits = (await selectTableInfo(KEY_BENEFITS)).map(mapFn);
        expect(keyBenefits).toEqual([
            { name: "app_id", type: "integer" },
            { name: "title", type: "text" },
            { name: "description", type: "text" }
        ]);

        const pricingPlans = (await selectTableInfo(PRICING_PLANS)).map(mapFn);
        expect(pricingPlans).toEqual([
            { name: "id", type: "integer" },
            { name: "price", type: "text" },
        ]);

        const appsPricingPlans = (await selectTableInfo(APPS_PRICING_PLANS)).map(mapFn);
        expect(appsPricingPlans).toEqual([
            { name: "app_id", type: "integer" },
            { name: "pricing_plan_id", type: "integer" }
        ]);

        const reviews = (await selectTableInfo(REVIEWS)).map(mapFn);
        expect(reviews).toEqual([
            { name: "app_id", type: "integer" },
            { name: "author", type: "text" },
            { name: "body", type: "text" },
            { name: "rating", type: "integer" },
            { name: "helpful_count", type: "integer" },
            { name: "date_created", type: "text" },
            { name: "developer_reply", type: "text" },
            { name: "developer_reply_date", type: "text" }
        ]);
        done();
    });

    it("should have primary keys", async done => {
        const mapFn = (row: any) => {
            return {
                name: row.name,
                primaryKey: row.pk > 0
            };
        };
        const apps = (await selectTableInfo(APPS)).map(mapFn);
        expect(apps).toEqual([
            { name: "id", primaryKey: true },
            { name: "url", primaryKey: false },
            { name: "title", primaryKey: false },
            { name: "tagline", primaryKey: false },
            { name: "developer", primaryKey: false },
            { name: "developer_link", primaryKey: false },
            { name: "icon", primaryKey: false },
            { name: "rating", primaryKey: false },
            { name: "reviews_count", primaryKey: false },
            { name: "description", primaryKey: false },
            { name: "pricing_hint", primaryKey: false }
        ]);

        const categories = (await selectTableInfo(CATEGORIES)).map(mapFn);
        expect(categories).toEqual([
            { name: "id", primaryKey: true },
            { name: "title", primaryKey: false }
        ]);

        const appsCategories = (await selectTableInfo(APPS_CATEGORIES)).map(mapFn);
        expect(appsCategories).toEqual([
            { name: "app_id", primaryKey: true },
            { name: "category_id", primaryKey: true }
        ]);

        const keyBenefits = (await selectTableInfo(KEY_BENEFITS)).map(mapFn);
        expect(keyBenefits).toEqual([
            { name: "app_id", primaryKey: true },
            { name: "title", primaryKey: true },
            { name: "description", primaryKey: false }
        ]);

        const pricingPlans = (await selectTableInfo(PRICING_PLANS)).map(mapFn);
        expect(pricingPlans).toEqual([
            { name: "id", primaryKey: true },
            { name: "price", primaryKey: false },
        ]);

        const appsPricingPlans = (await selectTableInfo(APPS_PRICING_PLANS)).map(mapFn);
        expect(appsPricingPlans).toEqual([
            { name: "app_id", primaryKey: true },
            { name: "pricing_plan_id", primaryKey: true }
        ]);

        const reviews = (await selectTableInfo(REVIEWS)).map(mapFn);
        expect(reviews).toEqual([
            { name: "app_id", primaryKey: false },
            { name: "author", primaryKey: false },
            { name: "body", primaryKey: false },
            { name: "rating", primaryKey: false },
            { name: "helpful_count", primaryKey: false },
            { name: "date_created", primaryKey: false },
            { name: "developer_reply", primaryKey: false },
            { name: "developer_reply_date", primaryKey: false }
        ]);
        done();
    });

    it("should have not null constarints", async done => {
        const mapFn = (row: any) => {
            return {
                name: row.name,
                notNull: row.notnull === 1
            };
        };

        const apps = (await selectTableInfo(APPS)).map(mapFn);
        expect(apps).toEqual([
            { name: "id", notNull: true },
            { name: "url", notNull: true },
            { name: "title", notNull: true },
            { name: "tagline", notNull: true },
            { name: "developer", notNull: true },
            { name: "developer_link", notNull: true },
            { name: "icon", notNull: true },
            { name: "rating", notNull: true },
            { name: "reviews_count", notNull: true },
            { name: "description", notNull: true },
            { name: "pricing_hint", notNull: false }
        ]);

        const categories = (await selectTableInfo(CATEGORIES)).map(mapFn);
        expect(categories).toEqual([
            { name: "id", notNull: true },
            { name: "title", notNull: true }
        ]);

        const appsCategories = (await selectTableInfo(APPS_CATEGORIES)).map(mapFn);
        expect(appsCategories).toEqual([
            { name: "app_id", notNull: true },
            { name: "category_id", notNull: true }
        ]);

        const keyBenefits = (await selectTableInfo(KEY_BENEFITS)).map(mapFn);
        expect(keyBenefits).toEqual([
            { name: "app_id", notNull: true },
            { name: "title", notNull: true },
            { name: "description", notNull: true }
        ]);

        const pricingPlans = (await selectTableInfo(PRICING_PLANS)).map(mapFn);
        expect(pricingPlans).toEqual([
            { name: "id", notNull: true },
            { name: "price", notNull: true },
        ]);

        const appsPricingPlans = (await selectTableInfo(APPS_PRICING_PLANS)).map(mapFn);
        expect(appsPricingPlans).toEqual([
            { name: "app_id", notNull: true },
            { name: "pricing_plan_id", notNull: true }
        ]);

        const reviews = (await selectTableInfo(REVIEWS)).map(mapFn);
        expect(reviews).toEqual([
            { name: "app_id", notNull: true },
            { name: "author", notNull: true },
            { name: "body", notNull: true },
            { name: "rating", notNull: true },
            { name: "helpful_count", notNull: true },
            { name: "date_created", notNull: true },
            { name: "developer_reply", notNull: false },
            { name: "developer_reply_date", notNull: false }
        ]);
        done();
    });

    it("should have indices", async done => {
        const mapFn = (row: any) => {
            return {
                name: row.name,
                unique: row.unique === 1
            };
        };

        await db.createIndex(CREATE_INDEX_PRICING_PLANS_PRICE);
        const pricingPlans = (await selectIndexList(PRICING_PLANS)).map(mapFn);
        expect(pricingPlans).toEqual([
            { name: "pricing_plans_price_idx", unique: false }
        ]);

        await db.createIndex(CREATE_INDEX_REVIEWS_AUTHOR);
        const reviews = (await selectIndexList(REVIEWS)).map(mapFn);
        expect(reviews).toEqual([
            { name: "reviews_author_idx", unique: false },
            //{ name: "sqlite_autoindex_reviews_1", unique: true }
        ]);
        done();
    });

    it("should have unique index", async done => {
        const mapFn = (row: any) => {
            return {
                name: row.name,
                unique: row.unique === 1
            };
        };

        const uniqueOnly = (row: any) => row.unique === 1;

        await db.createIndex(CREATE_UNIQUE_INDEX_APPS_ID);

        const apps = (await selectIndexList(APPS)).filter(uniqueOnly).map(mapFn);
        expect(apps).toEqual([
            { name: "apps_id_unq_idx", unique: true }
        ]);
        done();
    });

});