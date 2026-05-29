-- =============================================================================
-- Student Dashboard Seed Data — COMPLETE for all 6 sessions
-- =============================================================================

-- ─── Academic Sessions ──────────────────────────────────────────────────────
INSERT INTO academic_sessions (session_id, label, is_current, sort_order) VALUES
  ('2025-26-II', 'Session 2025-26 II', true, 1),
  ('2025-26-I',  'Session 2025-26 I',  false, 2),
  ('2024-25-II', 'Session 2024-25 II', false, 3),
  ('2024-25-I',  'Session 2024-25 I',  false, 4),
  ('2023-24-II', 'Session 2023-24 II', false, 5),
  ('2023-24-I',  'Session 2023-24 I',  false, 6)
ON CONFLICT (session_id) DO NOTHING;

-- ─── Helper ─────────────────────────────────────────────────────────────────
CREATE TEMP TABLE IF NOT EXISTS _demo (user_id UUID);
DELETE FROM _demo;
INSERT INTO _demo SELECT id FROM users WHERE username = 'demo' LIMIT 1;

-- ─── Student Profile ────────────────────────────────────────────────────────
INSERT INTO student_profiles (user_id, phone, department, enrollment_year, roll_number, semester, program, avatar_url)
SELECT user_id, '+91 98765 43210', 'Computer Science & Engineering', 2022, 'CSE2022045', 6, 'B.Tech', '/Picture1.png'
FROM _demo
ON CONFLICT (user_id) DO UPDATE SET
  phone = EXCLUDED.phone, department = EXCLUDED.department,
  enrollment_year = EXCLUDED.enrollment_year, roll_number = EXCLUDED.roll_number,
  semester = EXCLUDED.semester;

-- ═════════════════════════════════════════════════════════════════════════════
-- COURSES — unique realistic courses for each semester
-- ═════════════════════════════════════════════════════════════════════════════

-- Sem 6 (current: 2025-26-II)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS301', 'Data Structures & Algorithms',  'Core',     4, 6, '2025-26-II', 100),
  ('CS302', 'Operating Systems',             'Core',     4, 6, '2025-26-II', 100),
  ('CS303', 'Computer Networks',             'Core',     4, 6, '2025-26-II', 100),
  ('MA204', 'Probability & Statistics',      'Core',     4, 6, '2025-26-II', 100),
  ('HS201', 'Technical Communication',       'Core',     3, 6, '2025-26-II', 100),
  ('CS304', 'Machine Learning Basics',       'Elective', 3, 6, '2025-26-II', 100)
ON CONFLICT DO NOTHING;

-- Sem 5 (2025-26-I)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS251', 'Design & Analysis of Algorithms', 'Core',     4, 5, '2025-26-I', 100),
  ('CS252', 'Database Management Systems',     'Core',     4, 5, '2025-26-I', 100),
  ('CS253', 'Computer Organization',           'Core',     4, 5, '2025-26-I', 100),
  ('CS254', 'Software Engineering',            'Core',     3, 5, '2025-26-I', 100),
  ('MA203', 'Linear Algebra',                  'Core',     4, 5, '2025-26-I', 100),
  ('HS202', 'Economics for Engineers',         'Elective', 3, 5, '2025-26-I', 100)
ON CONFLICT DO NOTHING;

-- Sem 4 (2024-25-II)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS201', 'Object Oriented Programming',   'Core',     4, 4, '2024-25-II', 100),
  ('CS202', 'Digital Logic Design',          'Core',     4, 4, '2024-25-II', 100),
  ('CS203', 'Discrete Mathematics',          'Core',     3, 4, '2024-25-II', 100),
  ('MA202', 'Differential Equations',        'Core',     4, 4, '2024-25-II', 100),
  ('PH201', 'Semiconductor Physics',         'Core',     3, 4, '2024-25-II', 100),
  ('HS203', 'Professional Ethics',           'Elective', 3, 4, '2024-25-II', 100)
ON CONFLICT DO NOTHING;

-- Sem 3 (2024-25-I)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS151', 'Data Structures',               'Core',     4, 3, '2024-25-I', 100),
  ('CS152', 'Computer Architecture',         'Core',     4, 3, '2024-25-I', 100),
  ('MA201', 'Numerical Methods',             'Core',     4, 3, '2024-25-I', 100),
  ('EE201', 'Signals & Systems',             'Core',     4, 3, '2024-25-I', 100),
  ('PH101', 'Classical Physics',             'Core',     4, 3, '2024-25-I', 100)
ON CONFLICT DO NOTHING;

-- Sem 2 (2023-24-II)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS102', 'Programming in C++',            'Core',     4, 2, '2023-24-II', 100),
  ('MA102', 'Calculus II',                   'Core',     4, 2, '2023-24-II', 100),
  ('PH102', 'Modern Physics',               'Core',     4, 2, '2023-24-II', 100),
  ('EE101', 'Basic Electronics',            'Core',     4, 2, '2023-24-II', 100),
  ('HS101', 'English Communication',        'Core',     3, 2, '2023-24-II', 100),
  ('ME101', 'Engineering Graphics',         'Core',     3, 2, '2023-24-II', 100)
ON CONFLICT DO NOTHING;

