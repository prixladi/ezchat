import { env } from 'process';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import ormConfig from './ormConfig';
import R from 'ramda';
import redisConfig from './redisConfig';
import { RedisOptions } from 'ioredis';

const nodeEnv = env.NODE_ENV || 'development';

export default {
  api: {
    includeErrorInResponse:
      nodeEnv === 'development' || env.API_INCLUDE_ERROR_IN_RESPONSE?.toLowerCase() === 'true',
  },
  app: {
    port: R.defaultTo(parseInt(env.APP_PORT), 8000),
  },
  database: ormConfig as PostgresConnectionOptions,
  redis: {
    ...redisConfig,
  } as RedisOptions,
};
