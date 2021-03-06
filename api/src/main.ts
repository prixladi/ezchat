import express from 'express';
import { createConnection as createDbConnection } from 'typeorm';
import cors from 'cors';
import config from './config';
import { createConnection as createRedisConnection } from './redis';
import buildApi from './api';
import errorMiddleware from './api/middleware/errorMiddleware';
import session from './session';
import { logger, loggingMiddleware } from './logging';
import socket from './socket';

const main = async () => {
  await createDbConnection(config.database);
  const redis = createRedisConnection(config.redis);

  const app = express();
  const sessionMiddleware = session(redis);

  app.use(cors({ origin: true, credentials: true }));
  app.use(sessionMiddleware);

  app.use(express.json());
  app.use(loggingMiddleware);
  app.use(buildApi(redis));
  app.use(errorMiddleware);

  const server = socket(app, sessionMiddleware);

  server.listen(config.app.port, () => {
    logger.info(`Listening to requests on http://localhost:${config.app.port}`);
  });
};

process.on('uncaughtException', (err) => {
  logger.error(err);
});

main().catch((err) => {
  logger.error(err);
});