-- Sem 1 (2023-24-I)
INSERT INTO courses (code, name, course_type, credits, semester, session_id, total_weightage) VALUES
  ('CS101', 'Introduction to Programming',   'Core',     4, 1, '2023-24-I', 100),
  ('MA101', 'Calculus I',                    'Core',     4, 1, '2023-24-I', 100),
  ('PH100', 'Engineering Physics',           'Core',     4, 1, '2023-24-I', 100),
  ('CH101', 'Engineering Chemistry',         'Core',     4, 1, '2023-24-I', 100),
  ('HS100', 'Communication Skills',          'Core',     3, 1, '2023-24-I', 100),
  ('WS101', 'Workshop Practice',             'Core',     2, 1, '2023-24-I', 100)
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- ENROLLMENTS — enroll demo user in all courses
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO enrollments (student_id, course_id, session_id)
SELECT d.user_id, c.id, c.session_id
FROM _demo d, courses c
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- EVALUATIONS + SCORES — for ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════

-- Helper function: insert evaluations for all courses in a session
-- Sem 6 (2025-26-II) — detailed evaluations
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2025-26-II'
ON CONFLICT DO NOTHING;

-- Sem 5 (2025-26-I)
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2025-26-I'
ON CONFLICT DO NOTHING;

-- Sem 4 (2024-25-II)
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2024-25-II'
ON CONFLICT DO NOTHING;

-- Sem 3 (2024-25-I)
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2024-25-I'
ON CONFLICT DO NOTHING;

-- Sem 2 (2023-24-II)
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2023-24-II'
ON CONFLICT DO NOTHING;

-- Sem 1 (2023-24-I)
INSERT INTO evaluations (course_id, name, max_score, weightage)
SELECT c.id, e.name, e.max_score, e.weightage
FROM courses c
CROSS JOIN (VALUES ('Quiz 1',10,10),('Midsem',30,30),('Assignment',20,20),('Endsem',40,40)) AS e(name,max_score,weightage)
WHERE c.session_id = '2023-24-I'
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- STUDENT SCORES — varying scores per session
-- ═════════════════════════════════════════════════════════════════════════════
-- Randomized but consistent scores for all courses in all sessions
INSERT INTO student_scores (enrollment_id, evaluation_id, score, class_average)
SELECT en.id, ev.id,
  CASE ev.name
    WHEN 'Quiz 1'    THEN 6 + (abs(hashtext(c.code || c.session_id || 'q')) % 4)
    WHEN 'Midsem'    THEN 20 + (abs(hashtext(c.code || c.session_id || 'm')) % 10)
    WHEN 'Assignment' THEN 13 + (abs(hashtext(c.code || c.session_id || 'a')) % 7)
    WHEN 'Endsem'    THEN 25 + (abs(hashtext(c.code || c.session_id || 'e')) % 15)
  END,
  CASE ev.name
    WHEN 'Quiz 1'    THEN 5 + (abs(hashtext(c.code || c.session_id || 'cq')) % 4)
    WHEN 'Midsem'    THEN 18 + (abs(hashtext(c.code || c.session_id || 'cm')) % 8)
    WHEN 'Assignment' THEN 11 + (abs(hashtext(c.code || c.session_id || 'ca')) % 6)
    WHEN 'Endsem'    THEN 22 + (abs(hashtext(c.code || c.session_id || 'ce')) % 12)
  END
FROM enrollments en
JOIN courses c ON en.course_id = c.id
JOIN evaluations ev ON ev.course_id = c.id
JOIN _demo d ON en.student_id = d.user_id
ON CONFLICT (enrollment_id, evaluation_id) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- SEMESTER GRADES — all sessions get grades (past semesters)
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO semester_grades (student_id, course_id, session_id, grade, total_score, class_avg)
SELECT d.user_id, c.id, c.session_id,
  (ARRAY['A','AB','B','BC','A','B'])[1 + (abs(hashtext(c.code || c.session_id)) % 6)],
  55 + (abs(hashtext(c.code || c.session_id || 'ts')) % 30),
  48 + (abs(hashtext(c.code || c.session_id || 'ca')) % 20)
