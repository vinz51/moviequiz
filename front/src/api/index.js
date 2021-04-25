import axios from "axios";

export const API_KEY = process.env.TMB_API_KEY;

/**
 * @function GET
 * @description Call api with the GET
 * @param {String} url - Url needs to make the axios' call
 * @param {Object} [params={}] - Parameters to attached to the request
 */
export const GET = (url, params = {}) =>
  axios.get(url, { params: { api_key: API_KEY, ...params } });
