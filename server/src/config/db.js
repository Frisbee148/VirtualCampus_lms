import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

const poolConfig = env.databaseUrl
  ? {
      connectionString: env.databaseUrl,
      ssl: env.pg.ssl ? { rejectUnauthorized: false } : false,
    }
  : {
      host: env.pg.host,
      port: env.pg.port,
      user: env.pg.user,
      password: env.pg.password,
      database: env.pg.database,
      ssl: env.pg.ssl ? { rejectUnauthorized: false } : false,
    };

export const pool = new Pool(poolConfig);

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL pool error:", err);
});

// Thin query helper so callers don't need a client handle.
export const query = (text, params) => pool.query(text, params);

export async function assertConnection() {
  const { rows } = await pool.query("SELECT NOW() AS now");
  return rows[0].now;
}