FROM _demo d
JOIN courses c ON true
WHERE c.session_id != '2025-26-II'
ON CONFLICT (student_id, course_id, session_id) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- SEMESTER PERFORMANCE (SGPA) — all 6 semesters
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO semester_performance (student_id, session_id, label, short_label, credits, sgpa)
SELECT d.user_id, p.session_id, p.label, p.short_label, p.credits, p.sgpa
FROM _demo d
CROSS JOIN (VALUES
  ('2023-24-I',  'Sem 1 (2023-24 I)',  'Sem 1', 21, 8.12),
  ('2023-24-II', 'Sem 2 (2023-24 II)', 'Sem 2', 22, 8.35),
  ('2024-25-I',  'Sem 3 (2024-25 I)',  'Sem 3', 20, 8.18),
  ('2024-25-II', 'Sem 4 (2024-25 II)', 'Sem 4', 21, 8.63),
  ('2025-26-I',  'Sem 5 (2025-26 I)',  'Sem 5', 22, 8.45),
  ('2025-26-II', 'Sem 6 (2025-26 II)', 'Sem 6', 20, 8.71)
) AS p(session_id, label, short_label, credits, sgpa)
ON CONFLICT (student_id, session_id) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- SYLLABUS UNITS — for ALL courses in ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO syllabus_units (course_id, unit_number, sub_unit)
SELECT c.id, u.unit_number, u.sub_unit
FROM courses c
CROSS JOIN (VALUES
  (1, '1.1'), (1, '1.2'), (1, '1.3'),
  (2, '2.1'), (2, '2.2'),
  (3, '3.1'), (3, '3.2'),
  (4, '4.1')
) AS u(unit_number, sub_unit)
ON CONFLICT (course_id, unit_number, sub_unit) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- ATTENDANCE RECORDS — for ALL courses in ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
-- Generate 20 attendance records per enrollment with varying present/absent
INSERT INTO attendance_records (enrollment_id, record_date, status, time_slot)
SELECT en.id,
  CASE c.session_id
    WHEN '2025-26-II' THEN '2026-04-01'::date + i
    WHEN '2025-26-I'  THEN '2025-10-01'::date + i
    WHEN '2024-25-II' THEN '2025-04-01'::date + i
    WHEN '2024-25-I'  THEN '2024-10-01'::date + i
    WHEN '2023-24-II' THEN '2024-04-01'::date + i
    WHEN '2023-24-I'  THEN '2023-10-01'::date + i
  END,
  CASE WHEN (abs(hashtext(c.code || i::text)) % 10) < 2 THEN 0 ELSE 1 END,
  '09:00 AM'
FROM enrollments en
JOIN courses c ON en.course_id = c.id
JOIN _demo d ON en.student_id = d.user_id
CROSS JOIN generate_series(0, 19) AS i
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- COURSE FACULTY — for ALL courses in ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO course_faculty (course_id, faculty_name, department, room, email)
SELECT c.id,
  (ARRAY['Dr. Rajesh Kumar','Dr. Priya Sharma','Dr. Amit Verma','Dr. Neha Gupta','Dr. Sanjay Patel','Dr. Kavita Rao'])[1 + (abs(hashtext(c.code || c.session_id || '1')) % 6)],
  'CSE',
  (100 + (abs(hashtext(c.code || c.session_id)) % 50))::text,
  lower(replace(
    (ARRAY['Dr. Rajesh Kumar','Dr. Priya Sharma','Dr. Amit Verma','Dr. Neha Gupta','Dr. Sanjay Patel','Dr. Kavita Rao'])[1 + (abs(hashtext(c.code || c.session_id || '1')) % 6)],
    ' ', '.')) || '@lnmiit.ac.in'
FROM courses c
ON CONFLICT DO NOTHING;

-- Add a second faculty for some courses
INSERT INTO course_faculty (course_id, faculty_name, department, room, email)
SELECT c.id,
  (ARRAY['Dr. Kavita Rao','Dr. Sanjay Patel','Dr. Neha Gupta','Dr. Rajesh Kumar','Dr. Priya Sharma','Dr. Amit Verma'])[1 + (abs(hashtext(c.code || c.session_id || '2')) % 6)],
  'CSE',
  (200 + (abs(hashtext(c.code || c.session_id || 'r2')) % 50))::text,
  lower(replace(
    (ARRAY['Dr. Kavita Rao','Dr. Sanjay Patel','Dr. Neha Gupta','Dr. Rajesh Kumar','Dr. Priya Sharma','Dr. Amit Verma'])[1 + (abs(hashtext(c.code || c.session_id || '2')) % 6)],
    ' ', '.')) || '@lnmiit.ac.in'
FROM courses c
WHERE abs(hashtext(c.code)) % 2 = 0
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- TIMETABLE ENTRIES — for ALL sessions (Mon-Fri)
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO timetable_entries (student_id, session_id, day_of_week, time_slot, event_title, room, is_custom)
SELECT d.user_id, s.sid, t.dow, t.time_slot, t.title, t.room, false
FROM _demo d
CROSS JOIN (VALUES ('2025-26-II'),('2025-26-I'),('2024-25-II'),('2024-25-I'),('2023-24-II'),('2023-24-I')) AS s(sid)
CROSS JOIN (VALUES
  (0, '9:00 AM',  'Lecture I',   'Room 201'),
  (0, '10:30 AM', 'Lab Session', 'Lab 3'),
  (0, '12:00 PM', 'Lunch Break', ''),
  (0, '1:30 PM',  'Lecture II',  'Room 305'),
  (0, '3:00 PM',  'Tutorial',    'Room 102'),
  (1, '9:00 AM',  'Lecture I',   'Room 102'),
  (1, '10:30 AM', 'Lecture II',  'Room 204'),
  (1, '12:00 PM', 'Lunch Break', ''),
  (1, '1:30 PM',  'Lab Session', 'Lab 5'),
  (1, '3:00 PM',  'Lecture III', 'Room 301'),
  (2, '9:00 AM',  'Lecture I',   'Room 201'),
  (2, '10:30 AM', 'Tutorial',    'Room 305'),
  (2, '12:00 PM', 'Lunch Break', ''),
  (2, '1:30 PM',  'Lab Session', 'Lab 2'),
  (3, '9:00 AM',  'Lecture I',   'Room 305'),
  (3, '10:30 AM', 'Lecture II',  'Room 204'),
  (3, '12:00 PM', 'Lunch Break', ''),
  (3, '1:30 PM',  'Lecture III', 'Room 401'),
  (4, '9:00 AM',  'Lecture I',   'Room 201'),
  (4, '10:30 AM', 'Lecture II',  'Room 102'),
  (4, '12:00 PM', 'Lunch Break', ''),
  (4, '1:30 PM',  'Lecture III', 'Room 301'),
  (4, '3:00 PM',  'Club Activities', 'Student Center')
) AS t(dow, time_slot, title, room)
ON CONFLICT DO NOTHING;

