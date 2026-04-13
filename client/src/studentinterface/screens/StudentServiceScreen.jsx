import React from "react";
import StudentLayout from "../StudentLayout";

const badgeClassByValue = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Submitted: "bg-blue-50 text-blue-700 border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  Closed: "bg-slate-100 text-slate-700 border-slate-200",
  Open: "bg-violet-50 text-violet-700 border-violet-200",
  Released: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Downloaded: "bg-blue-50 text-blue-700 border-blue-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
  Waived: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Present: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Absent: "bg-rose-50 text-rose-700 border-rose-200",
  Late: "bg-amber-50 text-amber-700 border-amber-200",
};

const serviceConfigs = {
  btp: {
    title: "BTP",
    subtitle:
      "Track your BTP milestones, guide comments, and review readiness.",
    session: "Session 2025-26",
    stats: [
      { label: "Milestones", value: "4", note: "In current cycle" },
      { label: "Guide", value: "Dr. V. Sharma", note: "Computer Science" },
      { label: "Progress", value: "78%", note: "As of this week" },
    ],
    columns: [
      { label: "Milestone", key: "milestone" },
      { label: "Due Date", key: "dueDate" },
      { label: "Owner", key: "owner" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        milestone: "Topic Approval",
        dueDate: "12 Jan 2026",
        owner: "Guide",
        status: "Approved",
      },
      {
        milestone: "Synopsis Submission",
        dueDate: "05 Feb 2026",
        owner: "Student",
        status: "Submitted",
      },
      {
        milestone: "Mid Review",
        dueDate: "24 Mar 2026",
        owner: "Panel",
        status: "Pending",
      },
      {
        milestone: "Final Viva Slot",
        dueDate: "20 Apr 2026",
        owner: "Department",
        status: "Pending",
      },
    ],
  },
  miniProject: {
    title: "Mini Project",
    subtitle: "Monitor your mini-project workplan and evaluation checkpoints.",
    session: "Session 2025-26",
    stats: [
      { label: "Team Size", value: "3", note: "Members allocated" },
      { label: "Sprints", value: "5", note: "Planned total" },
      { label: "Current Sprint", value: "3", note: "Implementation phase" },
    ],
    columns: [
      { label: "Task", key: "task" },
      { label: "Start Date", key: "startDate" },
      { label: "Lead", key: "lead" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        task: "Problem Statement Freeze",
        startDate: "08 Jan 2026",
        lead: "Team",
        status: "Approved",
      },
      {
        task: "Prototype Delivery",
        startDate: "21 Jan 2026",
        lead: "Team",
        status: "Submitted",
      },
      {
        task: "Testing Report",
        startDate: "10 Feb 2026",
        lead: "QA Lead",
        status: "Pending",
      },
      {
        task: "Demo Review",
        startDate: "02 Mar 2026",
        lead: "Mentor",
        status: "Pending",
      },
    ],
  },
  extraCurriculum: {
    title: "Extra Curriculum",
    subtitle:
      "Your activities, club participation, and approved contribution hours.",
    session: "Academic Year 2025-26",
    stats: [
      { label: "Activities", value: "6", note: "Registered this year" },
      { label: "Hours", value: "48", note: "Approved hours" },
      { label: "Badges", value: "4", note: "Skill badges earned" },
    ],
    columns: [
      { label: "Activity", key: "activity" },
      { label: "Role", key: "role" },
      { label: "Hours", key: "hours" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        activity: "Coding Club Hack Sprint",
        role: "Participant",
        hours: "12",
        status: "Approved",
      },
      {
        activity: "Sports Meet Volunteer",
        role: "Coordinator",
        hours: "10",
        status: "Approved",
      },
      {
        activity: "Drama Society Rehearsal",
        role: "Performer",
        hours: "8",
        status: "Submitted",
      },
      {
        activity: "NSS Clean Campus Drive",
        role: "Volunteer",
        hours: "18",
        status: "Pending",
      },
    ],
  },
  studentHistory: {
    title: "Student History",
    subtitle: "Course list with session, grades, credits, and course type.",
    session: "Historical Snapshot",
    stats: [
      {
        label: "Completed Semesters",
        value: "4",
        note: "Up to current record",
      },
      { label: "Credits Earned", value: "84", note: "Total earned credits" },
      { label: "CGPA", value: "8.32", note: "Cumulative performance" },
    ],
    columns: [
      { label: "Sr. No.", key: "srNo" },
      { label: "Session", key: "session" },
      { label: "Course Name", key: "courseName" },
      { label: "Grade - Credits", key: "gradeCredits" },
      { label: "Course Type", key: "courseType" },
    ],
    rows: [
      {
        srNo: "1",
        session: "2024-2025 I",
        courseName: "BASIC ELECTRONICS",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "2",
        session: "2024-2025 I",
        courseName: "BASIC ELECTRONICS LAB",
        gradeCredits: "BC- 1.50",
        courseType: "CORE",
      },
      {
        srNo: "3",
        session: "2024-2025 I",
        courseName: "CALCULUS AND ORDINARY DIFFERENTIAL EQUATIONS",
        gradeCredits: "A- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "4",
        session: "2024-2025 I",
        courseName: "CLASSICAL PHYSICS",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "5",
        session: "2025-2026 I",
        courseName: "COMPUTER ORGANIZATION AND ARCHITECTURE",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "6",
        session: "2024-2025 II",
        courseName: "DATA STRUCTURES AND ALGORITHMS",
        gradeCredits: "A- 4.50",
        courseType: "CORE",
      },
      {
        srNo: "7",
        session: "2025-2026 I",
        courseName: "DATABASE MANAGEMENT SYSTEMS",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "8",
        session: "2025-2026 I",
        courseName: "DESIGN AND ANALYSIS OF ALGORITHMS",
        gradeCredits: "C- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "9",
        session: "2024-2025 II",
        courseName: "DIGITAL SYSTEMS",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "10",
        session: "2024-2025 II",
        courseName: "DISCRETE MATHEMATICS",
        gradeCredits: "B- 3.00",
        courseType: "CORE",
      },
      {
        srNo: "11",
        session: "2024-2025 II",
        courseName: "ENVIRONMENTAL SCIENCE",
        gradeCredits: "S - 1.00",
        courseType: "MANDATORY",
      },
      {
        srNo: "12",
        session: "2024-2025 II",
        courseName: "HUMAN VALUES AND ETHICS",
        gradeCredits: "B- 3.00",
        courseType: "CORE",
      },
      {
        srNo: "13",
        session: "2024-2025 I",
        courseName: "INDIAN KNOWLEDGE SYSTEM",
        gradeCredits: "S - 1.00",
        courseType: "MANDATORY",
      },
      {
        srNo: "14",
        session: "2024-2025 II",
        courseName: "INTRODUCTION TO SCRIPTING LANGUAGES",
        gradeCredits: "BC- 1.00",
        courseType: "CORE",
      },
      {
        srNo: "15",
        session: "2024-2025 II",
        courseName: "LINEAR ALGEBRA AND COMPLEX ANALYSIS",
        gradeCredits: "A- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "16",
        session: "2025-2026 I",
        courseName: "OBJECT ORIENTED PROGRAMMING",
        gradeCredits: "B- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "17",
        session: "2025-2026 I",
        courseName: "PROBABILITY AND STATISTICS",
        gradeCredits: "A- 4.00",
        courseType: "CORE",
      },
      {
        srNo: "18",
        session: "2024-2025 I",
        courseName: "PROGRAMMING FOR PROBLEM SOLVING",
        gradeCredits: "BC- 4.50",
        courseType: "CORE",
      },
      {
        srNo: "19",
        session: "2025-2026 I",
        courseName: "SIGNALS AND SYSTEMS",
        gradeCredits: "B- 3.00",
        courseType: "CORE",
      },
      {
        srNo: "20",
        session: "2024-2025 I",
        courseName: "TECHNICAL COMMUNICATION IN ENGLISH",
        gradeCredits: "BC- 3.00",
        courseType: "CORE",
      },
      {
        srNo: "21",
        session: "2024-2025 II",
        courseName: "UG PHYSICS LABORATORY",
        gradeCredits: "AB- 1.50",
        courseType: "CORE",
      },
    ],
  },
  feeReceipt: {
    title: "Fee Receipt",
    subtitle: "Receipts generated for all processed semester fee payments.",
    session: "Session 2025-26",
    stats: [
      { label: "Receipts", value: "3", note: "Available to download" },
      {
        label: "Paid Amount",
        value: "INR 2,00,000",
        note: "Current academic year",
      },
      {
        label: "Last Receipt",
        value: "14 Mar 2026",
        note: "Most recent payment",
      },
    ],
    columns: [
      { label: "Receipt No", key: "receiptNo" },
      { label: "Semester", key: "semester" },
      { label: "Amount", key: "amount" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        receiptNo: "RCPT-2526-0118",
        semester: "Sem 3",
        amount: "INR 70,000",
        status: "Downloaded",
      },
      {
        receiptNo: "RCPT-2526-0211",
        semester: "Sem 4",
        amount: "INR 65,000",
        status: "Released",
      },
      {
        receiptNo: "RCPT-2526-0307",
        semester: "Hostel",
        amount: "INR 65,000",
        status: "Released",
      },
    ],
  },
  attendanceDateWise: {
    title: "Attendance Date Wise",
    subtitle: "Date-level attendance log with slot and course-level marking.",
    session: "Current Month",
    stats: [
      { label: "Classes Marked", value: "26", note: "In selected month" },
      { label: "Present", value: "22", note: "Attendance recorded" },
      { label: "Average", value: "84.6%", note: "Date-wise attendance" },
    ],
    columns: [
      { label: "Date", key: "date" },
      { label: "Course", key: "course" },
      { label: "Time Slot", key: "slot" },
      { label: "Attendance", key: "attendance" },
    ],
    rows: [
      {
        date: "02 Apr 2026",
        course: "CS301",
        slot: "09:00 - 09:50",
        attendance: "Present",
      },
      {
        date: "03 Apr 2026",
        course: "CS302",
        slot: "11:00 - 11:50",
        attendance: "Late",
      },
      {
        date: "04 Apr 2026",
        course: "HS201",
        slot: "14:00 - 14:50",
        attendance: "Present",
      },
      {
        date: "05 Apr 2026",
        course: "MA204",
        slot: "10:00 - 10:50",
        attendance: "Absent",
      },
    ],
  },
  admitCard: {
    title: "Admit Card",
    subtitle: "Exam hall ticket issue status and center assignment details.",
    session: "End Semester Exams 2025-26 II",
    stats: [
      { label: "Exams Listed", value: "5", note: "As per timetable" },
      { label: "Venue", value: "Block C", note: "Primary exam center" },
      { label: "Card Status", value: "Released", note: "Ready to download" },
    ],
    columns: [
      { label: "Exam", key: "exam" },
      { label: "Date", key: "date" },
      { label: "Venue", key: "venue" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        exam: "CS301 Endsem",
        date: "28 Apr 2026",
        venue: "C-201",
        status: "Released",
      },
      {
        exam: "MA204 Endsem",
        date: "30 Apr 2026",
        venue: "C-204",
        status: "Released",
      },
      {
        exam: "HS201 Endsem",
        date: "02 May 2026",
        venue: "C-206",
        status: "Released",
      },
      {
        exam: "CS302 Endsem",
        date: "05 May 2026",
        venue: "C-208",
        status: "Released",
      },
    ],
  },
  disciplinaryAction: {
    title: "Disciplinary Action",
    subtitle: "Disciplinary records, closure status, and compliance notes.",
    session: "Conduct Record",
    stats: [
      { label: "Open Cases", value: "0", note: "No active disciplinary case" },
      { label: "Closed Cases", value: "1", note: "Resolved in prior semester" },
      { label: "Current Standing", value: "Clear", note: "No restrictions" },
    ],
    columns: [
      { label: "Case ID", key: "caseId" },
      { label: "Category", key: "category" },
      { label: "Reported On", key: "reportedOn" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        caseId: "DISC-2025-010",
        category: "Library Delay Fine Appeal",
        reportedOn: "16 Nov 2025",
        status: "Closed",
      },
      {
        caseId: "DISC-2025-022",
        category: "Lab Conduct Advisory",
        reportedOn: "05 Dec 2025",
        status: "Closed",
      },
      {
        caseId: "DISC-2026-004",
        category: "Attendance Clarification",
        reportedOn: "12 Jan 2026",
        status: "Approved",
      },
    ],
  },
  dropCourse: {
    title: "Drop Course",
    subtitle: "Drop request tracker with advisor review and approval outcomes.",
    session: "Session 2025-26 II",
    stats: [
      { label: "Requests", value: "2", note: "Filed this semester" },
      { label: "Approved", value: "1", note: "Processed by advisor" },
      { label: "Pending", value: "1", note: "Awaiting committee review" },
    ],
    columns: [
      { label: "Course", key: "course" },
      { label: "Reason", key: "reason" },
      { label: "Requested On", key: "requestedOn" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        course: "EE205 Signals",
        reason: "Credit load optimization",
        requestedOn: "08 Feb 2026",
        status: "Approved",
      },
      {
        course: "HS231 Open Elective",
        reason: "Timetable clash",
        requestedOn: "19 Mar 2026",
        status: "Pending",
      },
      {
        course: "CS325 Project Lab",
        reason: "Course replacement planned",
        requestedOn: "21 Mar 2026",
        status: "Submitted",
      },
    ],
  },
  bankDetailsSubmission: {
    title: "Bank Details Submission",
    subtitle:
      "Refund and scholarship bank details submission and verification.",
    session: "Finance Verification",
    stats: [
      { label: "Accounts Added", value: "1", note: "Primary account on file" },
      {
        label: "Verification",
        value: "Completed",
        note: "KYC successfully matched",
      },
      {
        label: "Last Update",
        value: "06 Apr 2026",
        note: "Most recent submission",
      },
    ],
    columns: [
      { label: "Bank", key: "bank" },
      { label: "Account Ending", key: "accountEnding" },
      { label: "IFSC", key: "ifsc" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        bank: "State Bank of India",
        accountEnding: "...4821",
        ifsc: "SBIN000456",
        status: "Approved",
      },
      {
        bank: "HDFC Bank",
        accountEnding: "...1037",
        ifsc: "HDFC000229",
        status: "Submitted",
      },
      {
        bank: "ICICI Bank",
        accountEnding: "...7745",
        ifsc: "ICIC000811",
        status: "Rejected",
      },
    ],
  },
  studentCharges: {
    title: "Student Charges",
    subtitle:
      "Department and administration charges raised against your account.",
    session: "Billing Cycle 2025-26",
    stats: [
      { label: "Total Charges", value: "INR 5,800", note: "Raised this term" },
      { label: "Paid", value: "INR 4,300", note: "Settled amount" },
      { label: "Outstanding", value: "INR 1,500", note: "Due in 7 days" },
    ],
    columns: [
      { label: "Charge Type", key: "chargeType" },
      { label: "Amount", key: "amount" },
      { label: "Raised On", key: "raisedOn" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        chargeType: "Library Late Fine",
        amount: "INR 800",
        raisedOn: "11 Mar 2026",
        status: "Paid",
      },
      {
        chargeType: "Lab Consumables",
        amount: "INR 1,500",
        raisedOn: "23 Mar 2026",
        status: "Unpaid",
      },
      {
        chargeType: "Hostel Repair Recovery",
        amount: "INR 2,000",
        raisedOn: "28 Mar 2026",
        status: "Paid",
      },
      {
        chargeType: "Sports Registration",
        amount: "INR 1,500",
        raisedOn: "01 Apr 2026",
        status: "Waived",
      },
    ],
  },
  courseReplacement: {
    title: "Course Replacement",
    subtitle:
      "Requests to replace enrolled courses within allowed add/drop window.",
    session: "Session 2025-26 II",
    stats: [
      { label: "Requests", value: "3", note: "Replacement requests submitted" },
      { label: "Processed", value: "2", note: "Action completed" },
      { label: "Open", value: "1", note: "Pending department action" },
    ],
    columns: [
      { label: "Drop Course", key: "dropCourse" },
      { label: "Add Course", key: "addCourse" },
      { label: "Requested On", key: "requestedOn" },
      { label: "Status", key: "status" },
    ],
    rows: [
      {
        dropCourse: "EE205 Signals",
        addCourse: "CS341 ML Basics",
        requestedOn: "16 Mar 2026",
        status: "Approved",
      },
      {
        dropCourse: "HS231 Open Elective",
        addCourse: "HS239 Public Policy",
        requestedOn: "18 Mar 2026",
        status: "Submitted",
      },
      {
        dropCourse: "CS325 Project Lab",
        addCourse: "CS327 Cloud Lab",
        requestedOn: "20 Mar 2026",
        status: "Pending",
      },
    ],
  },
};

