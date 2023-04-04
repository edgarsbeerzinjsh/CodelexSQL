import _ from "lodash";
import { Database } from "../src/database";
import { CsvLoader } from "../src/data/csv-loader";
import {
  selectCount,
  selectRatingsByUserID,
  selectMovieId
} from "../src/queries/select";
import { MOVIE_RATINGS } from "../src/table-names";
import { Rating } from "../src/data/types";
import { minutes } from "./utils";

const insertRatings = (movieId: number, ratings: Rating[]) => {
  throw new Error(`todo`);
};

describe("Insert Combined Data", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("02", "03");
    await CsvLoader.load();
  }, minutes(3));

  it(
    "should insert movie ratings",
    async done => {
      const ratingsByImdbId = _.groupBy(await CsvLoader.ratings(), "imdbId");

      for (const imdbId of Object.keys(ratingsByImdbId)) {
        const movieId = (await db.selectSingleRow(selectMovieId(imdbId))).id;
        const chunks = _.chunk(ratingsByImdbId[imdbId], 500);
        for (const ch of chunks) {
          await db.insert(insertRatings(movieId, ch));
        }
      }

      const count = await db.selectSingleRow(selectCount(MOVIE_RATINGS));
      expect(count.c).toBe(165859);

      const row = await db.selectSingleRow(selectRatingsByUserID(2));

      expect(row.id).not.toBeNaN();
      expect(row.user_id).toBe(2);
      expect(row.rating).toBe(3.0);
      expect(row.time_created).toBe("1997-06-23 04:12:48");

      done();
    },
    minutes(10)
  );
});