-- Update timetable titles to use actual course names for current session
UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'Data Structures Lecture'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'Operating Systems Lab'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Algorithm Design'
    WHEN te.day_of_week = 0 AND te.time_slot = '3:00 PM'  THEN 'Project Discussion'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Computer Networks'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'Probability & Statistics'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'ML Basics Lab'
    WHEN te.day_of_week = 1 AND te.time_slot = '3:00 PM'  THEN 'Technical Communication'
    WHEN te.day_of_week = 2 AND te.time_slot = '9:00 AM'  THEN 'Data Structures Lecture'
    WHEN te.day_of_week = 2 AND te.time_slot = '10:30 AM' THEN 'OS Tutorial'
    WHEN te.day_of_week = 2 AND te.time_slot = '1:30 PM'  THEN 'Computer Networks Lab'
    WHEN te.day_of_week = 3 AND te.time_slot = '9:00 AM'  THEN 'Algorithm Design'
    WHEN te.day_of_week = 3 AND te.time_slot = '10:30 AM' THEN 'Probability & Statistics'
    WHEN te.day_of_week = 3 AND te.time_slot = '1:30 PM'  THEN 'ML Basics'
    WHEN te.day_of_week = 4 AND te.time_slot = '9:00 AM'  THEN 'Data Structures Lecture'
    WHEN te.day_of_week = 4 AND te.time_slot = '10:30 AM' THEN 'Operating Systems'
    WHEN te.day_of_week = 4 AND te.time_slot = '1:30 PM'  THEN 'Technical Communication'
    ELSE te.event_title
  END
WHERE te.session_id = '2025-26-II' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'DAA Lecture'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'DBMS Lab'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Computer Org'
    WHEN te.day_of_week = 0 AND te.time_slot = '3:00 PM'  THEN 'SE Tutorial'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Linear Algebra'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'Software Engineering'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'DBMS Lab'
    WHEN te.day_of_week = 1 AND te.time_slot = '3:00 PM'  THEN 'Economics'
    ELSE te.event_title
  END
WHERE te.session_id = '2025-26-I' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'OOP Lecture'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'DLD Lab'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Diff Equations'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Discrete Math'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'Semiconductor Physics'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'OOP Lab'
    WHEN te.day_of_week = 1 AND te.time_slot = '3:00 PM'  THEN 'Professional Ethics'
    ELSE te.event_title
  END
WHERE te.session_id = '2024-25-II' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'Data Structures'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'Comp Architecture Lab'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Numerical Methods'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Signals & Systems'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'Classical Physics'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'DS Lab'
    ELSE te.event_title
  END
WHERE te.session_id = '2024-25-I' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'C++ Programming'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'Calculus II'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Modern Physics'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Basic Electronics'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'English Communication'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'C++ Lab'
    WHEN te.day_of_week = 1 AND te.time_slot = '3:00 PM'  THEN 'Engg Graphics'
    ELSE te.event_title
  END
WHERE te.session_id = '2023-24-II' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

UPDATE timetable_entries te SET event_title =
  CASE
    WHEN te.day_of_week = 0 AND te.time_slot = '9:00 AM'  THEN 'Intro to Programming'
    WHEN te.day_of_week = 0 AND te.time_slot = '10:30 AM' THEN 'Calculus I'
    WHEN te.day_of_week = 0 AND te.time_slot = '1:30 PM'  THEN 'Engg Physics'
    WHEN te.day_of_week = 1 AND te.time_slot = '9:00 AM'  THEN 'Engg Chemistry'
    WHEN te.day_of_week = 1 AND te.time_slot = '10:30 AM' THEN 'Comm Skills'
    WHEN te.day_of_week = 1 AND te.time_slot = '1:30 PM'  THEN 'Programming Lab'
    WHEN te.day_of_week = 1 AND te.time_slot = '3:00 PM'  THEN 'Workshop Practice'
    ELSE te.event_title
  END
WHERE te.session_id = '2023-24-I' AND te.event_title NOT IN ('Lunch Break', 'Club Activities');

