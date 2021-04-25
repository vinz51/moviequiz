import { buildUrl } from "./helpers";
import { GET } from "./";

/**
 * @function getPopularCasts
 * @description Retrieve the most popular person
 * @param  {Object} [options={}] - Options to attached to the GET
 * @return {Promise}
 */
export const getPopularCasts = (options = {}) =>
  GET(buildUrl("person/popular"), options);
