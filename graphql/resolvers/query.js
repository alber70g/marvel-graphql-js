import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Query: {
    
    async character(_, args, { marvel }) {
      return marvel.getCharacter(args.id);
    },
    characters(_, { offset, limit }, { marvel }) {
      return marvel.getCharacters(limit, offset);
    },
  },
};

export default resolveFunctions;
