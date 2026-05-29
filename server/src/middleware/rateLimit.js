import { redisClient, isRedisReady } from "../config/redis.js";

/**
 * Creates a Redis-backed fixed-window rate limiter middleware.
 *
 * @param {object}   opts
 * @param {number}   opts.windowMs   - Window size in milliseconds (default 60 000).
 * @param {number}   opts.max        - Max requests per window (default 100).
 * @param {function} [opts.keyGenerator] - (req) => string.  Defaults to req.ip.
 * @param {string}   [opts.message]  - Response body on 429.
 * @returns Express middleware
 */
export function createRateLimiter({
  windowMs = 60_000,
  max = 100,
  keyGenerator = (req) => req.ip,
  message = "Too many requests, please try again later",
} = {}) {
  const windowSec = Math.ceil(windowMs / 1000);

  return async (req, res, next) => {
    // If Redis is down, degrade gracefully — allow the request through.
    if (!isRedisReady()) return next();

    const key = `ratelimit:${keyGenerator(req)}:${Math.floor(Date.now() / windowMs)}`;

    try {
      const current = await redisClient.incr(key);

      // Set expiry only on the first increment (when key is newly created).
      if (current === 1) {
        await redisClient.expire(key, windowSec);
      }

      // Attach rate-limit headers.
      res.set("X-RateLimit-Limit", String(max));
      res.set("X-RateLimit-Remaining", String(Math.max(0, max - current)));

      if (current > max) {
        res.set("Retry-After", String(windowSec));
        return res.status(429).json({ error: message });
      }

      next();
    } catch {
      // Redis command failed — let the request through rather than blocking.
      next();
    }
  };
}
