import { RedisOptions } from 'ioredis';
import { env } from 'process';
import R from 'ramda';

export default {
  port: R.defaultTo(6379, env.REDIS_PORT),
  host: R.defaultTo('localhost', env.REDIS_HOST),
  password: R.defaultTo(null, env.REDIS_PASSWORD),
  db: R.defaultTo(0, env.REDIS_DB),
  reconnectOnError: () => true,
  maxRetriesPerRequest: 2,
  lazyConnect: true,
} as RedisOptions;
