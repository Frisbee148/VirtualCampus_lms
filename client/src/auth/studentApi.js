// Student API client – mirrors authApi.js pattern but always sends Bearer token.

import { getToken } from "./authApi.js";

const API_URL = import.meta.env.VITE_API_URL || "https://virtualcampus-lms.onrender.com";

async function authGet(path) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, { headers });
  } catch {
    throw new Error("Cannot reach server. Is the backend running on " + API_URL + "?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

async function authRequest(path, { method = "GET", body } = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Cannot reach server. Is the backend running on " + API_URL + "?");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

/* ---- exported endpoint helpers ---- */

export const fetchDashboard = (sessionId) =>
  authGet(`/api/student/dashboard?session=${sessionId}`);

export const fetchProfile = () => authGet("/api/student/profile");

export const updateProfile = (fields) =>
  authRequest("/api/student/profile", { method: "PUT", body: fields });

export const fetchNotifications = () => authGet("/api/student/notifications");

export const markAllNotificationsRead = () =>
  authRequest("/api/student/notifications/read", { method: "PUT" });

export const fetchSessions = () => authGet("/api/student/sessions");

export const fetchTimetable = (sessionId, day) =>
  authGet(`/api/student/timetable?session=${sessionId}&day=${day}`);

export const addTimetableEntry = (entry) =>
  authRequest("/api/student/timetable", { method: "POST", body: entry });

export const updateTimetableEntry = (id, entry) =>
  authRequest(`/api/student/timetable/${id}`, { method: "PUT", body: entry });

export const deleteTimetableEntry = (id) =>
  authRequest(`/api/student/timetable/${id}`, { method: "DELETE" });

export const fetchDownloads = (sessionId) =>
  authGet(`/api/student/downloads?session=${sessionId}`);

export const fetchService = (key) =>
  authGet(`/api/student/services/${key}`);

export const fetchCourses = (sessionId) =>
  authGet(`/api/student/courses?session=${sessionId}`);

export const fetchCourseOverview = (courseId) =>
  authGet(`/api/student/courses/${courseId}/overview`);

export const fetchCourseSyllabus = (courseId) =>
  authGet(`/api/student/courses/${courseId}/syllabus`);

export const toggleSyllabusUnit = (courseId, unitId) =>
  authRequest(`/api/student/courses/${courseId}/syllabus/${unitId}`, {
    method: "PUT",
  });

export const fetchCourseAttendance = (courseId) =>
  authGet(`/api/student/courses/${courseId}/attendance`);

export const fetchCourseFaculty = (courseId) =>
  authGet(`/api/student/courses/${courseId}/faculties`);

export const fetchGrades = (sessionId) =>
  authGet(`/api/student/grades?session=${sessionId}`);

export const fetchPerformance = () => authGet("/api/student/performance");

export const fetchFeedback = (sessionId) =>
  authGet(`/api/student/feedback?session=${sessionId}`);

export const fetchFeeStatus = (sessionId) =>
  authGet(`/api/student/fees?session=${sessionId}`);

export const fetchClubs = () => authGet("/api/student/clubs");

export const fetchClubDetail = (id) => authGet(`/api/student/clubs/${id}`);
