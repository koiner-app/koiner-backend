export const database = {
  type: process.env.DB_TYPE || ('postgres' as any),
  host: process.env.DB_HOST || 'koiner-contracts-postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'koiner-contracts',
  username: process.env.DB_USER || 'db_user',
  password: process.env.DB_PASSWORD || 'password',
  ssl: process.env.SSL_CERT
    ? {
        rejectUnauthorized: false,
        ca: process.env.SSL_CERT,
      }
    : false,

  synchronize: true,

  // Don't auto-detect entities on purpose, we're letting modules decide for
  // themselves what needs to be saved.
  // entities : ["dist/**/model/*{.js,.ts}"],
  entities: [],

  // Do not scan for migrations automatically
  // migrations: ["dist/**/migration/*{.js,.ts}"],
  migrations: [],
  migrationsRun: true,
};
