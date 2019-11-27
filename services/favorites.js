const favorites = [];

export class FavoritesService {
  isFavorite(id) {
    return favorites.indexOf(id) > -1;
  }

  setFavorite(id) {
    if (favorites.indexOf(id) === -1) {
      favorites.push(id);
    }
  }
}
