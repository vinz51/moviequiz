/**
 * @function retrieveRandomMoviesId
 * @description find movies id didn't used yet
 * @param  {Object} [state={}] - The movies state instance
 * @param  {Number} [limit=10] - Limit the number of ids that you want
 * @return {Array[String]} - Returns array of ids
 */
export const retrieveRandomMoviesId = (state = {}, limit = 10) =>
  Object.keys(state.movies)
    .filter((movieId) => state.moviesIdUsed.includes(movieId) === false)
    .sort(() => Math.random() - 0.5)
    .splice(0, limit);

/**
 * @function findExternalActor
 * @description Find an external actor from the state
 * @param  {Object} state - The TMB's state
 * @param  {Object} currentMovie - The current movie which one we would like to avoid
 * @return {Object} - An external actor
 */
export const findExternalActor = (state, currentMovie) => {
  const castsMovieIds = Object.keys(currentMovie?.cast || {}).map((id) => id);
  const availableId = Object.keys(state?.casts || {})
    .filter((id) => !castsMovieIds.includes(id))
    .sort(() => Math.random() - 0.5)[0];

  return state.casts[availableId];
};
