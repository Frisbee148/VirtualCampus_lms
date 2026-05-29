-- =============================================================================
-- Student Dashboard Schema
-- Idempotent: safe to run repeatedly (CREATE ... IF NOT EXISTS).
-- =============================================================================

-- ─── Academic Sessions ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academic_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    VARCHAR(20) NOT NULL UNIQUE,   -- e.g. '2025-26-II'
  label         VARCHAR(60) NOT NULL,          -- e.g. 'Session 2025-26 II'
  is_current    BOOLEAN NOT NULL DEFAULT false,
  sort_order    INT NOT NULL DEFAULT 0
);

-- ─── Courses ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code          VARCHAR(20) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  course_type   VARCHAR(30) NOT NULL DEFAULT 'Core',   -- Core, Elective, Mandatory
  credits       NUMERIC(4,2) NOT NULL DEFAULT 4,
  semester      INT,
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  total_weightage INT NOT NULL DEFAULT 100
);

CREATE INDEX IF NOT EXISTS idx_courses_session ON courses (session_id);

-- ─── Enrollments ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrollments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  UNIQUE(student_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments (student_id);

-- ─── Evaluations (per course) ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS evaluations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  name          VARCHAR(100) NOT NULL,    -- 'Quiz 1', 'Midsem', 'Endsem'
  max_score     INT NOT NULL,
  weightage     INT NOT NULL DEFAULT 0
);

-- ─── Student Scores ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_scores (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  evaluation_id UUID NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
  score         NUMERIC(6,2) NOT NULL,
  class_average NUMERIC(6,2),
  UNIQUE(enrollment_id, evaluation_id)
);

-- ─── Semester Grades (per course per session) ───────────────────────────────
CREATE TABLE IF NOT EXISTS semester_grades (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  grade         VARCHAR(5) NOT NULL,
  total_score   INT,
  class_avg     INT,
  UNIQUE(student_id, course_id, session_id)
);

-- ─── Semester Performance (SGPA/CGPA) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS semester_performance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  label         VARCHAR(60),
  short_label   VARCHAR(20),
  credits       INT NOT NULL,
  sgpa          NUMERIC(4,2) NOT NULL,
  UNIQUE(student_id, session_id)
);

-- ─── Syllabus Units ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS syllabus_units (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  unit_number   INT NOT NULL,
  sub_unit      VARCHAR(20) NOT NULL,
  UNIQUE(course_id, unit_number, sub_unit)
);

-- ─── Syllabus Progress ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS syllabus_progress (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  syllabus_unit_id UUID NOT NULL REFERENCES syllabus_units(id) ON DELETE CASCADE,
  completed     BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(student_id, syllabus_unit_id)
);

-- ─── Attendance Records ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance_records (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  record_date   DATE NOT NULL,
  status        INT NOT NULL DEFAULT 1,  -- 1 = present, 0 = absent, NULL = no class
  time_slot     VARCHAR(20) DEFAULT '09:00 AM'
);

CREATE INDEX IF NOT EXISTS idx_attendance_enrollment ON attendance_records (enrollment_id);

-- ─── Course Faculty ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS course_faculty (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  faculty_name  VARCHAR(100) NOT NULL,
  department    VARCHAR(100),
  room          VARCHAR(20),
  email         VARCHAR(255)
);

-- ─── Student Profiles ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  phone         VARCHAR(20),
  department    VARCHAR(100),
  enrollment_year INT,
  roll_number   VARCHAR(30),
  semester      INT DEFAULT 1,
  program       VARCHAR(50) DEFAULT 'B.Tech',
  avatar_url    VARCHAR(255)
);

-- ─── Notifications ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  is_read       BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications (user_id, created_at DESC);

-- ─── Fee Items ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fee_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  item_name     VARCHAR(100) NOT NULL,
  amount        INT NOT NULL
);

-- ─── Fee Payments ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS fee_payments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id    VARCHAR(20) NOT NULL REFERENCES academic_sessions(session_id),
  total_amount  INT NOT NULL,
  paid_amount   INT NOT NULL DEFAULT 0,
  status        VARCHAR(20) NOT NULL DEFAULT 'Unpaid',  -- Paid, Unpaid, Partial
  UNIQUE(student_id, session_id)
);

-- ─── Documents / Downloads ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    VARCHAR(20) REFERENCES academic_sessions(session_id),
  name          VARCHAR(255) NOT NULL,
  file_url      VARCHAR(500),
  file_size     VARCHAR(20),
  uploaded_at   DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ─── Feedback Forms ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS feedback_forms (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id     UUID REFERENCES courses(id) ON DELETE CASCADE,
  faculty_name  VARCHAR(100),
  name          VARCHAR(255) NOT NULL,
  form_url      VARCHAR(500) DEFAULT '#',
  session_id    VARCHAR(20) REFERENCES academic_sessions(session_id)
);

-- ─── Clubs ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS clubs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          VARCHAR(100) NOT NULL,
  description   TEXT,
  member_count  INT NOT NULL DEFAULT 0
);

-- ─── Club Memberships ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS club_memberships (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id       UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_name   VARCHAR(100),
  role          VARCHAR(30) NOT NULL DEFAULT 'Member',
  UNIQUE(club_id, user_id)
);

-- ─── Club Events ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS club_events (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id       UUID NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  name          VARCHAR(255) NOT NULL,
  event_date    DATE,
  register_url  VARCHAR(500)
);

-- ─── Student Services (generic) ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_services (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_key   VARCHAR(50) NOT NULL,
  title         VARCHAR(100),
  subtitle      TEXT,
  session_label VARCHAR(100),
  stats         JSONB NOT NULL DEFAULT '[]',
  columns       JSONB NOT NULL DEFAULT '[]',
  rows          JSONB NOT NULL DEFAULT '[]',
  UNIQUE(student_id, service_key)
);

-- ─── Timetable ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS timetable_entries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id    VARCHAR(20) REFERENCES academic_sessions(session_id),
  day_of_week   INT NOT NULL DEFAULT 0,  -- 0=Mon, 1=Tue, ...
  time_slot     VARCHAR(20) NOT NULL,
  event_title   VARCHAR(255) NOT NULL,
  room          VARCHAR(100),
  is_custom     BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_timetable_student ON timetable_entries (student_id, session_id);
