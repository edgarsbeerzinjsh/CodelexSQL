import { Database } from "../src/database";
import {
  ALL_TABLES,
  MOVIES,
  MOVIE_RATINGS,
  ACTORS,
  KEYWORDS,
  DIRECTORS,
  GENRES,
  PRODUCTION_COMPANIES
} from "../src/table-names";
import { tableInfo, indexList } from "../src/queries/table-info";

const CREATE_MOVIES_TABLE = ``;

const CREATE_MOVIE_RATINGS_TABLE = ``;

const CREATE_ACTORS_TABLE = ``;

const CREATE_KEYWORDS_TABLE = ``;

const CREATE_DIRECTORS_TABLE = ``;

const CREATE_GENRES_TABLE = ``;

const CREATE_PRODUCTION_COMPANIES_TABLE = ``;

const CREATE_INDEX_MOVIES_RELEASE_DATE = ``;

const CREATE_INDEX_MOVIE_RATINGS_TIME_CREATED = ``;

const CREATE_UNIQUE_INDEX_MOVIES_IMDB_ID = ``;

const CREATE_UNIQUE_INDEX_KEYWORDS_KEYWORD = ``;

const CREATE_UNIQUE_INDEX_GENRES_GENRE = ``;

const CREATE_UNIQUE_INDEX_PRODUCTION_COMPANIES_COMPANY_NAME = ``;

