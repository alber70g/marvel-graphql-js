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

  deleteFavorite(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }
}
