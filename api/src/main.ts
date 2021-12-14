import express from 'express';
import config from './config';
import { createConnection as createDbConnection } from 'typeorm';
import { createConnection as createRedisConnection } from './redis';
import api from './api';
import errorMiddleware from './api/middleware/errorMiddleware';
import cors from 'cors';
import session from './session';
import { logger, loggingMiddleware } from './logging';

const main = async () => {
  await createDbConnection(config.database);
  const redis = createRedisConnection(config.redis);

  const app = express();
  //app.set('trust proxy', 1)
  app.use(cors());
  app.use(session(redis));

  app.use(express.json());
  app.use(loggingMiddleware);
  app.use(api);
  app.use(errorMiddleware);

  app.listen(config.app.port, () => {
    logger.info(`Listening to requests on http://localhost:${config.app.port}`);
  });
};

process.on('uncaughtException', function (err) {
  logger.error('Uncaught exception', err);
});

main().catch((err) => {
  logger.error(err);
});
