import express from 'express';
import config from './config';
import { createConnection as createDbConnection } from 'typeorm';
import { createConnection as createRedisConnection } from './redis';
import api from './api';
import errorMiddleware from './api/middleware/errorMiddleware';
import cors from 'cors';

const main = async () => {
  await createDbConnection(config.database);
  createRedisConnection(config.redis);

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(api);
  app.use(errorMiddleware);

  app.listen(config.app.port, () => {
    console.log(`Listening to requests on http://localhost:${config.app.port}`);
  });
};

process.on('uncaughtException', function (err) {
  console.error('Uncaught exception', err);
});

main().catch((err) => {
  console.error(err);
});
