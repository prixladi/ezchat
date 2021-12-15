import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { Redis } from 'ioredis'

export default (redis: Redis) =>
  rateLimit({
    store: new RedisStore({
      client: redis
    }),
    windowMs: 1 * 60 * 1000,
    max: 200
  })
