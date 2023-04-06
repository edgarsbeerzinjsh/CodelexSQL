export const selectActorByName = (fullName: string): string => {
  return `SELECT * FROM actors WHERE full_name = '${fullName}'`;
};

export const selectKeyword = (keyword: string): string => {
  return `SELECT * FROM keywords WHERE keyword = '${keyword}'`;
};

export const selectDirector = (director: string): string => {
  return `SELECT * FROM directors WHERE full_name = '${director}'`;
};

export const selectGenre = (genre: string): string => {
  return `SELECT * FROM genres WHERE genre = '${genre}'`;
};

export const selectProductionCompany = (company: string): string => {
  return `SELECT * FROM production_companies WHERE company_name = '${company}'`;
};

export const selectMovieById = (id: number): string => {
  return `SELECT * FROM movies WHERE id = ${id}`;
};

export const selectGenreById = (id: number): string => {
  return `SELECT * FROM genres WHERE id = ${id}`;
};

export const selectDirectorById = (id: number): string => {
  return `SELECT * FROM directors WHERE id = ${id}`;
};

export const selectActorById = (id: number): string => {
  return `SELECT * FROM actors WHERE id = ${id}`;
};

export const selectKeywordById = (id: number): string => {
  return `SELECT * FROM keywords WHERE id = ${id}`;
};

export const selectProductionCompanyById = (id: number): string => {
  return `SELECT * FROM production_companies WHERE id = ${id}`;
};

export const selectMovie = (imdbId: string): string => {
  return `SELECT * FROM movies WHERE imdb_Id = '${imdbId}'`;
};

export const selectMovieId = (imdbId: string): string => {
  return `SELECT id FROM movies WHERE imdb_Id = '${imdbId}'`;
};

export const selectRatingsByUserID = (userId: number): string => {
  return `SELECT * FROM movie_ratings WHERE user_id = ${userId}`;
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `select g.genre from movie_genres mg join genres g on g.id = mg.genre_id where mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `select a.full_name from movie_actors ma join actors a on a.id = ma.actor_id where ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `select d.full_name from movie_directors md join directors d on d.id = md.director_id where md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `select k.keyword from movie_keywords mk join keywords k on k.id = mk.keyword_id where mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `select pc.company_name from movie_production_companies mpc join production_companies pc on pc.id = mpc.company_id where mpc.movie_id = ${movieId}`;
};

/**
 * select count as c, because an object is returned and expected property name is c
 */
export const selectCount = (table: string): string => {
  return `select count(*) as c from ${table}`; //?
};
