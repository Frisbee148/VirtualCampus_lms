import { query } from "../config/db.js";

/**
 * Get all clubs with the student's membership role (null if not a member).
 */
export async function getClubs(studentId) {
  const { rows } = await query(
    `SELECT
       cl.id,
       cl.name,
       cl.description,
       cl.member_count,
       cm.role
     FROM clubs cl
     LEFT JOIN club_memberships cm
       ON cm.club_id = cl.id AND cm.user_id = $1
     ORDER BY cl.name`,
    [studentId],
  );
  return rows;
}

/**
 * Get full club detail: info, upcoming events, and member list.
 */
export async function getClubDetail(clubId) {
  // Club info
  const { rows: clubRows } = await query(
    `SELECT id, name, description, member_count
     FROM clubs
     WHERE id = $1`,
    [clubId],
  );
  const club = clubRows[0] || null;
  if (!club) return null;

  // Events for this club
  const { rows: events } = await query(
    `SELECT id, name, event_date, register_url
     FROM club_events
     WHERE club_id = $1
     ORDER BY event_date DESC`,
    [clubId],
  );

  // Members
  const { rows: members } = await query(
    `SELECT
       cm.id,
       cm.member_name,
       cm.role
     FROM club_memberships cm
     WHERE cm.club_id = $1
     ORDER BY cm.role, cm.member_name`,
    [clubId],
  );

  return { club, events, members };
}
