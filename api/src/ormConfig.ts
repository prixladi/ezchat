import R from 'ramda';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const resolveFiles = (sub: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `dist/**/${sub}/**/*.js`;
  }

  return `src/${sub}/**/*.ts`;
};

const resolveFolder = (sub: string) => {
  if (process.env.NODE_ENV === 'production') {
    return `dist/**/${sub}`;
  }

  return `src/${sub}`;
};

export default {
  type: 'postgres',
  username: R.defaultTo('admin', process.env.DB_USERNAME),
  password: R.defaultTo('secret', process.env.DB_PASSWORD),
  database: R.defaultTo('ezchat', process.env.DB_NAME),
  host: R.defaultTo('localhost', process.env.DB_HOST),
  port: R.defaultTo(5432, parseInt(process.env.DB_POSRT, 10)),
  logging: R.defaultTo(false, process.env.DB_LOGGING_ENABLED),
  synchronize: false,
  migrationsRun: true,
  entities: [resolveFiles('entity')],
  migrations: [resolveFiles('migration')],
  subscribers: [resolveFiles('subscribers')],
  cli: {
    entitiesDir: resolveFolder('entity'),
    migrationsDir: resolveFolder('migration'),
    subscribersDir: resolveFolder('subscriber'),
  },
} as PostgresConnectionOptions;
