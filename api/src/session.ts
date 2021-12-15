import config from './config';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { Redis } from 'ioredis';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export default (redis: Redis) => {
  const RedisStore = connectRedis(session);

  return session({
    name: config.session.cookie,
    store: new RedisStore({
      client: redis,
      disableTouch: false,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 50, // 50 days
      httpOnly: true,
      sameSite: 'lax',
      secure: config.session.secure,
    },
    saveUninitialized: false,
    secret: config.session.secret,
    resave: false,
  });
};