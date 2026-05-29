import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  courses,
  courseOverview,
  courseSyllabus,
  toggleSyllabus,
  courseAttendance,
  courseFaculty,
  grades,
  performance,
  feedback,
} from "../controllers/courseController.js";

const router = Router();
router.use(requireAuth, requireRole("student"));

router.get("/courses", courses);
router.get("/courses/:id/overview", courseOverview);
router.get("/courses/:id/syllabus", courseSyllabus);
router.put("/courses/:id/syllabus/:unitId", toggleSyllabus);
router.get("/courses/:id/attendance", courseAttendance);
router.get("/courses/:id/faculties", courseFaculty);
router.get("/grades", grades);
router.get("/performance", performance);
router.get("/feedback", feedback);

export default router;
