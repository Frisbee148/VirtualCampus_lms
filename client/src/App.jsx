import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Auth
import LoginPage from "./auth/LoginPage";

// Student Interface
import {
  DashboardHome,
  CourseOverview,
  CourseSyllabus,
  CourseAttendance,
  CourseFaculties,
  CalendarMonthly,
  CalendarWeekly,
  CalendarDaily,
  PerformanceCGPA,
  GradesScreen,
  FeeStatus,
  DownloadsScreen,
  FacultyFeedback,
  CommunityClubs,
  ClubDetail,
  ProfileScreen,
  NotificationsScreen,
  AIMentorEmpty,
  AIMentorActive,
  StudentServiceScreen,
} from "./studentinterface";

// Faculty Interface
import {
  FacultyDashboard,
  AtRiskStudents,
  BatchInsights,
  FacultyCalendar,
  FacultyTimetable,
  FacultyProfile,
  FacultyNotifications,
} from "./facultyinterface";

// Parent / Guardian Interface
import {
  ParentDashboard,
  ParentPerformance,
  ParentGrades,
  ParentAttendance,
  ParentFeeStatus,
  ParentCalendar,
  ParentTimetable,
  ParentProfile,
  ParentNotifications,
} from "./parentinterface";

// Director Interface
import {
  DirectorDashboard,
  Departments,
  FacultyManagement,
  DirectorApprovals,
  InstitutionAnalytics,
  DirectorProfile,
  DirectorNotifications,
} from "./directorinterface";

// Registrar Interface
import {
  RegistrarDashboard,
  Admissions,
  StudentRecords,
  ExamManagement,
  CertificateRequests,
  RegistrarProfile,
  RegistrarNotifications,
} from "./registrarinterface";

// Admin Interface
import {
  AdminDashboard,
  UserManagement,
  RolePermissions,
  SystemSettings,
  AuditLogs,
  AdminProfile,
  AdminNotifications,
} from "./admininterface";

// Librarian Interface
import {
  LibrarianDashboard,
  BookManagement,
  LibrarianUserManagement,
  BorrowReturn,
  LibrarianProfile,
  LibrarianNotifications,
} from "./librarianinterface";

// HOD Interface
import {
  HodDashboard,
  HodFacultyManagement,
  HodCourseAllocation,
  HodApprovals,
  HodDeptAnalytics,
  HodMyCourses,
  HodAtRisk,
  HodBatchInsights,
  HodCalendar,
  HodTimetable,
  HodProfile,
  HodNotifications,
} from "./hodinterface";

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

        {/* Added Student Services (missing options only) */}
        <Route
          path="/btp"
          element={<StudentServiceScreen serviceKey="btp" activeTab="BTP" />}
        />
        <Route
          path="/mini-project"
          element={
            <StudentServiceScreen
              serviceKey="miniProject"
              activeTab="Mini Project"
            />
          }
        />
        <Route
          path="/extra-curriculum"
          element={
            <StudentServiceScreen
              serviceKey="extraCurriculum"
              activeTab="Extra Curriculum"
            />
          }
        />
        <Route
          path="/student-history"
          element={
            <StudentServiceScreen
              serviceKey="studentHistory"
              activeTab="Student History"
            />
          }
        />
        <Route
          path="/fee-receipt"
          element={
            <StudentServiceScreen
              serviceKey="feeReceipt"
              activeTab="Fee Receipt"
            />
          }
        />
        <Route
          path="/attendance-date-wise"
          element={
            <StudentServiceScreen
              serviceKey="attendanceDateWise"
              activeTab="Attendance Date Wise"
            />
          }
        />
        <Route
          path="/admit-card"
          element={
            <StudentServiceScreen
              serviceKey="admitCard"
              activeTab="Admit Card"
            />
          }
        />
        <Route
          path="/disciplinary-action"
          element={
            <StudentServiceScreen
              serviceKey="disciplinaryAction"
              activeTab="Disciplinary Action"
            />
          }
        />
        <Route
          path="/drop-course"
          element={
            <StudentServiceScreen
              serviceKey="dropCourse"
              activeTab="Drop Course"
            />
          }
        />
        <Route
          path="/bank-details-submission"
          element={
            <StudentServiceScreen
              serviceKey="bankDetailsSubmission"
              activeTab="Bank Details Submission"
            />
          }
        />
        <Route
          path="/student-charges"
          element={
            <StudentServiceScreen
              serviceKey="studentCharges"
              activeTab="Student Charges"
            />
          }
        />
        <Route
          path="/course-replacement"
          element={
            <StudentServiceScreen
              serviceKey="courseReplacement"
              activeTab="Course Replacement"
            />
          }
        />

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
        <Route
          path="/faculty/notifications"
          element={<FacultyNotifications />}
        />

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

        {/* Director Dashboard */}
        <Route path="/director/dashboard" element={<DirectorDashboard />} />
        <Route path="/director/departments" element={<Departments />} />
        <Route path="/director/faculty" element={<FacultyManagement />} />
        <Route path="/director/approvals" element={<DirectorApprovals />} />
        <Route path="/director/analytics" element={<InstitutionAnalytics />} />
        <Route path="/director/profile" element={<DirectorProfile />} />
        <Route
          path="/director/notifications"
          element={<DirectorNotifications />}
        />

        {/* Registrar Dashboard */}
        <Route path="/registrar/dashboard" element={<RegistrarDashboard />} />
        <Route path="/registrar/admissions" element={<Admissions />} />
        <Route path="/registrar/records" element={<StudentRecords />} />
        <Route path="/registrar/exams" element={<ExamManagement />} />
        <Route
          path="/registrar/certificates"
          element={<CertificateRequests />}
        />
        <Route path="/registrar/profile" element={<RegistrarProfile />} />
        <Route
          path="/registrar/notifications"
          element={<RegistrarNotifications />}
        />

        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/roles" element={<RolePermissions />} />
        <Route path="/admin/settings" element={<SystemSettings />} />
        <Route path="/admin/audit" element={<AuditLogs />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />

        {/* Librarian Dashboard */}
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
        <Route path="/librarian/books" element={<BookManagement />} />
        <Route path="/librarian/users" element={<LibrarianUserManagement />} />
        <Route path="/librarian/borrow" element={<BorrowReturn />} />
        <Route path="/librarian/profile" element={<LibrarianProfile />} />
        <Route
          path="/librarian/notifications"
          element={<LibrarianNotifications />}
        />

        {/* HOD Dashboard */}
        <Route path="/hod/dashboard" element={<HodDashboard />} />
        <Route path="/hod/faculty" element={<HodFacultyManagement />} />
        <Route path="/hod/courses" element={<HodCourseAllocation />} />
        <Route path="/hod/approvals" element={<HodApprovals />} />
        <Route path="/hod/analytics" element={<HodDeptAnalytics />} />
        <Route path="/hod/my-courses" element={<HodMyCourses />} />
        <Route path="/hod/at-risk" element={<HodAtRisk />} />
        <Route path="/hod/batch-insights" element={<HodBatchInsights />} />
        <Route path="/hod/calendar" element={<HodCalendar />} />
        <Route path="/hod/timetable" element={<HodTimetable />} />
        <Route path="/hod/profile" element={<HodProfile />} />
        <Route path="/hod/notifications" element={<HodNotifications />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
