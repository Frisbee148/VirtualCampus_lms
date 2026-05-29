import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { assertConnection, pool } from "./config/db.js";
import { redisClient } from "./config/redis.js";

async function start() {
  // --- PostgreSQL ---
  try {
    const now = await assertConnection();
    console.log(`Connected to PostgreSQL at ${now}`);
  } catch (err) {
    console.error("Could not connect to PostgreSQL:", err.message);
    console.error("Check your .env DATABASE_URL / PG* settings and that Postgres is running.");
    process.exit(1);
  }

  // --- Redis (non-fatal — app degrades gracefully without it) ---
  try {
    await redisClient.connect();
    console.log(`Connected to Redis at ${env.redisUrl}`);
  } catch (err) {
    console.warn("Could not connect to Redis:", err.message);
    console.warn("The server will run without caching / rate-limiting.");
  }

  const app = createApp();
  const server = app.listen(env.port, () => {
    console.log(`virtualCampus API listening on http://localhost:${env.port}`);
  });

  const shutdown = () => {
    console.log("Shutting down ...");
    server.close(() =>
      Promise.all([
        pool.end(),
        redisClient.quit().catch(() => {}),
      ]).finally(() => process.exit(0)),
    );
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start();
