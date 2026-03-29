import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth
import LoginPage from './auth/LoginPage';

// Student Interface
import {
  DashboardHome, CourseOverview, CourseSyllabus, CourseAttendance, CourseFaculties,
  CalendarMonthly, CalendarWeekly, CalendarDaily,
  PerformanceCGPA, GradesScreen, FeeStatus,
  DownloadsScreen, FacultyFeedback, CommunityClubs, ClubDetail,
  ProfileScreen, NotificationsScreen,
  AIMentorEmpty, AIMentorActive,
} from './studentinterface';

// Faculty Interface
import {
  FacultyDashboard, AtRiskStudents, BatchInsights,
  FacultyCalendar, FacultyTimetable, FacultyProfile,
} from './facultyinterface';

// Parent / Guardian Interface
import {
  ParentDashboard, ParentPerformance, ParentGrades, ParentAttendance,
  ParentFeeStatus, ParentCalendar, ParentTimetable,
  ParentProfile, ParentNotifications,
} from './parentinterface';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<LoginPage />} />

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/performance" element={<PerformanceCGPA />} />
        <Route path="/grades" element={<GradesScreen />} />
        <Route path="/fee-status" element={<FeeStatus />} />

        {/* Courses */}
        <Route path="/course/overview" element={<CourseOverview />} />
        <Route path="/course/syllabus" element={<CourseSyllabus />} />
        <Route path="/course/attendance" element={<CourseAttendance />} />
        <Route path="/course/faculties" element={<CourseFaculties />} />

        {/* Calendar & Timetable */}
        <Route path="/calendar" element={<CalendarMonthly />} />
        <Route path="/timetable" element={<CalendarWeekly />} />
        <Route path="/timetable/daily" element={<CalendarDaily />} />

        {/* Resources & Community */}
        <Route path="/downloads" element={<DownloadsScreen />} />
        <Route path="/feedback" element={<FacultyFeedback />} />
        <Route path="/community" element={<CommunityClubs />} />
        <Route path="/community/club" element={<ClubDetail />} />

        {/* User */}
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />

        {/* AI Mentor */}
        <Route path="/ai" element={<AIMentorEmpty />} />
        <Route path="/ai/active" element={<AIMentorActive />} />

        {/* Faculty Dashboard */}
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/at-risk" element={<AtRiskStudents />} />
        <Route path="/faculty/batch-insights" element={<BatchInsights />} />
        <Route path="/faculty/calendar" element={<FacultyCalendar />} />
        <Route path="/faculty/timetable" element={<FacultyTimetable />} />
        <Route path="/faculty/profile" element={<FacultyProfile />} />

        {/* Parent/Guardian Dashboard */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/performance" element={<ParentPerformance />} />
        <Route path="/parent/grades" element={<ParentGrades />} />
        <Route path="/parent/attendance" element={<ParentAttendance />} />
        <Route path="/parent/fee-status" element={<ParentFeeStatus />} />
        <Route path="/parent/calendar" element={<ParentCalendar />} />
        <Route path="/parent/timetable" element={<ParentTimetable />} />
        <Route path="/parent/profile" element={<ParentProfile />} />
        <Route path="/parent/notifications" element={<ParentNotifications />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
