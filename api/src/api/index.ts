import { Router } from 'express';
import { Redis } from 'ioredis';
import apiRateMiddleware from './middleware/apiRateMiddleware';
import users from './users';
import channels from './channels';
import sessionMiddleware from './middleware/sessionMiddleware';

export default (redis: Redis) => {
  const router = Router();

  router.use('/api/', apiRateMiddleware(redis), sessionMiddleware);

  router.use('/api/v1/users', users);
  router.use('/api/v1/channels', channels);

  return router;
};
