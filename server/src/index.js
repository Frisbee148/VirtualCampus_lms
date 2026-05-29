import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { assertConnection, pool } from "./config/db.js";

async function start() {
  try {
    const now = await assertConnection();
    console.log(`Connected to PostgreSQL at ${now}`);
  } catch (err) {
    console.error("Could not connect to PostgreSQL:", err.message);
    console.error("Check your .env DATABASE_URL / PG* settings and that Postgres is running.");
    process.exit(1);
  }

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`virtualCampus API listening on http://localhost:${env.port}`);
  });

  const shutdown = () => {
    console.log("Shutting down ...");
    server.close(() => pool.end().finally(() => process.exit(0)));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start();
