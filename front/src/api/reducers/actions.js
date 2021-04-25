import * as ActionsTypes from "./constants";
import { getCastAndCrewByMovieId, getPopularMovies } from "../movies";
import { getPopularCasts } from "../person";
import { normalizr } from "../helpers";

/**
 * @function getMoviesByParams
 * @description Get popular movies by parameters
 * @param {function} dispatch - Dispatch function from flux architecture
 * @param  {Object}  [params={}] - Parameters to set to the GET
 * @return {void}
 */
export const getMoviesByParams = async (dispatch, params = {}) => {
  dispatch({ type: ActionsTypes.MOVIES_LOADING });
  try {
    const moviesData = await getPopularMovies(params);
    dispatch({
      type: ActionsTypes.MOVIES_FETCH_SUCCESS,
      movies: normalizr(moviesData.data.results),
    });
  } catch (error) {
    dispatch({
      type: ActionsTypes.MOVIES_FETCH_FAILURE,
      message: error.message,
    });
  } finally {
    dispatch({ type: ActionsTypes.MOVIES_LOADING });
  }
};

/**
 * @function getCastCrewByMoviesId
 * @description Get the casts and crews with an array of movies ids
 * @param {function} dispatch - Dispatch function from flux architecture
 * @param  {Array}  ids - Array of movies ids
 * @param  {[type]}  restOptions - All the optional parameters for GET
 * @return {void}
 */
export const getCastCrewByMoviesId = async (
  dispatch,
  { ids, ...restOptions }
) => {
  dispatch({ type: ActionsTypes.MOVIES_SET_CURRENT_LOADING });
  try {
    const allPromises = ids.map((movieId) =>
      getCastAndCrewByMovieId(movieId, restOptions)
    );
    const results = await Promise.all(allPromises);
    const casts = results.reduce(
      (accumulator, { data: { id, cast, crew } }) => {
        accumulator[id] = { cast, crew };
        return accumulator;
      },
      {}
    );
    dispatch({ type: ActionsTypes.MOVIES_SET_CASTS, casts });
  } catch (error) {
    dispatch({
      type: ActionsTypes.MOVIES_CASTS_FAILURE,
      message: error.message,
    });
  } finally {
    dispatch({ type: ActionsTypes.MOVIES_SET_CURRENT_LOADING });
  }
};

/**
 * @function getCastsCrews
 * @description Retrieve the casts and crews the most popular
 * @param {function} dispatch - Dispatch function from flux architecture
 * @param  {Object}  [{page=1}={}] - Option for the GET crud
 * @return {void}
 */
export const getCastsCrews = async (dispatch, { page = 1 } = {}) => {
  dispatch({ type: ActionsTypes.MOVIES_CASTS_LOADING });
  try {
    const casts = await getPopularCasts({ page });
    dispatch({
      type: ActionsTypes.MOVIES_CASTS_SET,
      casts: normalizr(casts.data.results),
    });
  } catch (error) {
    dispatch({
      type: ActionsTypes.MOVIES_CASTS_FAILURE,
      message: error.message,
    });
  } finally {
    dispatch({ type: ActionsTypes.MOVIES_CASTS_LOADING });
  }
};

/**
 * @function setCurrentMovie
 * @description Set the current movie to display on the game
 * @param {function} dispatch - Dispatch function from flux architecture
 * @param {String} id - The movie id to set
 */
export const setCurrentMovie = (dispatch, id) =>
  dispatch({ type: ActionsTypes.MOVIES_SET_CURRENT, id });
