import { query } from "../config/db.js";

/**
 * Get a specific student service by its key.
 */
export async function getService(studentId, serviceKey) {
  const { rows } = await query(
    `SELECT id, service_key, title, subtitle, session_label, stats, columns, rows
     FROM student_services
     WHERE student_id = $1 AND service_key = $2`,
    [studentId, serviceKey],
  );
  return rows[0] || null;
}

/**
 * Get downloadable documents for a session.
 */
export async function getDocuments(sessionId) {
  const { rows } = await query(
    `SELECT id, name, file_url, file_size, uploaded_at
     FROM documents
     WHERE session_id = $1
     ORDER BY uploaded_at DESC`,
    [sessionId],
  );
  return rows;
}

/**
 * Get feedback forms for a session.
 */
export async function getFeedbackForms(sessionId) {
  const { rows } = await query(
    `SELECT ff.id, ff.name, ff.faculty_name, ff.form_url,
            c.name AS course_name
     FROM feedback_forms ff
     LEFT JOIN courses c ON c.id = ff.course_id
     WHERE ff.session_id = $1
     ORDER BY ff.name`,
    [sessionId],
  );
  return rows;
}

/**
 * Get all academic sessions, ordered for dropdown display.
 */
export async function getSessions() {
  const { rows } = await query(
    `SELECT session_id AS id, label, is_current, sort_order
     FROM academic_sessions
     ORDER BY sort_order`,
  );
  return rows;
}

/**
 * Get aggregated dashboard statistics for a student in a session.
 */
export async function getDashboardStats(studentId, sessionId) {
  // Total enrolled courses
  const { rows: courseRows } = await query(
    `SELECT COUNT(*)::int AS total_courses
     FROM enrollments en
     JOIN courses c ON c.id = en.course_id
     WHERE en.student_id = $1 AND c.session_id = $2`,
    [studentId, sessionId],
  );

  // Average attendance percentage
  const { rows: attendanceRows } = await query(
    `SELECT
       COALESCE(
         ROUND(
           100.0 * SUM(CASE WHEN ar.status = 1 THEN 1 ELSE 0 END)
           / NULLIF(COUNT(ar.id), 0)
         , 1),
       0) AS avg_attendance
     FROM attendance_records ar
     JOIN enrollments en ON en.id = ar.enrollment_id
     JOIN courses c ON c.id = en.course_id
     WHERE en.student_id = $1 AND c.session_id = $2`,
    [studentId, sessionId],
  );

  // Latest CGPA from semester_performance
  const { rows: cgpaRows } = await query(
    `SELECT sp.sgpa
     FROM semester_performance sp
     WHERE sp.student_id = $1
     ORDER BY sp.session_id DESC
     LIMIT 1`,
    [studentId],
  );

  // Student profile for user name
  const { rows: profileRows } = await query(
    `SELECT u.full_name, sp.semester
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = $1`,
    [studentId],
  );

  return {
    totalCourses: courseRows[0]?.total_courses || 0,
    avgAttendance: parseFloat(attendanceRows[0]?.avg_attendance) || 0,
    cgpa: cgpaRows[0]?.sgpa ?? null,
    userName: profileRows[0]?.full_name || 'User',
    semester: profileRows[0]?.semester || null,
  };
}

/**
 * Get timetable entries for a student, optionally filtered by day.
 */
export async function getTimetable(studentId, sessionId, dayOfWeek) {
  const params = [studentId, sessionId];
  let dayFilter = "";

  if (dayOfWeek !== null && dayOfWeek !== undefined) {
    dayFilter = "AND te.day_of_week = $3";
    params.push(dayOfWeek);
  }

  const { rows } = await query(
    `SELECT
       te.id,
       te.day_of_week,
       te.time_slot,
       te.event_title,
       te.room,
       te.is_custom
     FROM timetable_entries te
     WHERE te.student_id = $1
       AND te.session_id = $2
       ${dayFilter}
     ORDER BY te.day_of_week, te.time_slot`,
    params,
  );
  return rows;
}

/**
 * Add a custom timetable entry.
 */
export async function addTimetableEntry(studentId, sessionId, entry) {
  const { rows } = await query(
    `INSERT INTO timetable_entries
       (student_id, session_id, day_of_week, time_slot, event_title, room, is_custom)
     VALUES ($1, $2, $3, $4, $5, $6, true)
     RETURNING *`,
    [
      studentId,
      sessionId,
      entry.day_of_week,
      entry.time_slot,
      entry.event_title,
      entry.room || null,
    ],
  );
  return rows[0];
}

/**
 * Update a custom timetable entry owned by the student.
 */
export async function updateTimetableEntry(id, studentId, entry) {
  const { rows } = await query(
    `UPDATE timetable_entries
     SET day_of_week  = COALESCE($3, day_of_week),
         time_slot    = COALESCE($4, time_slot),
         event_title  = COALESCE($5, event_title),
         room         = COALESCE($6, room)
     WHERE id = $1
       AND student_id = $2
       AND is_custom = true
     RETURNING *`,
    [
      id,
      studentId,
      entry.day_of_week ?? null,
      entry.time_slot ?? null,
      entry.event_title ?? null,
      entry.room ?? null,
    ],
  );
  return rows[0] || null;
}

/**
 * Delete a custom timetable entry owned by the student.
 */
export async function deleteTimetableEntry(id, studentId) {
  const { rowCount } = await query(
    `DELETE FROM timetable_entries
     WHERE id = $1
       AND student_id = $2
       AND is_custom = true`,
    [id, studentId],
  );
  return rowCount > 0;
}
