import R from 'ramda'

export = {
  type: 'postgres',
  username: R.defaultTo(process.env.DB_USERNAME, 'admin'),
  password: R.defaultTo(process.env.DB_PASSWORD, 'secret'),
  database: R.defaultTo(process.env.DB_NAME, 'ezchat'),
  host: R.defaultTo(process.env.DB_HOST, 'localhost'),
  port: R.defaultTo(parseInt(process.env.DB_POSRT), 5432),
  logging: R.defaultTo(process.env.DB_LOGGING_ENABLED, false),
  synchronize: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  }
};
