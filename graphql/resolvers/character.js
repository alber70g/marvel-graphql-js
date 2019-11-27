import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Character: {
    thumbnail({ thumbnail: { path, extension } }) {
      return `${path}.${extension}`;
    },
  },
};

export default resolveFunctions;