describe("Tables", () => {
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
      CREATE_MOVIES_TABLE,
      CREATE_MOVIE_RATINGS_TABLE,
      CREATE_ACTORS_TABLE,
      CREATE_KEYWORDS_TABLE,
      CREATE_DIRECTORS_TABLE,
      CREATE_GENRES_TABLE,
      CREATE_PRODUCTION_COMPANIES_TABLE
    ];

    for (const query of queries) {
      await db.createTable(query);
    }

    for (const table of ALL_TABLES) {
      const exists = await db.tableExists(table);
      expect(exists).toBeTruthy();
    }

    done();
  });

  it("should have correct columns and column types", async done => {
    const mapFn = (row: any) => {
      return {
        name: row.name,
        type: row.type
      };
    };

    const movies = (await selectTableInfo(MOVIES)).map(mapFn);
    expect(movies).toEqual([
      { name: "id", type: "integer" },
      { name: "imdb_id", type: "text" },
      { name: "popularity", type: "real" },
      { name: "budget", type: "real" },
      { name: "budget_adjusted", type: "real" },
      { name: "revenue", type: "real" },
      { name: "revenue_adjusted", type: "real" },
      { name: "original_title", type: "text" },
      { name: "homepage", type: "text" },
      { name: "tagline", type: "text" },
      { name: "overview", type: "text" },
      { name: "runtime", type: "integer" },
      { name: "release_date", type: "text" }
    ]);

    const movieRatings = (await selectTableInfo(MOVIE_RATINGS)).map(mapFn);
    expect(movieRatings).toEqual([
      { name: "user_id", type: "integer" },
      { name: "movie_id", type: "integer" },
      { name: "rating", type: "real" },
      { name: "time_created", type: "text" }
    ]);

    const actors = (await selectTableInfo(ACTORS)).map(mapFn);
    expect(actors).toEqual([
      { name: "id", type: "integer" },
      { name: "full_name", type: "text" }
    ]);

    const keywords = (await selectTableInfo(KEYWORDS)).map(mapFn);
    expect(keywords).toEqual([
      { name: "id", type: "integer" },
      { name: "keyword", type: "text" }
    ]);

    const directors = (await selectTableInfo(DIRECTORS)).map(mapFn);
    expect(directors).toEqual([
      { name: "id", type: "integer" },
      { name: "full_name", type: "text" }
    ]);

    const genres = (await selectTableInfo(GENRES)).map(mapFn);
    expect(genres).toEqual([
      { name: "id", type: "integer" },
      { name: "genre", type: "text" }
    ]);

    const productionCompanies = (await selectTableInfo(
      PRODUCTION_COMPANIES
    )).map(mapFn);
    expect(productionCompanies).toEqual([
      { name: "id", type: "integer" },
      { name: "company_name", type: "text" }
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

    const movies = (await selectTableInfo(MOVIES)).map(mapFn);
    expect(movies).toEqual([
      { name: "id", primaryKey: true },
      { name: "imdb_id", primaryKey: false },
      { name: "popularity", primaryKey: false },
      { name: "budget", primaryKey: false },
      { name: "budget_adjusted", primaryKey: false },
      { name: "revenue", primaryKey: false },
      { name: "revenue_adjusted", primaryKey: false },
      { name: "original_title", primaryKey: false },
      { name: "homepage", primaryKey: false },
      { name: "tagline", primaryKey: false },
      { name: "overview", primaryKey: false },
      { name: "runtime", primaryKey: false },
      { name: "release_date", primaryKey: false }
    ]);

    const movieRatings = (await selectTableInfo(MOVIE_RATINGS)).map(mapFn);
    expect(movieRatings).toEqual([
      { name: "user_id", primaryKey: true },
      { name: "movie_id", primaryKey: true },
      { name: "rating", primaryKey: false },
      { name: "time_created", primaryKey: false }
    ]);

    const actors = (await selectTableInfo(ACTORS)).map(mapFn);
    expect(actors).toEqual([
      { name: "id", primaryKey: true },
      { name: "full_name", primaryKey: false }
    ]);

    const keywords = (await selectTableInfo(KEYWORDS)).map(mapFn);
    expect(keywords).toEqual([
      { name: "id", primaryKey: true },
      { name: "keyword", primaryKey: false }
    ]);

    const directors = (await selectTableInfo(DIRECTORS)).map(mapFn);
    expect(directors).toEqual([
      { name: "id", primaryKey: true },
      { name: "full_name", primaryKey: false }
    ]);

    const genres = (await selectTableInfo(GENRES)).map(mapFn);
    expect(genres).toEqual([
      { name: "id", primaryKey: true },
      { name: "genre", primaryKey: false }
    ]);

    const productionCompanies = (await selectTableInfo(
      PRODUCTION_COMPANIES
    )).map(mapFn);
    expect(productionCompanies).toEqual([
      { name: "id", primaryKey: true },
      { name: "company_name", primaryKey: false }
    ]);

    done();
  });

  it("should have not null constraints", async done => {
    const mapFn = (row: any) => {
      return {
        name: row.name,
        notNull: row.notnull === 1
      };
    };

    const movies = (await selectTableInfo(MOVIES)).map(mapFn);
    expect(movies).toEqual([
      { name: "id", notNull: true },
      { name: "imdb_id", notNull: true },
      { name: "popularity", notNull: true },
      { name: "budget", notNull: true },
      { name: "budget_adjusted", notNull: true },
      { name: "revenue", notNull: true },
      { name: "revenue_adjusted", notNull: true },
      { name: "original_title", notNull: true },
      { name: "homepage", notNull: false },
      { name: "tagline", notNull: false },
      { name: "overview", notNull: true },
      { name: "runtime", notNull: true },
      { name: "release_date", notNull: true }
    ]);

    const movieRatings = (await selectTableInfo(MOVIE_RATINGS)).map(mapFn);
    expect(movieRatings).toEqual([
      { name: "user_id", notNull: true },
      { name: "movie_id", notNull: true },
      { name: "rating", notNull: true },
      { name: "time_created", notNull: true }
    ]);

    const actors = (await selectTableInfo(ACTORS)).map(mapFn);
    expect(actors).toEqual([
      { name: "id", notNull: true },
      { name: "full_name", notNull: true }
    ]);

    const keywords = (await selectTableInfo(KEYWORDS)).map(mapFn);
    expect(keywords).toEqual([
      { name: "id", notNull: true },
      { name: "keyword", notNull: true }
    ]);

    const directors = (await selectTableInfo(DIRECTORS)).map(mapFn);
    expect(directors).toEqual([
      { name: "id", notNull: true },
      { name: "full_name", notNull: true }
    ]);

    const genres = (await selectTableInfo(GENRES)).map(mapFn);
    expect(genres).toEqual([
      { name: "id", notNull: true },
      { name: "genre", notNull: true }
    ]);

    const productionCompanies = (await selectTableInfo(
      PRODUCTION_COMPANIES
    )).map(mapFn);
    expect(productionCompanies).toEqual([
      { name: "id", notNull: true },
      { name: "company_name", notNull: true }
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

    await db.createIndex(CREATE_INDEX_MOVIES_RELEASE_DATE);

    const movies = (await selectIndexList(MOVIES)).map(mapFn);
    expect(movies).toEqual([
      {
        name: "movies_release_date_idx",
        unique: false
      }
    ]);

    await db.createIndex(CREATE_INDEX_MOVIE_RATINGS_TIME_CREATED);

    const movieRatings = (await selectIndexList(MOVIE_RATINGS)).map(mapFn);
    expect(movieRatings).toEqual([
      { name: "movie_ratings_time_created_idx", unique: false },
      { name: "sqlite_autoindex_movie_ratings_1", unique: true }
    ]);

    done();
  });

  it("should have unique indices", async done => {
    const mapFn = (row: any) => {
      return {
        name: row.name,
        unique: row.unique === 1
      };
    };

    const uniqueOnly = (row: any) => row.unique === 1;

    await db.createIndex(CREATE_UNIQUE_INDEX_MOVIES_IMDB_ID);

    const movies = (await selectIndexList(MOVIES))
      .filter(uniqueOnly)
      .map(mapFn);
    expect(movies).toEqual([
      {
        name: "movies_imdb_id_unq_idx",
        unique: true
      }
    ]);

    await db.createIndex(CREATE_UNIQUE_INDEX_KEYWORDS_KEYWORD);

    const keywords = (await selectIndexList(KEYWORDS))
      .filter(uniqueOnly)
      .map(mapFn);
    expect(keywords).toEqual([
      {
        name: "keywords_keyword_unq_idx",
        unique: true
      }
    ]);

    await db.createIndex(CREATE_UNIQUE_INDEX_GENRES_GENRE);

    const genres = (await selectIndexList(GENRES))
      .filter(uniqueOnly)
      .map(mapFn);
    expect(genres).toEqual([
      {
        name: "genres_genre_unq_idx",
        unique: true
      }
    ]);

    await db.createIndex(CREATE_UNIQUE_INDEX_PRODUCTION_COMPANIES_COMPANY_NAME);

    const productionCompanies = (await selectIndexList(PRODUCTION_COMPANIES))
      .filter(uniqueOnly)
      .map(mapFn);
    expect(productionCompanies).toEqual([
      {
        name: "production_companies_company_name_unq_idx",
        unique: true
      }
    ]);

    done();
  });
});
