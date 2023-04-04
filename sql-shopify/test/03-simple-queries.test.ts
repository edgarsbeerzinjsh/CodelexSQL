import { Database } from "../src/database";
import { minutes } from "./utils";

describe("Simple Queries", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("02", "03");
    }, minutes(1));

    it("should select app count with rating of 5 stars", async done => {
        const query = `todo`;
        const result = await db.selectSingleRow(query);
        expect(result).toEqual({
            count: 731
        });
        done();
    }, minutes(1));

    it("should select top 3 develepors with most apps published", async done => {
        const query = `todo`;

        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 30, developer: "Webkul Software Pvt Ltd" },
            { count: 25, developer: "POWr.io" },
            { count: 24, developer: "Omega" }
        ]);
        done();
    }, minutes(1));

    it("should select count of reviews created in year 2014, 2015 and 2016", async done => {
        const query = `todo`;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { year: "2014", review_count: 6157 },
            { year: "2015", review_count: 9256 },
            { year: "2016", review_count: 37860 }
        ]);
        done();
    }, minutes(1));
});