const getBadgeClass = (value) => {
  return (
    badgeClassByValue[value] || "bg-gray-100 text-gray-700 border-gray-200"
  );
};

const StudentServiceScreen = ({ serviceKey, activeTab }) => {
  const config = serviceConfigs[serviceKey];
  const isStudentHistory = serviceKey === "studentHistory";

  if (!config) {
    return (
      <StudentLayout activeTab={activeTab}>
        <div className="max-w-5xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Student Service
          </h1>
          <p className="text-sm text-gray-500">
            No data is configured for this option yet.
          </p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab={activeTab}>
      <div className="max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {config.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">
          {config.subtitle}
        </p>

        <div className="inline-block px-3 sm:px-5 py-1.5 sm:py-2 bg-black text-white text-xs sm:text-sm font-semibold mb-5 sm:mb-8 shadow-sm">
          {config.session}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-8">
          {config.stats.map((item) => (
            <div
              key={item.label}
              className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4"
            >
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-base sm:text-xl font-bold text-gray-900 mt-1">
                {item.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {isStudentHistory ? (
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Course List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {config.columns.map((col) => (
                      <th
                        key={col.key}
                        className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.rows.map((row, index) => (
                    <tr
                      key={`${row[config.columns[0].key]}-${index}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {config.columns.map((col) => (
                        <td
                          key={col.key}
                          className="py-3.5 px-5 text-sm text-gray-700 whitespace-nowrap"
                        >
                          <span
                            className={
                              col.key === "courseName"
                                ? "font-medium text-gray-900"
                                : "text-gray-700"
                            }
                          >
                            {row[col.key]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Current Entries
              </h2>
              <button className="px-3 py-1.5 bg-black text-white text-[11px] sm:text-xs font-medium hover:bg-[#0e445b] transition-colors cursor-pointer">
                New Request
              </button>
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {config.columns.map((col) => (
                      <th
                        key={col.key}
                        className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {config.rows.map((row, index) => (
                    <tr
                      key={`${row[config.columns[0].key]}-${index}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {config.columns.map((col) => {
                        const value = row[col.key];
                        const isBadge =
                          col.key === "status" || col.key === "attendance";

                        return (
                          <td
                            key={col.key}
                            className="py-3.5 px-5 text-sm text-gray-700 whitespace-nowrap"
                          >
                            {isBadge ? (
                              <span
                                className={`inline-block px-2 py-0.5 text-xs font-semibold border ${getBadgeClass(value)}`}
                              >
                                {value}
                              </span>
                            ) : (
                              <span className="text-gray-700">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden p-3 space-y-3">
              {config.rows.map((row, index) => (
                <div
                  key={`${row[config.columns[0].key]}-${index}`}
                  className="border border-gray-100 p-3"
                >
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {row[config.columns[0].key]}
                  </p>
                  <div className="space-y-1.5">
                    {config.columns.slice(1).map((col) => {
                      const value = row[col.key];
                      const isBadge =
                        col.key === "status" || col.key === "attendance";

                      return (
                        <div
                          key={col.key}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="text-[11px] text-gray-400 uppercase tracking-wide">
                            {col.label}
                          </span>
                          {isBadge ? (
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] font-semibold border ${getBadgeClass(value)}`}
                            >
                              {value}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-700 text-right">
                              {value}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentServiceScreen;
