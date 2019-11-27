import md5 from 'md5';
// import fetch from 'fetch-with-proxy';
import fetch from "isomorphic-fetch";
import { logger } from '../core/logger/app-logger';
import dotenv from 'dotenv';
dotenv.config();

const API = 'https://gateway.marvel.com:443/v1/public/';

const key = process.env.MARVEL_KEY;
const pkey = process.env.MARVEL_PKEY;

const getHash = () => {
  const ts = new Date().getMilliseconds();
  return `&ts=${ts}&hash=${md5(ts + pkey + key)}`;
};

export const marvelFetch = (res, queryParams = '') => {
  const url = `${API}${res}?apikey=${key}${getHash()}${queryParams}`;
  logger.info(`calling Marvel ${url}`);
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return json.data.results;
    })
    .then((results) => {
      return results;
    });
};

export const querystring = (params) =>
  '&' +
  Object.keys(params)
    .map((key) => (params[key] ? key + '=' + params[key] : null))
    .filter((x) => !!x)
    .join('&');
