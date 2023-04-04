import _ from "lodash";
import { Database } from "../src/database";
import { selectRowById } from "../src/queries/select";
import { minutes } from "./utils";
import { CATEGORIES, PRICING_PLANS, APPS } from "../src/shopify-table-names";

describe("Foreign Keys", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("04", "05");
        await db.execute("PRAGMA foreign_keys = ON");
    }, minutes(1));

    it("should not be able to delete category if any app is linked", async done => {
        const categoryId = 6;
        const query = `todo`;
        try {
            await db.delete(query);
          } catch (e) {}

        const row = await db.selectSingleRow(selectRowById(categoryId, CATEGORIES));
        expect(row).toBeDefined();

        done();
    }, minutes(1));

    it("should not be able to delete pricing plan if any app is linked", async done => {
        const pricingPlanId = 100;
        const query = `todo`;

        try {
            await db.delete(query);
          } catch (e) {}

        const rows = await db.selectSingleRow(selectRowById(pricingPlanId, PRICING_PLANS));
        expect(rows).toBeDefined();

        done();
    }, minutes(1));

    it("should not be able to delete app if any data is linked", async done => {
        const appId = 245;
        const query = `todo`;

        try {
            await db.delete(query);
          } catch (e) {}

        const rows = await db.selectSingleRow(selectRowById(appId, APPS));
        expect(rows).toBeDefined();

        done();
    }, minutes(1));

    it("should be able to delete app", async done => {
        const appId = 355;
        const query = `todo`;
        try {
            await db.delete(query);
          } catch (e) {}

        const rows = await db.selectSingleRow(selectRowById(appId, APPS));
        expect(rows).toBeUndefined();

        done();
    }, minutes(1));
});