-- ═════════════════════════════════════════════════════════════════════════════
-- FEE ITEMS + PAYMENTS — for ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO fee_items (session_id, item_name, amount) VALUES
  ('2025-26-II', 'Tuition Fee', 150000), ('2025-26-II', 'Development Fee', 25000),
  ('2025-26-II', 'Lab Charges', 15000),  ('2025-26-II', 'Library & Internet', 10000),
  ('2025-26-I',  'Tuition Fee', 145000), ('2025-26-I',  'Development Fee', 25000),
  ('2025-26-I',  'Lab Charges', 15000),  ('2025-26-I',  'Library & Internet', 10000),
  ('2024-25-II', 'Tuition Fee', 140000), ('2024-25-II', 'Development Fee', 22000),
  ('2024-25-II', 'Lab Charges', 12000),  ('2024-25-II', 'Library & Internet', 8000),
  ('2024-25-I',  'Tuition Fee', 140000), ('2024-25-I',  'Development Fee', 22000),
  ('2024-25-I',  'Lab Charges', 12000),  ('2024-25-I',  'Library & Internet', 8000),
  ('2023-24-II', 'Tuition Fee', 130000), ('2023-24-II', 'Development Fee', 20000),
  ('2023-24-II', 'Lab Charges', 10000),  ('2023-24-II', 'Library & Internet', 8000),
  ('2023-24-I',  'Tuition Fee', 130000), ('2023-24-I',  'Development Fee', 20000),
  ('2023-24-I',  'Lab Charges', 10000),  ('2023-24-I',  'Library & Internet', 8000)
ON CONFLICT DO NOTHING;

INSERT INTO fee_payments (student_id, session_id, total_amount, paid_amount, status)
SELECT d.user_id, p.sid, p.total, p.paid, p.status
FROM _demo d
CROSS JOIN (VALUES
  ('2025-26-II', 200000, 200000, 'Paid'),
  ('2025-26-I',  195000, 195000, 'Paid'),
  ('2024-25-II', 182000, 182000, 'Paid'),
  ('2024-25-I',  182000, 182000, 'Paid'),
  ('2023-24-II', 168000, 168000, 'Paid'),
  ('2023-24-I',  168000, 100000, 'Partial')
) AS p(sid, total, paid, status)
ON CONFLICT (student_id, session_id) DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- DOCUMENTS / DOWNLOADS — for ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO documents (session_id, name, file_url, file_size, uploaded_at) VALUES
  ('2025-26-II', 'Semester 6 Syllabus.pdf',       '#', '2.4 MB', '2026-04-15'),
  ('2025-26-II', 'Assignment Guidelines.docx',      '#', '540 KB', '2026-04-12'),
  ('2025-26-II', 'Lab Manual - DSA.pdf',            '#', '5.1 MB', '2026-04-08'),
  ('2025-26-I',  'Semester 5 Syllabus.pdf',        '#', '2.2 MB', '2025-10-10'),
  ('2025-26-I',  'DAA Problem Set.pdf',             '#', '1.8 MB', '2025-10-15'),
  ('2025-26-I',  'DBMS Lab Manual.pdf',             '#', '4.3 MB', '2025-10-05'),
  ('2024-25-II', 'Semester 4 Syllabus.pdf',        '#', '2.0 MB', '2025-04-08'),
  ('2024-25-II', 'OOP Reference Guide.pdf',         '#', '3.2 MB', '2025-04-12'),
  ('2024-25-I',  'Semester 3 Syllabus.pdf',        '#', '1.9 MB', '2024-10-10'),
  ('2024-25-I',  'Data Structures Notes.pdf',       '#', '4.7 MB', '2024-10-15'),
  ('2023-24-II', 'Semester 2 Syllabus.pdf',        '#', '1.8 MB', '2024-04-05'),
  ('2023-24-II', 'C++ Practice Problems.pdf',       '#', '2.1 MB', '2024-04-10'),
  ('2023-24-I',  'Semester 1 Orientation Guide.pdf','#', '1.5 MB', '2023-10-05'),
  ('2023-24-I',  'Chemistry Lab Manual.pdf',        '#', '3.0 MB', '2023-10-12')
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- FEEDBACK FORMS — for ALL sessions
-- ═════════════════════════════════════════════════════════════════════════════
-- Sem 6
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Rajesh Kumar', 'Midsem Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2025-26-II' AND c.code IN ('CS301','CS302')
ON CONFLICT DO NOTHING;
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Amit Verma', 'Lab Evaluation - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2025-26-II' AND c.code = 'CS303'
ON CONFLICT DO NOTHING;

-- Sem 5
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Neha Gupta', 'Midsem Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2025-26-I' AND c.code IN ('CS251','CS252')
ON CONFLICT DO NOTHING;

-- Sem 4
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Sanjay Patel', 'Endsem Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2024-25-II' AND c.code IN ('CS201','CS202')
ON CONFLICT DO NOTHING;

-- Sem 3
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Kavita Rao', 'Course Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2024-25-I' AND c.code IN ('CS151','CS152')
ON CONFLICT DO NOTHING;

-- Sem 2
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Priya Sharma', 'Faculty Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2023-24-II' AND c.code IN ('CS102','MA102')
ON CONFLICT DO NOTHING;

-- Sem 1
INSERT INTO feedback_forms (course_id, faculty_name, name, form_url, session_id)
SELECT c.id, 'Dr. Rajesh Kumar', 'Teaching Feedback - ' || c.name, '#', c.session_id
FROM courses c WHERE c.session_id = '2023-24-I' AND c.code IN ('CS101','MA101')
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- NOTIFICATIONS
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO notifications (user_id, title, description, is_read, created_at)
SELECT d.user_id, n.title, n.description, n.is_read, NOW() - n.age
FROM _demo d
CROSS JOIN (VALUES
  ('Quiz 1 - DSA', 'Scheduled for Oct 25 at 10:00 AM', false, INTERVAL '2 hours'),
  ('New Assignment - OS Lab', 'Submission deadline: Oct 28', false, INTERVAL '5 hours'),
  ('Attendance Warning', 'Your attendance in Networks is 75%', true, INTERVAL '1 day'),
  ('New Upload - DSA Notes', 'Chapter 5: Dynamic Programming uploaded', true, INTERVAL '2 days'),
  ('Admin Circular', 'Winter break schedule has been announced', true, INTERVAL '3 days')
) AS n(title, description, is_read, age);

