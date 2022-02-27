export const database = {
  type: process.env.DB_TYPE || ('postgres' as any),
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_POST || 5432,
  database: process.env.DB_NAME || 'test_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
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
