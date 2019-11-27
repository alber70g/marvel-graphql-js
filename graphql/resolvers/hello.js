import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Query: {
    hello() {
      return "world!"
    }
  },
};

export default resolveFunctions;
