declare const _default: {
    app: {
        port: number;
    };
    database: {
        type: string;
        username: string;
        password: string;
        database: string;
        host: string;
        port: number;
        logging: string | boolean;
        synchronize: boolean;
        entities: string[];
        migrations: string[];
        subscribers: string[];
        cli: {
            entitiesDir: string;
            migrationsDir: string;
            subscribersDir: string;
        };
    };
};
export default _default;
