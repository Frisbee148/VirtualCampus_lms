import { getProfile, updateProfile as updateProfileModel } from "../models/profileModel.js";
import { getNotifications, markAllRead } from "../models/notificationModel.js";
import {
  getService,
  getDocuments,
  getSessions as getSessionsModel,
  getDashboardStats,
  getTimetable as getTimetableModel,
  addTimetableEntry as addTimetableEntryModel,
  updateTimetableEntry as updateTimetableEntryModel,
  deleteTimetableEntry as deleteTimetableEntryModel,
} from "../models/studentServiceModel.js";
import { HttpError, asyncHandler } from "../middleware/error.js";

// GET /api/student/dashboard
export const dashboard = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const stats = await getDashboardStats(req.user.id, sessionId);
  res.json(stats);
});

// GET /api/student/profile
export const profile = asyncHandler(async (req, res) => {
  const data = await getProfile(req.user.id);
  if (!data) throw new HttpError(404, "Profile not found");
  res.json(data);
});

// PUT /api/student/profile
export const updateProfile = asyncHandler(async (req, res) => {
  const updated = await updateProfileModel(req.user.id, req.body);
  if (!updated) throw new HttpError(400, "No valid fields to update");
  res.json(updated);
});

// GET /api/student/notifications
export const notifications = asyncHandler(async (req, res) => {
  const data = await getNotifications(req.user.id);
  res.json({ notifications: data });
});

// PUT /api/student/notifications/read
export const markNotificationsRead = asyncHandler(async (req, res) => {
  const count = await markAllRead(req.user.id);
  res.json({ ok: true, markedRead: count });
});

// GET /api/student/sessions
export const sessions = asyncHandler(async (req, res) => {
  const data = await getSessionsModel();
  res.json({ sessions: data });
});

// GET /api/student/timetable
export const timetable = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const dayOfWeek = req.query.day !== undefined ? parseInt(req.query.day) : null;
  const data = await getTimetableModel(req.user.id, sessionId, dayOfWeek);
  res.json({ timetable: data });
});

// POST /api/student/timetable
export const addTimetableEntry = asyncHandler(async (req, res) => {
  const sessionId = req.query.session || req.body.session_id;
  if (!sessionId) throw new HttpError(400, "session_id is required");

  const { day_of_week, time_slot, event_title } = req.body;
  if (day_of_week === undefined || !time_slot || !event_title) {
    throw new HttpError(400, "day_of_week, time_slot and event_title are required");
  }

  const entry = await addTimetableEntryModel(req.user.id, sessionId, req.body);
  res.status(201).json(entry);
});

// PUT /api/student/timetable/:id
export const updateTimetableEntry = asyncHandler(async (req, res) => {
  const entry = await updateTimetableEntryModel(req.params.id, req.user.id, req.body);
  if (!entry) throw new HttpError(404, "Timetable entry not found or not editable");
  res.json(entry);
});

// DELETE /api/student/timetable/:id
export const deleteTimetableEntry = asyncHandler(async (req, res) => {
  const deleted = await deleteTimetableEntryModel(req.params.id, req.user.id);
  if (!deleted) throw new HttpError(404, "Timetable entry not found or not deletable");
  res.json({ ok: true });
});

// GET /api/student/downloads
export const downloads = asyncHandler(async (req, res) => {
  const sessionId = req.query.session;
  if (!sessionId) throw new HttpError(400, "session query parameter is required");

  const data = await getDocuments(sessionId);
  res.json({ documents: data });
});

// GET /api/student/services/:key
export const service = asyncHandler(async (req, res) => {
  const data = await getService(req.user.id, req.params.key);
  if (!data) throw new HttpError(404, "Service not found");
  res.json(data);
});
