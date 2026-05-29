import { query } from "../config/db.js";

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
export async function findByUsername(username) {
  const { rows } = await query(
    `SELECT id, username, email, full_name, role, status, password_hash
     FROM users WHERE username = $1`,
    [username],
  );
  return rows[0] || null;
}

export async function findById(id) {
  const { rows } = await query(
    `SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`,
    [id],
  );
  return rows[0] || null;
}
