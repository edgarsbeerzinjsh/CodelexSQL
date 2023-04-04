import { Database } from "../src/database";
import { minutes } from "./utils";
import { selectRowById, selectReviewByAppIdAuthor, selectColumnFromTable } from "../src/queries/select";
import { APPS, CATEGORIES } from "../src/shopify-table-names";
import moment from "moment";

describe("Update Statements", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("05", "06");
    }, minutes(1));

    it("should update one app title by app id", async done => {
        const app = await db.selectSingleRow(selectRowById(200, APPS));
        const query = `todo`;
        try {
            await db.execute(query);
        } catch (e) { console.log(e); };

        const row = await db.selectSingleRow(selectRowById(200, APPS));
        expect(row.title).toEqual(
            "QUICK VIEW"
        );
        done();
    }, minutes(1));

    it("should update review developer reply and developer reply date by app id and author", async done => {
        const timeStamp = moment().format("YYYY-MM-DD hh:mm");
        const review = await db.selectSingleRow(selectReviewByAppIdAuthor(24, "PLAYBOY"));
        const query = `todo`;
        try {
            await db.execute(query);
        } catch (e) { console.log(e); };

        const row = await db.selectSingleRow(selectReviewByAppIdAuthor(review.app_id, review.author));
        expect(row.developer_reply).toEqual("test reply");
        expect(row.developer_reply_date).toEqual(timeStamp);
        done();
    }, minutes(1));

    it("should update all categories to uppercase", async done => {
        const query = `todo`;
        try {
            await db.execute(query);
        } catch (e) { console.log(e); };

        const rows = await db.selectMultipleRows(selectColumnFromTable("title", CATEGORIES));
        for (const row of rows) {
            if (row.title !== row.title.toUpperCase()) {
                throw new Error(`Title '${row.title}' is not in upper case!`)
            };
        };
        done();
    }, minutes(1));
});