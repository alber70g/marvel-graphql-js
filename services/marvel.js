import { marvelFetch, querystring } from './utils';

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
