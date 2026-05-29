import { query } from "../config/db.js";

/**
 * Get all courses a student is enrolled in for a given academic session.
 */
export async function getCoursesForStudent(studentId, sessionId) {
  const { rows } = await query(
    `SELECT c.id, c.code, c.name, c.course_type, c.credits, c.semester,
            c.session_id, c.total_weightage, en.id AS enrollment_id
     FROM courses c
     JOIN enrollments en ON en.course_id = c.id
     WHERE en.student_id = $1
       AND c.session_id = $2
     ORDER BY c.name`,
    [studentId, sessionId],
  );
  return rows;
}

/**
 * Get course overview: evaluations and the student's scores for each.
 */
export async function getCourseOverview(courseId, studentId) {
  const { rows } = await query(
    `SELECT
       ev.id,
       ev.name,
       ev.max_score,
       ev.weightage,
       ss.score,
       ss.class_average
     FROM evaluations ev
     LEFT JOIN student_scores ss
       ON ss.evaluation_id = ev.id
       AND ss.enrollment_id = (
         SELECT en.id FROM enrollments en
         WHERE en.student_id = $2 AND en.course_id = $1
         LIMIT 1
       )
     WHERE ev.course_id = $1
     ORDER BY ev.name`,
    [courseId, studentId],
  );
  return rows;
}

/**
 * Get syllabus units for a course, with optional per-student progress.
 */
export async function getCourseSyllabus(courseId, studentId) {
  const { rows } = await query(
    `SELECT
       su.id,
       su.unit_number,
       su.sub_unit,
       COALESCE(sp.completed, false) AS completed
     FROM syllabus_units su
     LEFT JOIN syllabus_progress sp
       ON sp.syllabus_unit_id = su.id AND sp.student_id = $2
     WHERE su.course_id = $1
     ORDER BY su.unit_number, su.sub_unit`,
    [courseId, studentId],
  );
  return rows;
}

/**
 * Toggle syllabus progress for a student on a specific unit.
 * INSERT on first toggle, then flip `completed` on subsequent toggles.
 */
export async function toggleSyllabusProgress(studentId, syllabusUnitId) {
  const { rows } = await query(
    `INSERT INTO syllabus_progress (student_id, syllabus_unit_id, completed)
     VALUES ($1, $2, true)
     ON CONFLICT (student_id, syllabus_unit_id)
     DO UPDATE SET completed = NOT syllabus_progress.completed
     RETURNING *`,
    [studentId, syllabusUnitId],
  );
  return rows[0];
}

/**
 * Get attendance records for an enrollment.
 */
export async function getCourseAttendance(enrollmentId) {
  const { rows } = await query(
    `SELECT id, record_date, status, time_slot
     FROM attendance_records
     WHERE enrollment_id = $1
     ORDER BY record_date`,
    [enrollmentId],
  );
  return rows;
}

/**
 * Get faculty members teaching a course.
 */
export async function getCourseFaculty(courseId) {
  const { rows } = await query(
    `SELECT id, faculty_name, department, room, email
     FROM course_faculty
     WHERE course_id = $1
     ORDER BY faculty_name`,
    [courseId],
  );
  return rows;
}
