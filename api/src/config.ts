import { env } from 'process'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import ormConfig from './ormConfig'
import R from 'ramda'
import redisConfig from './redisConfig'
import { RedisOptions } from 'ioredis'

const nodeEnv = env.NODE_ENV || 'development'

export default {
  session: {
    cookie: R.defaultTo('sub', env.SESSION_COOKIE),
    secret: R.defaultTo('X4/*-aX6', env.SESSION_SECRET),
    secure: R.defaultTo(false, env.SESSION_SECURE?.toLowerCase() === 'true')
  },
  api: {
    includeErrorTraceInResponse: nodeEnv === 'development'
  },
  app: {
    port: R.defaultTo(8000, parseInt(env.APP_PORT))
  },
  database: ormConfig as PostgresConnectionOptions,
  redis: {
    ...redisConfig
  } as RedisOptions
}
