import Redis from "ioredis";
import { env } from "./env.js";

/**
 * Redis client singleton.
 *
 * Connects via REDIS_URL (default redis://localhost:6379).
 * All callers import `redisClient` and use it directly.
 * Use `isRedisReady()` to guard cache operations so the app
 * degrades gracefully when Redis is unavailable.
 */
export const redisClient = new Redis(env.redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    // Exponential backoff capped at 3 seconds.
    return Math.min(times * 200, 3000);
  },
  lazyConnect: true, // we call .connect() explicitly in index.js
});

redisClient.on("connect", () => {
  console.log("Redis connected.");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

redisClient.on("close", () => {
  console.log("Redis connection closed.");
});

/**
 * Returns true when the client is in "ready" state (connected and
 * able to accept commands).
 */
export function isRedisReady() {
  return redisClient.status === "ready";
}
