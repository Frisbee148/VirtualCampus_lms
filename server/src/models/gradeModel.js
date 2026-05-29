import { query } from "../config/db.js";

/**
 * Get semester grades for a student in a given session.
 * Returns each course's grade plus its evaluation breakdown.
 */
export async function getGrades(studentId, sessionId) {
  // 1. Semester-level grades per course
  const { rows: grades } = await query(
    `SELECT
       sg.id,
       sg.course_id,
       c.code AS course_code,
       c.name AS course_name,
       c.credits,
       sg.grade,
       sg.total_score,
       sg.class_avg
     FROM semester_grades sg
     JOIN courses c ON c.id = sg.course_id
     WHERE sg.student_id = $1
       AND sg.session_id = $2
     ORDER BY c.code`,
    [studentId, sessionId],
  );

  // 2. Evaluation-level scores for all courses in the session
  const courseIds = grades.map((g) => g.course_id);
  let scoreMap = {};

  if (courseIds.length > 0) {
    const placeholders = courseIds.map((_, i) => `$${i + 2}`).join(", ");
    const { rows: scores } = await query(
      `SELECT
         ev.course_id,
         ev.id AS evaluation_id,
         ev.name,
         ev.max_score,
         ev.weightage,
         ss.score
       FROM evaluations ev
       LEFT JOIN student_scores ss
         ON ss.evaluation_id = ev.id
         AND ss.enrollment_id IN (
           SELECT en.id FROM enrollments en WHERE en.student_id = $1
         )
       WHERE ev.course_id IN (${placeholders})
       ORDER BY ev.name`,
      [studentId, ...courseIds],
    );

    for (const s of scores) {
      if (!scoreMap[s.course_id]) scoreMap[s.course_id] = [];
      scoreMap[s.course_id].push(s);
    }
  }

  return grades.map((g) => ({
    ...g,
    exams: scoreMap[g.course_id] || [],
  }));
}

/**
 * Get semester performance rows (SGPA / CGPA) for chart display.
 */
export async function getPerformance(studentId) {
  const { rows } = await query(
    `SELECT
       sp.id,
       sp.session_id,
       sp.label,
       sp.short_label,
       sp.credits,
       sp.sgpa
     FROM semester_performance sp
     WHERE sp.student_id = $1
     ORDER BY sp.session_id`,
    [studentId],
  );
  return rows;
}
