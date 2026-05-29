import { query } from "../config/db.js";
import { redisClient, isRedisReady } from "../config/redis.js";

const SESSION_CACHE_TTL = 300; // 5 minutes
const sessionKey = (jti) => `session:active:${jti}`;

// Records the mode (role) the user logged in as, plus session metadata.
export async function createSession({
  userId,
  loginMode,
  jti,
  ip,
  userAgent,
  expiresAt,
}) {
  const { rows } = await query(
    `INSERT INTO login_sessions
       (user_id, login_mode, token_jti, ip_address, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, login_mode, login_at, expires_at`,
    [userId, loginMode, jti, ip || null, userAgent || null, expiresAt],
  );

  // Pre-warm the cache so the first authenticated request is fast.
  if (isRedisReady()) {
    try {
      await redisClient.set(sessionKey(jti), "1", "EX", SESSION_CACHE_TTL);
    } catch { /* Redis miss is non-fatal */ }
  }

  return rows[0];
}

export async function isSessionActive(jti) {
  // 1. Try Redis cache first.
  if (isRedisReady()) {
    try {
      const cached = await redisClient.get(sessionKey(jti));
      if (cached === "1") return true;   // active (cache hit)
      if (cached === "0") return false;  // revoked (cache hit)
    } catch { /* fall through to PG */ }
  }

  // 2. Cache miss — query PostgreSQL.
  const { rows } = await query(
    `SELECT 1 FROM login_sessions
     WHERE token_jti = $1 AND revoked_at IS NULL AND expires_at > now()`,
    [jti],
  );
  const active = rows.length > 0;

  // 3. Populate cache for next time.
  if (isRedisReady()) {
    try {
      await redisClient.set(
        sessionKey(jti),
        active ? "1" : "0",
        "EX",
        SESSION_CACHE_TTL,
      );
    } catch { /* non-fatal */ }
  }

  return active;
}

export async function revokeSession(jti) {
  await query(
    `UPDATE login_sessions SET revoked_at = now()
     WHERE token_jti = $1 AND revoked_at IS NULL`,
    [jti],
  );

  // Immediately invalidate the cache so the token is rejected on the next request.
  if (isRedisReady()) {
    try {
      await redisClient.del(sessionKey(jti));
    } catch { /* non-fatal */ }
  }
}

export async function listSessionsForUser(userId, limit = 20) {
  const { rows } = await query(
    `SELECT id, login_mode, ip_address, user_agent, login_at, expires_at, revoked_at
     FROM login_sessions
     WHERE user_id = $1
     ORDER BY login_at DESC
     LIMIT $2`,
    [userId, limit],
  );
  return rows;
}
