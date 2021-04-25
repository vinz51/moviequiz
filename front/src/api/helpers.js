export const BASE_URL = "https://api.themoviedb.org/3";
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";

/**
 * @function normalizr
 * @description Format the data received from the TMD's API
 * @param  {Array}  [data=[]] - The data to format
 * @return {Object} - The formated data
 */
export const normalizr = (data = []) =>
  data.reduce((accumulator, value) => {
    accumulator[value.id] = { ...value };
    return accumulator;
  }, {});

/**
 * @function buildUrl
 * @description Build the correct url to make axios' calls
 * @param  {String} route - The route to format
 * @return {String} - The formated route
 */
export const buildUrl = (route) => `${BASE_URL}/${route}`;

/**
 * @function buildImageTMBUrl
 * @description Build the url for the TMD image
 * @param  {String} imageUri - URI of the image
 * @param  {Number} [width=200] - The width of the image to set
 * @return {String} - Image url
 */
export const buildImageTMBUrl = (imageUri, width = 200) =>
  `${BASE_IMAGE_URL}/w${width}${imageUri}`;
