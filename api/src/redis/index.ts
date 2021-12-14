import Redis, { Redis as IRedis, RedisOptions } from 'ioredis';
import R from 'ramda';
import { logger } from '../logging';

let redis: IRedis | undefined;

const createConnection = (config: RedisOptions): IRedis => {
  redis = new Redis(config);
  redis.connect(() => {
    logger.info(`Connected to redis running at '${config.host}:${config.port}'`);
  });

  return redis;
};

const getRedisClient = (): IRedis => {
  if (R.isNil(redis)) {
    throw new Error('Unable to get redis instance because connection was not initialized.');
  }

  return redis;
};

export { getRedisClient, createConnection };
