import R from 'ramda'

export = {
  type: 'postgres',
  username: R.defaultTo('admin', process.env.DB_USERNAME),
  password: R.defaultTo('secret', process.env.DB_PASSWORD),
  database: R.defaultTo('ezchat', process.env.DB_NAME),
  host: R.defaultTo('localhost', process.env.DB_HOST),
  port: R.defaultTo(5432, parseInt(process.env.DB_POSRT)),
  logging: R.defaultTo(false, process.env.DB_LOGGING_ENABLED),
  synchronize: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}
