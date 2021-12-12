import { RedisOptions } from 'ioredis';
import { env } from 'process';
import R from 'ramda';

export default {
  port: R.defaultTo(env.REDIS_PORT, 6379),
  host: R.defaultTo(env.REDIS_HOST, 'localhost'),
  password: R.defaultTo(env.REDIS_PASSWORD, null),
  db: R.defaultTo(env.REDIS_DB, 0),
  reconnectOnError: () => true,
} as RedisOptions;
