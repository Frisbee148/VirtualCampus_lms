import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import LoginPage from './LoginPage';
import DashboardHome from './studentinterface/screens/DashboardHome';
import CourseOverview from './studentinterface/screens/CourseOverview';
import CourseSyllabus from './studentinterface/screens/CourseSyllabus';
import CourseAttendance from './studentinterface/screens/CourseAttendance';
import CourseFaculties from './studentinterface/screens/CourseFaculties';
import CalendarMonthly from './studentinterface/screens/CalendarMonthly';
import CalendarWeekly from './studentinterface/screens/CalendarWeekly';
import CalendarDaily from './studentinterface/screens/CalendarDaily';
import PerformanceCGPA from './studentinterface/screens/PerformanceCGPA';
import GradesScreen from './studentinterface/screens/GradesScreen';
import DownloadsScreen from './studentinterface/screens/DownloadsScreen';
import FacultyFeedback from './studentinterface/screens/FacultyFeedback';
import CommunityClubs from './studentinterface/screens/CommunityClubs';
import ClubDetail from './studentinterface/screens/ClubDetail';
import ProfileScreen from './studentinterface/screens/ProfileScreen';
import NotificationsScreen from './studentinterface/screens/NotificationsScreen';
import AIMentorEmpty from './studentinterface/screens/AIMentorEmpty';
import AIMentorActive from './studentinterface/screens/AIMentorActive';
import FeeStatus from './studentinterface/screens/FeeStatus';

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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
