import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { subscriptionManager } from './graphql/subscriptions/subscriptions';
import schema from './graphql/schema/schema';
import { logger } from './core/logger/app-logger';
import config from './core/config/config.dev';
import { MarvelService } from './services/marvel';
import { FavoritesService } from './services/favorites';
const GRAPHQL_PORT = config.serverPort;
const WS_PORT = config.serverWsPort;

const graphQLServer = express().use('*', cors());

graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  // @ts-ignore
  graphqlExpress({
    schema,
    context: {
      marvel: new MarvelService(),
      favorites: new FavoritesService(),
    },
  })
);

graphQLServer.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

graphQLServer.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
});

graphQLServer.listen(GRAPHQL_PORT, () =>
  logger.info(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
  )
);

// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () =>
  logger.info(
    // eslint-disable-line no-console
    `Websocket Server is now running on http://localhost:${WS_PORT}`
  )
);

const subscriptionServer = new SubscriptionServer(
  {
    onConnect: async (connectionParams) => {
      // Implement if you need to handle and manage connection
    },
    subscriptionManager: subscriptionManager,
  },
  {
    server: websocketServer,
    path: '/',
  }
);
