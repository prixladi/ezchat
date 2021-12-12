"use strict";
module.exports = {
    type: 'postgres',
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'secret',
    database: process.env.DB_NAME || 'ezchat',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_POSRT) || 5432,
    logging: process.env.DB_LOGGING_ENABLED || false,
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
//# sourceMappingURL=ormConfig.js.map