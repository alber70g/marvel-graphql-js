import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Mutation: {
    setFavorite(parent, { id }, context) {
      context.favorites.setFavorite(id);
      return context.marvel.getCharacter(id);
    },
  },
};

export default resolveFunctions;
