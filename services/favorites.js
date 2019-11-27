const favorites = [];

export class FavoritesService {
  setFavorite(id) {
    if (favorites.indexOf(id) === -1) {
      favorites.push(id);
    }
  }
}
