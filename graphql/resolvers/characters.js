import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Query: {
    async character(_, args, { marvel }) {
      return marvel.getCharacter(args.id);
    },
    characters(_, { skip, limit = 10 }, { marvel }) {
      return marvel.getCharacters(limit, skip);
    },
  },
};

export default resolveFunctions;