-- ═════════════════════════════════════════════════════════════════════════════
-- CLUBS + MEMBERSHIPS + EVENTS
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO clubs (name, description, member_count) VALUES
  ('Coding Club', 'A community of passionate programmers building cool projects together.', 45),
  ('Photography Club', 'Capturing campus life through the lens.', 32),
  ('Robotics Club', 'Building and programming robots for competitions.', 28)
ON CONFLICT DO NOTHING;

INSERT INTO club_memberships (club_id, user_id, member_name, role)
SELECT c.id, d.user_id, 'Demo User',
  CASE c.name WHEN 'Photography Club' THEN 'Coordinator' ELSE 'Member' END
FROM _demo d, clubs c
ON CONFLICT (club_id, user_id) DO NOTHING;

INSERT INTO club_memberships (club_id, user_id, member_name, role)
SELECT c.id, d.user_id, m.name, m.role
FROM clubs c CROSS JOIN _demo d
CROSS JOIN (VALUES ('Alice M.','Coordinator'),('Bob K.','Member'),('Charlie N.','Member')) AS m(name, role)
WHERE c.name = 'Coding Club'
ON CONFLICT (club_id, user_id) DO NOTHING;

INSERT INTO club_events (club_id, name, event_date, register_url)
SELECT c.id, e.name, e.edate::date, '#'
FROM clubs c
CROSS JOIN (VALUES
  ('Coding Club', 'Hackathon 2026', '2026-11-20'),
  ('Coding Club', 'Code Sprint', '2026-09-15'),
  ('Photography Club', 'Photo Walk', '2026-10-05'),
  ('Robotics Club', 'Robo Wars', '2026-12-10')
) AS e(cname, name, edate)
WHERE c.name = e.cname
ON CONFLICT DO NOTHING;

