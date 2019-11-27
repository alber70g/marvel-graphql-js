import md5 from 'md5';
import fetch from 'fetch-with-proxy';
import dotenv from 'dotenv';
import { logger } from '../core/logger/app-logger';

dotenv.config();
const API = 'https://gateway.marvel.com:443/v1/public/';

const key = process.env.MARVEL_KEY;
const pkey = process.env.MARVEL_PKEY;

const getHash = () => {
  const ts = new Date().getMilliseconds();
  return `&ts=${ts}&hash=${md5(ts + pkey + key)}`;
};

const marvelFetch = (res, queryParams = '') => {
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

const querystring = (params) =>
  '&' +
  Object.keys(params)
    .map((key) => {
      console.log({ [key]: params[key] });
      const res = params[key] ? key + '=' + params[key] : null;
      console.log({ q: res });
      return res;
    })
    .filter((x) => !!x)
    .join('&');

export class MarvelService {
  getCharacter(id) {
    return marvelFetch(`characters/${id}`).then((x) => x[0]);
  }
  
  getCharacters(limit, offset) {
    return marvelFetch(
      'characters',
      querystring({ limit, offset })
    );
  }
}
