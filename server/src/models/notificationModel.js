import { query } from "../config/db.js";

/**
 * Get all notifications for a user, most recent first.
 */
export async function getNotifications(userId) {
  const { rows } = await query(
    `SELECT id, title, description, is_read, created_at
     FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId],
  );
  return rows;
}

/**
 * Mark every unread notification as read for a user.
 */
export async function markAllRead(userId) {
  const { rowCount } = await query(
    `UPDATE notifications
     SET is_read = true
     WHERE user_id = $1 AND is_read = false`,
    [userId],
  );
  return rowCount;
}