-- ═════════════════════════════════════════════════════════════════════════════
-- STUDENT SERVICES (JSON-based configs)
-- ═════════════════════════════════════════════════════════════════════════════
INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'btp', 'BTP', 'Track your BTP milestones, guide comments, and review readiness.', 'Session 2025-26',
  '[{"label":"Milestones","value":"4","note":"In current cycle"},{"label":"Guide","value":"Dr. V. Sharma","note":"Computer Science"},{"label":"Progress","value":"78%","note":"As of this week"}]'::jsonb,
  '[{"label":"Milestone","key":"milestone"},{"label":"Due Date","key":"dueDate"},{"label":"Owner","key":"owner"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"milestone":"Topic Approval","dueDate":"12 Jan 2026","owner":"Guide","status":"Approved"},{"milestone":"Synopsis Submission","dueDate":"05 Feb 2026","owner":"Student","status":"Submitted"},{"milestone":"Mid Review","dueDate":"24 Mar 2026","owner":"Panel","status":"Pending"},{"milestone":"Final Viva Slot","dueDate":"20 Apr 2026","owner":"Department","status":"Pending"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'miniProject', 'Mini Project', 'Monitor your mini-project workplan and evaluation checkpoints.', 'Session 2025-26',
  '[{"label":"Team Size","value":"3","note":"Members allocated"},{"label":"Sprints","value":"5","note":"Planned total"},{"label":"Current Sprint","value":"3","note":"Implementation phase"}]'::jsonb,
  '[{"label":"Task","key":"task"},{"label":"Start Date","key":"startDate"},{"label":"Lead","key":"lead"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"task":"Problem Statement Freeze","startDate":"08 Jan 2026","lead":"Team","status":"Approved"},{"task":"Prototype Delivery","startDate":"21 Jan 2026","lead":"Team","status":"Submitted"},{"task":"Testing Report","startDate":"10 Feb 2026","lead":"QA Lead","status":"Pending"},{"task":"Demo Review","startDate":"02 Mar 2026","lead":"Mentor","status":"Pending"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'extraCurriculum', 'Extra Curriculum', 'Your activities, club participation, and approved contribution hours.', 'Academic Year 2025-26',
  '[{"label":"Activities","value":"6","note":"Registered this year"},{"label":"Hours","value":"48","note":"Approved hours"},{"label":"Badges","value":"4","note":"Skill badges earned"}]'::jsonb,
  '[{"label":"Activity","key":"activity"},{"label":"Role","key":"role"},{"label":"Hours","key":"hours"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"activity":"Coding Club Hack Sprint","role":"Participant","hours":"12","status":"Approved"},{"activity":"Sports Meet Volunteer","role":"Coordinator","hours":"10","status":"Approved"},{"activity":"Drama Society Rehearsal","role":"Performer","hours":"8","status":"Submitted"},{"activity":"NSS Clean Campus Drive","role":"Volunteer","hours":"18","status":"Pending"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'studentHistory', 'Student History', 'Course list with session, grades, credits, and course type.', 'Historical Snapshot',
  '[{"label":"Completed Semesters","value":"5","note":"Up to current record"},{"label":"Credits Earned","value":"106","note":"Total earned credits"},{"label":"CGPA","value":"8.40","note":"Cumulative performance"}]'::jsonb,
  '[{"label":"Sr. No.","key":"srNo"},{"label":"Session","key":"session"},{"label":"Course Name","key":"courseName"},{"label":"Grade - Credits","key":"gradeCredits"},{"label":"Course Type","key":"courseType"}]'::jsonb,
  '[{"srNo":"1","session":"2023-24 I","courseName":"INTRODUCTION TO PROGRAMMING","gradeCredits":"A- 4.00","courseType":"CORE"},{"srNo":"2","session":"2023-24 I","courseName":"CALCULUS I","gradeCredits":"B- 4.00","courseType":"CORE"},{"srNo":"3","session":"2023-24 II","courseName":"PROGRAMMING IN C++","gradeCredits":"AB- 4.00","courseType":"CORE"},{"srNo":"4","session":"2023-24 II","courseName":"MODERN PHYSICS","gradeCredits":"B- 4.00","courseType":"CORE"},{"srNo":"5","session":"2024-25 I","courseName":"DATA STRUCTURES","gradeCredits":"A- 4.00","courseType":"CORE"},{"srNo":"6","session":"2024-25 I","courseName":"SIGNALS & SYSTEMS","gradeCredits":"B- 4.00","courseType":"CORE"},{"srNo":"7","session":"2024-25 II","courseName":"OBJECT ORIENTED PROGRAMMING","gradeCredits":"A- 4.00","courseType":"CORE"},{"srNo":"8","session":"2024-25 II","courseName":"DIGITAL LOGIC DESIGN","gradeCredits":"B- 4.00","courseType":"CORE"},{"srNo":"9","session":"2025-26 I","courseName":"DESIGN & ANALYSIS OF ALGORITHMS","gradeCredits":"AB- 4.00","courseType":"CORE"},{"srNo":"10","session":"2025-26 I","courseName":"DATABASE MANAGEMENT SYSTEMS","gradeCredits":"A- 4.00","courseType":"CORE"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'feeReceipt', 'Fee Receipt', 'Receipts generated for all processed semester fee payments.', 'Session 2025-26',
  '[{"label":"Receipts","value":"6","note":"Available to download"},{"label":"Paid Amount","value":"INR 10,95,000","note":"Across all semesters"},{"label":"Last Receipt","value":"14 Mar 2026","note":"Most recent payment"}]'::jsonb,
  '[{"label":"Receipt No","key":"receiptNo"},{"label":"Semester","key":"semester"},{"label":"Amount","key":"amount"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"receiptNo":"RCPT-2324-0101","semester":"Sem 1","amount":"INR 1,68,000","status":"Downloaded"},{"receiptNo":"RCPT-2324-0201","semester":"Sem 2","amount":"INR 1,68,000","status":"Downloaded"},{"receiptNo":"RCPT-2425-0101","semester":"Sem 3","amount":"INR 1,82,000","status":"Downloaded"},{"receiptNo":"RCPT-2425-0201","semester":"Sem 4","amount":"INR 1,82,000","status":"Released"},{"receiptNo":"RCPT-2526-0101","semester":"Sem 5","amount":"INR 1,95,000","status":"Released"},{"receiptNo":"RCPT-2526-0201","semester":"Sem 6","amount":"INR 2,00,000","status":"Released"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'attendanceDateWise', 'Attendance Date Wise', 'Date-level attendance log with slot and course-level marking.', 'Current Month',
  '[{"label":"Classes Marked","value":"26","note":"In selected month"},{"label":"Present","value":"22","note":"Attendance recorded"},{"label":"Average","value":"84.6%","note":"Date-wise attendance"}]'::jsonb,
  '[{"label":"Date","key":"date"},{"label":"Course","key":"course"},{"label":"Time Slot","key":"slot"},{"label":"Attendance","key":"attendance"}]'::jsonb,
  '[{"date":"02 Apr 2026","course":"CS301","slot":"09:00 - 09:50","attendance":"Present"},{"date":"03 Apr 2026","course":"CS302","slot":"11:00 - 11:50","attendance":"Late"},{"date":"04 Apr 2026","course":"HS201","slot":"14:00 - 14:50","attendance":"Present"},{"date":"05 Apr 2026","course":"MA204","slot":"10:00 - 10:50","attendance":"Absent"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'admitCard', 'Admit Card', 'Exam hall ticket issue status and center assignment details.', 'End Semester Exams 2025-26 II',
  '[{"label":"Exams Listed","value":"5","note":"As per timetable"},{"label":"Venue","value":"Block C","note":"Primary exam center"},{"label":"Card Status","value":"Released","note":"Ready to download"}]'::jsonb,
  '[{"label":"Exam","key":"exam"},{"label":"Date","key":"date"},{"label":"Venue","key":"venue"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"exam":"CS301 Endsem","date":"28 Apr 2026","venue":"C-201","status":"Released"},{"exam":"MA204 Endsem","date":"30 Apr 2026","venue":"C-204","status":"Released"},{"exam":"HS201 Endsem","date":"02 May 2026","venue":"C-206","status":"Released"},{"exam":"CS302 Endsem","date":"05 May 2026","venue":"C-208","status":"Released"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'disciplinaryAction', 'Disciplinary Action', 'Disciplinary records, closure status, and compliance notes.', 'Conduct Record',
  '[{"label":"Open Cases","value":"0","note":"No active disciplinary case"},{"label":"Closed Cases","value":"1","note":"Resolved in prior semester"},{"label":"Current Standing","value":"Clear","note":"No restrictions"}]'::jsonb,
  '[{"label":"Case ID","key":"caseId"},{"label":"Category","key":"category"},{"label":"Reported On","key":"reportedOn"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"caseId":"DISC-2025-010","category":"Library Delay Fine Appeal","reportedOn":"16 Nov 2025","status":"Closed"},{"caseId":"DISC-2025-022","category":"Lab Conduct Advisory","reportedOn":"05 Dec 2025","status":"Closed"},{"caseId":"DISC-2026-004","category":"Attendance Clarification","reportedOn":"12 Jan 2026","status":"Approved"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'dropCourse', 'Drop Course', 'Drop request tracker with advisor review and approval outcomes.', 'Session 2025-26 II',
  '[{"label":"Requests","value":"2","note":"Filed this semester"},{"label":"Approved","value":"1","note":"Processed by advisor"},{"label":"Pending","value":"1","note":"Awaiting committee review"}]'::jsonb,
  '[{"label":"Course","key":"course"},{"label":"Reason","key":"reason"},{"label":"Requested On","key":"requestedOn"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"course":"EE205 Signals","reason":"Credit load optimization","requestedOn":"08 Feb 2026","status":"Approved"},{"course":"HS231 Open Elective","reason":"Timetable clash","requestedOn":"19 Mar 2026","status":"Pending"},{"course":"CS325 Project Lab","reason":"Course replacement planned","requestedOn":"21 Mar 2026","status":"Submitted"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'bankDetailsSubmission', 'Bank Details Submission', 'Refund and scholarship bank details submission and verification.', 'Finance Verification',
  '[{"label":"Accounts Added","value":"1","note":"Primary account on file"},{"label":"Verification","value":"Completed","note":"KYC successfully matched"},{"label":"Last Update","value":"06 Apr 2026","note":"Most recent submission"}]'::jsonb,
  '[{"label":"Bank","key":"bank"},{"label":"Account Ending","key":"accountEnding"},{"label":"IFSC","key":"ifsc"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"bank":"State Bank of India","accountEnding":"...4821","ifsc":"SBIN000456","status":"Approved"},{"bank":"HDFC Bank","accountEnding":"...1037","ifsc":"HDFC000229","status":"Submitted"},{"bank":"ICICI Bank","accountEnding":"...7745","ifsc":"ICIC000811","status":"Rejected"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'studentCharges', 'Student Charges', 'Department and administration charges raised against your account.', 'Billing Cycle 2025-26',
  '[{"label":"Total Charges","value":"INR 5,800","note":"Raised this term"},{"label":"Paid","value":"INR 4,300","note":"Settled amount"},{"label":"Outstanding","value":"INR 1,500","note":"Due in 7 days"}]'::jsonb,
  '[{"label":"Charge Type","key":"chargeType"},{"label":"Amount","key":"amount"},{"label":"Raised On","key":"raisedOn"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"chargeType":"Library Late Fine","amount":"INR 800","raisedOn":"11 Mar 2026","status":"Paid"},{"chargeType":"Lab Consumables","amount":"INR 1,500","raisedOn":"23 Mar 2026","status":"Unpaid"},{"chargeType":"Hostel Repair Recovery","amount":"INR 2,000","raisedOn":"28 Mar 2026","status":"Paid"},{"chargeType":"Sports Registration","amount":"INR 1,500","raisedOn":"01 Apr 2026","status":"Waived"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

