import { query } from "../config/db.js";

/**
 * Get the full student profile by joining users + student_profiles.
 */
export async function getProfile(userId) {
  const { rows } = await query(
    `SELECT
       u.id,
       u.username,
       u.email,
       u.full_name,
       u.role,
       u.created_at,
       sp.roll_number,
       sp.department,
       sp.program,
       sp.semester,
       sp.enrollment_year,
       sp.phone,
       sp.avatar_url
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = $1`,
    [userId],
  );
  return rows[0] || null;
}

/**
 * Update selected fields on the student_profiles row.
 * Only updates the keys present in `fields`.
 */
export async function updateProfile(userId, fields) {
  // Whitelist of allowed columns to prevent injection via dynamic keys.
  const ALLOWED = new Set([
    "phone",
    "avatar_url",
  ]);

  const entries = Object.entries(fields).filter(([key]) => ALLOWED.has(key));
  if (entries.length === 0) return null;

  const setClauses = entries.map(([key], i) => `${key} = $${i + 2}`);
  const values = entries.map(([, val]) => val);

  const { rows } = await query(
    `UPDATE student_profiles
     SET ${setClauses.join(", ")}
     WHERE user_id = $1
     RETURNING *`,
    [userId, ...values],
  );
  return rows[0] || null;
}
