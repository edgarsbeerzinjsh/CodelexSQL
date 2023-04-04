import { resolve } from "path";
import { CsvLoader } from "../../src/data/csv-loader";

describe("csv loader", () => {
  it("should load movies", async done => {
    const filePath = resolve(__dirname, "./movies.csv");
    const movies = await CsvLoader.loadMovies(filePath);
    expect(movies).toEqual([
      {
        imdbId: "tt0369610",
        popularity: 32.985763,
        budget: 150000000,
        revenue: 1513528810,
        originalTitle: "Jurassic World",
        cast: [
          "Chris Pratt",
          "Bryce Dallas Howard",
          "Irrfan Khan",
          "Vincent D'Onofrio",
          "Nick Robinson"
        ],
        homepage: "http://www.jurassicworld.com/",
        directors: ["Colin Trevorrow"],
        tagline: "The park is open.",
        keywords: [
          "monster",
          "dna",
          "tyrannosaurus rex",
          "velociraptor",
          "island"
        ],
        overview:
          "Twenty-two years after the events of Jurassic Park, Isla Nublar now features a fully functioning dinosaur theme park, Jurassic World, as originally envisioned by John Hammond.",
        runtime: 124,
        genres: ["Action", "Adventure", "Science Fiction", "Thriller"],
        productionCompanies: [
          "Universal Studios",
          "Amblin Entertainment",
          "Legendary Pictures",
          "Fuji Television Network",
          "Dentsu"
        ],
        releaseDate: "2015-06-09",
        budgetAdjusted: 137999939.3,
        revenueAdjusted: 1392445893
      },
      {
        imdbId: "tt1392190",
        popularity: 28.419936,
        budget: 150000000,
        revenue: 378436354,
        originalTitle: "Mad Max: Fury Road",
        cast: [
          "Tom Hardy",
          "Charlize Theron",
          "Hugh Keays-Byrne",
          "Nicholas Hoult",
          "Josh Helman"
        ],
        homepage: "http://www.madmaxmovie.com/",
        directors: ["George Miller"],
        tagline: "What a Lovely Day.",
        keywords: [
          "future",
          "chase",
          "post-apocalyptic",
          "dystopia",
          "australia"
        ],
        overview:
          "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order. There's Max, a man of action and a man of few words, who seeks peace of mind following the loss of his wife and child in the aftermath of the chaos. And Furiosa, a woman of action and a woman who believes her path to survival may be achieved if she can make it across the desert back to her childhood homeland.",
        runtime: 120,
        genres: ["Action", "Adventure", "Science Fiction", "Thriller"],
        productionCompanies: [
          "Village Roadshow Pictures",
          "Kennedy Miller Productions"
        ],
        releaseDate: "2015-05-13",
        budgetAdjusted: 137999939.3,
        revenueAdjusted: 348161292.5
      }
    ]);
    done();
  });

  it("should load ratings", async done => {
    const filePath = resolve(__dirname, "./ratings.csv");
    const ratings = await CsvLoader.loadRatings(filePath);

    expect(ratings).toEqual([
      {
        userId: 742,
        imdbId: "tt0479143",
        rating: 5,
        time_created: "2015-03-09 22:52:36"
      },
      {
        userId: 876,
        imdbId: "tt0762114",
        rating: 4.5,
        time_created: "2015-03-09 22:53:21"
      }
    ]);
    done();
  });

  it("should filter out duplicated actors", async done => {
    const filePath = resolve(__dirname, "./movies-duplicated-actors.csv");
    const movie = (await CsvLoader.loadMovies(filePath))[0];

    expect(movie.cast).toEqual([
      "Matthew Lillard",
      "Grey Griffin",
      "Frank Welker",
      "Mindy Cohn"
    ]);
    done();
  });
});
