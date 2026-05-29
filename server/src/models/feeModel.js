import { query } from "../config/db.js";

/**
 * Get fee items and payment status for a student in a given session.
 */
export async function getFeeStatus(studentId, sessionId) {
  const { rows: items } = await query(
    `SELECT id, item_name, amount
     FROM fee_items
     WHERE session_id = $1
     ORDER BY item_name`,
    [sessionId],
  );

  const { rows: payments } = await query(
    `SELECT id, total_amount, paid_amount, status
     FROM fee_payments
     WHERE student_id = $1 AND session_id = $2`,
    [studentId, sessionId],
  );

  return { items, payment: payments[0] || null };
}
