import {
  getCoursesForStudent,
  getCourseOverview,
  getCourseSyllabus,
  toggleSyllabusProgress,
  getCourseAttendance,
  getCourseFaculty,
} from "../models/courseModel.js";
import { getGrades, getPerformance } from "../models/gradeModel.js";
import { getFeedbackForms } from "../models/studentServiceModel.js";
import { HttpError, asyncHandler } from "../middleware/error.js";

// GET /api/student/courses
export const courses = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const data = await getCoursesForStudent(req.user.id, sessionId);
  res.json({ courses: data });
});

// GET /api/student/courses/:id/overview
export const courseOverview = asyncHandler(async (req, res) => {
  const data = await getCourseOverview(req.params.id, req.user.id);
  res.json({ evaluations: data });
});

// GET /api/student/courses/:id/syllabus
export const courseSyllabus = asyncHandler(async (req, res) => {
  const data = await getCourseSyllabus(req.params.id, req.user.id);
  res.json({ syllabus: data });
});

// PUT /api/student/courses/:id/syllabus/:unitId
export const toggleSyllabus = asyncHandler(async (req, res) => {
  const result = await toggleSyllabusProgress(req.user.id, req.params.unitId);
  res.json(result);
});

// GET /api/student/courses/:id/attendance
export const courseAttendance = asyncHandler(async (req, res) => {
  // We need the enrollment_id. Look it up from query param or derive it.
  const enrollmentId = req.query.enrollment;
  if (!enrollmentId) {
    throw new HttpError(400, "enrollment query parameter is required");
  }

  const data = await getCourseAttendance(enrollmentId);
  res.json({ attendance: data });
});

// GET /api/student/courses/:id/faculties
export const courseFaculty = asyncHandler(async (req, res) => {
  const data = await getCourseFaculty(req.params.id);
  res.json({ faculty: data });
});

// GET /api/student/grades
export const grades = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const data = await getGrades(req.user.id, sessionId);
  res.json({ courses: data });
});

// GET /api/student/performance
export const performance = asyncHandler(async (req, res) => {
  const data = await getPerformance(req.user.id);
  res.json({ performance: data });
});

// GET /api/student/feedback
export const feedback = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const data = await getFeedbackForms(sessionId);
  res.json({ feedbacks: data });
});
