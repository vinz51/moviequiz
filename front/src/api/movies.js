import { buildUrl } from "./helpers";
import { GET } from "./";

/**
 * @function getPopularMovies
 * @description Retrieve the most popular movies
 * @param  {Object} [options={}] - Options to attached to the GET
 * @return {Promise}
 */
export const getPopularMovies = (options = {}) =>
  GET(buildUrl("movie/popular"), options);

/**
 * @function getCastAndCrewByMovieId
 * @description Retrieve the casts and crews from a movie
 * @param  {Number|String} id - The movie id
 * @param  {Object} [options={}] - Options to attached to the GET
 * @return {Promise}
 */
export const getCastAndCrewByMovieId = (id, options = {}) =>
  GET(buildUrl(`movie/${id}/credits`), options);
