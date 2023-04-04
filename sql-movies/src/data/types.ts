export interface Movie {
  imdbId: string;
  popularity: number;
  budget: number;
  revenue: number;
  originalTitle: string;
  cast: string[];
  homepage: string;
  directors: string[];
  tagline?: string;
  keywords: string[];
  overview: string;
  runtime: number;
  genres: string[];
  productionCompanies: string[];
  releaseDate: string;
  budgetAdjusted: number;
  revenueAdjusted: number;
}

export interface Rating {
  userId: number;
  imdbId: string;
  time_created: string;
  rating: number;
}
