import { env } from 'process';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import R from 'ramda';
import { RedisOptions } from 'ioredis';
import ormConfig from './ormConfig';
import redisConfig from './redisConfig';

const nodeEnv = env.NODE_ENV || 'development';

export default {
  session: {
    cookie: R.defaultTo('sub', env.SESSION_COOKIE),
    secret: R.defaultTo('X4/*-aX6', env.SESSION_SECRET),
    secure: R.defaultTo(false, env.SESSION_SECURE?.toLowerCase() === 'true'),
  },
  api: {
    includeErrorTraceInResponse: nodeEnv === 'development',
  },
  app: {
    port: R.defaultTo(8000, parseInt(env.APP_PORT, 10)),
  },
  database: ormConfig as PostgresConnectionOptions,
  redis: {
    ...redisConfig,
  } as RedisOptions,
};
