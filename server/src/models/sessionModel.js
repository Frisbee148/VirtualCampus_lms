import { query } from "../config/db.js";

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
  return rows[0];
}

export async function isSessionActive(jti) {
  const { rows } = await query(
    `SELECT 1 FROM login_sessions
     WHERE token_jti = $1 AND revoked_at IS NULL AND expires_at > now()`,
    [jti],
  );
  return rows.length > 0;
}

export async function revokeSession(jti) {
  await query(
    `UPDATE login_sessions SET revoked_at = now()
     WHERE token_jti = $1 AND revoked_at IS NULL`,
    [jti],
  );
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
