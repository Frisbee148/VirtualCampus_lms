import { query } from "../config/db.js";
import { redisClient, isRedisReady } from "../config/redis.js";

const USER_CACHE_TTL = 600; // 10 minutes
const userIdKey = (id) => `user:id:${id}`;

const PUBLIC_COLUMNS =
  "id, username, email, full_name, role, status, created_at, updated_at";

export async function createUser({ username, email, fullName, passwordHash, role }) {
  const { rows } = await query(
    `INSERT INTO users (username, email, full_name, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${PUBLIC_COLUMNS}`,
    [username, email || null, fullName || null, passwordHash, role],
  );
  return rows[0];
}

// Includes password_hash — for auth only, never send to the client.
// NOT cached because it contains sensitive data and is only used during login.
export async function findByUsername(username) {
  const { rows } = await query(
    `SELECT id, username, email, full_name, role, status, password_hash
     FROM users WHERE username = $1`,
    [username],
  );
  return rows[0] || null;
}

export async function findById(id) {
  // 1. Try Redis cache.
  if (isRedisReady()) {
    try {
      const cached = await redisClient.get(userIdKey(id));
      if (cached) return JSON.parse(cached);
    } catch { /* fall through to PG */ }
  }

  // 2. Cache miss — query PostgreSQL.
  const { rows } = await query(
    `SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`,
    [id],
  );
  const user = rows[0] || null;

  // 3. Populate cache.
  if (user && isRedisReady()) {
    try {
      await redisClient.set(userIdKey(id), JSON.stringify(user), "EX", USER_CACHE_TTL);
    } catch { /* non-fatal */ }
  }

  return user;
}
