import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Mutation: {
    setFavorite(_, { id }, context) {
      context.favorites.setFavorite(id);
      return context.marvel.getCharacter(id);
    },
    unFavorite(_, { id }, context) {
      context.favorites.deleteFavorite(id);
      return context.marvel.getCharacter(id);
    },
  },
};

export default resolveFunctions;
