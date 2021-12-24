import { Router } from 'express';
import { Redis } from 'ioredis';
import auth from './auth';
import apiRateMiddleware from './middleware/apiRateMiddleware';
import users from './users';
import channels from './channels';

export default (redis: Redis) => {
  const router = Router();

  router.use('/api/', apiRateMiddleware(redis));

  router.use('/api/v1/users', users);
  router.use('/api/v1/channels', channels);
  router.use('/api/v1/auth', auth);

  return router;
};