INSERT INTO student_services (student_id, service_key, title, subtitle, session_label, stats, columns, rows)
SELECT d.user_id, 'courseReplacement', 'Course Replacement', 'Requests to replace enrolled courses within allowed add/drop window.', 'Session 2025-26 II',
  '[{"label":"Requests","value":"3","note":"Replacement requests submitted"},{"label":"Processed","value":"2","note":"Action completed"},{"label":"Open","value":"1","note":"Pending department action"}]'::jsonb,
  '[{"label":"Drop Course","key":"dropCourse"},{"label":"Add Course","key":"addCourse"},{"label":"Requested On","key":"requestedOn"},{"label":"Status","key":"status"}]'::jsonb,
  '[{"dropCourse":"EE205 Signals","addCourse":"CS341 ML Basics","requestedOn":"16 Mar 2026","status":"Approved"},{"dropCourse":"HS231 Open Elective","addCourse":"HS239 Public Policy","requestedOn":"18 Mar 2026","status":"Submitted"},{"dropCourse":"CS325 Project Lab","addCourse":"CS327 Cloud Lab","requestedOn":"20 Mar 2026","status":"Pending"}]'::jsonb
FROM _demo d ON CONFLICT (student_id, service_key) DO NOTHING;

-- ─── Cleanup ────────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS _demo;
