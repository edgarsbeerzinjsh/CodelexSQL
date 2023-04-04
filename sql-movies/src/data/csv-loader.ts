import csv from "csvtojson";
import { resolve } from "path";
import _ from "lodash";
import moment from "moment";
import { Rating, Movie } from "./types";

const DATA_DIR = resolve(__dirname, "../../_data");

const toArray = (col: any): string[] => {
  return _.uniq((col as string).split("|").map(it => it.trim())).filter(
    it => it.length > 0
  );
};

const toMovie = (line: any) => {
  return {
    imdbId: line.imdb_id,
    popularity: parseFloat(line.popularity),
    budget: parseInt(line.budget),
    revenue: parseInt(line.revenue),
    originalTitle: line.original_title,
    cast: toArray(line.cast),
    homepage: line.homepage,
    directors: toArray(line.director),
    tagline: line.tagline,
    keywords: toArray(line.keywords),
    overview: line.overview,
    runtime: parseInt(line.runtime),
    genres: toArray(line.genres),
    productionCompanies: toArray(line.production_companies),
    releaseDate: moment(line.release_date, "M/D/YYYY").format("YYYY-MM-DD"),
    budgetAdjusted: parseFloat(line.budget_adj),
    revenueAdjusted: parseFloat(line.revenue_adj)
  } as Movie;
};

const toRating = (line: any) => {
  const unix = moment.unix(parseInt(line.timestamp));
  return {
    userId: parseInt(line.user_id),
    imdbId: line.imdb_id,
    time_created: moment.utc(unix).format("YYYY-MM-DD HH:mm:ss"),
    rating: parseFloat(line.rating)
  } as Rating;
};

let movies: Movie[] = [];
let ratings: Rating[] = [];

export class CsvLoader {
  static async load(): Promise<void> {
    await this.movies();
    await this.ratings();
  }

  static async loadMovies(filePath: string): Promise<Movie[]> {
    return csv()
      .fromFile(filePath)
      .then(items => items.map(toMovie));
  }

  static async movies(): Promise<Movie[]> {
    if (movies.length > 0) {
      return movies;
    }
    return this.loadMovies(DATA_DIR + "/movies.csv");
  }

  static async loadRatings(filePath: string): Promise<Rating[]> {
    return csv()
      .fromFile(filePath)
      .then(items => items.map(toRating));
  }

  static async ratings(): Promise<Rating[]> {
    if (ratings.length > 0) {
      return ratings;
    }
    return this.loadRatings(DATA_DIR + "/ratings.csv");
  }

  static async actors(): Promise<string[]> {
    const movies = await this.movies();
    const actors = movies.map(movie => movie.cast).flat();
    return _.uniq(actors);
  }

  static async keywords(): Promise<string[]> {
    const movies = await this.movies();
    const keywords = movies.map(movie => movie.keywords).flat();
    return _.uniq(keywords);
  }

  static async directors(): Promise<string[]> {
    const movies = await this.movies();
    const directors = movies.map(movie => movie.directors).flat();
    return _.uniq(directors);
  }

  static async genres(): Promise<string[]> {
    const movies = await this.movies();
    const genres = movies.map(movie => movie.genres).flat();
    return _.uniq(genres);
  }

  static async productionCompanies(): Promise<string[]> {
    const movies = await this.movies();
    const productionCompanies = movies
      .map(movie => movie.productionCompanies)
      .flat();
    return _.uniq(productionCompanies);
  }
}
