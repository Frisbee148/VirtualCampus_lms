import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  dashboard,
  profile,
  updateProfile,
  notifications,
  markNotificationsRead,
  sessions,
  timetable,
  addTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  downloads,
  service,
} from "../controllers/studentController.js";

const router = Router();
router.use(requireAuth, requireRole("student"));

router.get("/dashboard", dashboard);
router.get("/profile", profile);
router.put("/profile", updateProfile);
router.get("/notifications", notifications);
router.put("/notifications/read", markNotificationsRead);
router.get("/sessions", sessions);
router.get("/timetable", timetable);
router.post("/timetable", addTimetableEntry);
router.put("/timetable/:id", updateTimetableEntry);
router.delete("/timetable/:id", deleteTimetableEntry);
router.get("/downloads", downloads);
router.get("/services/:key", service);

export default router;
