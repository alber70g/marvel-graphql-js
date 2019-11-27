import { pubsub } from '../subscriptions/subscriptions';
import logger from '../../core/logger/app-logger';

const resolveFunctions = {
  Character: {
    thumbnail({ thumbnail: { path, extension } }) {
      return `${path}.${extension}`;
    },
    comics(parent) {
      return parent.comics.items;
    },
  },
};

export default resolveFunctions;
