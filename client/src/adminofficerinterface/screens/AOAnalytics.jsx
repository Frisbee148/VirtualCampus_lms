import React, { useState } from "react";
import AdminOfficerLayout from "../AdminOfficerLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const terms = ["Spring 2026", "Fall 2025", "Spring 2025", "Fall 2024"];
const departments = ["All Departments", "CSE", "ECE", "ME", "EE", "CE", "HSS", "Math", "Physics"];

const enrollmentOverTime = [
  { term: "Fall '24", students: 2180, courses: 280 },
  { term: "Spring '25", students: 2290, courses: 295 },
  { term: "Fall '25", students: 2380, courses: 305 },
  { term: "Spring '26", students: 2486, courses: 312 },
];

const courseUtilization = [
  { range: "0–25%", count: 8 },
  { range: "26–50%", count: 22 },
  { range: "51–75%", count: 95 },
  { range: "76–100%", count: 187 },
];

const participationData = [
  { month: "Jan", submissions: 4200, logins: 6800 },
  { month: "Feb", submissions: 5100, logins: 7200 },
  { month: "Mar", submissions: 4800, logins: 7000 },
  { month: "Apr", submissions: 5600, logins: 7500 },
];

const assessmentBreakdown = [
  { name: "Assignments", value: 45 },
  { name: "Quizzes", value: 25 },
  { name: "Midterms", value: 15 },
  { name: "Finals", value: 15 },
];

const PIE_COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706"];

const submissionTrend = [
  { week: "W1", submitted: 820, pending: 180, late: 45 },
  { week: "W2", submitted: 910, pending: 140, late: 38 },
  { week: "W3", submitted: 780, pending: 220, late: 62 },
  { week: "W4", submitted: 950, pending: 100, late: 30 },
  { week: "W5", submitted: 870, pending: 160, late: 48 },
  { week: "W6", submitted: 920, pending: 130, late: 35 },
  { week: "W7", submitted: 960, pending: 90, late: 28 },
  { week: "W8", submitted: 890, pending: 150, late: 42 },
];

const AOAnalytics = () => {
  const [selectedTerm, setSelectedTerm] = useState(terms[0]);
  const [selectedDept, setSelectedDept] = useState(departments[0]);

  return (
    <AdminOfficerLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
              Institutional <span className="font-semibold">Analytics</span>
            </h1>
            <p className="text-sm text-gray-400">
              Decision-making insights & trend analysis
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="text-xs border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-400"
            >
              {terms.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="text-xs border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-400"
            >
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Enrollment Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-6">
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Enrollment Growth Over Terms
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={enrollmentOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="term" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Students"
                />
                <Line
                  type="monotone"
                  dataKey="courses"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Courses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Course Utilization */}
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Course Seat Utilization
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={courseUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`${value} courses`, "Count"]}
                />
                <Bar dataKey="count" fill="#0891b2" fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Participation + Assessment Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 mb-6">
          {/* Participation */}
          <div className="lg:col-span-2 bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Student Participation
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Area
                  type="monotone"
                  dataKey="logins"
                  stroke="#7c3aed"
                  fill="#7c3aed"
                  fillOpacity={0.06}
                  strokeWidth={2}
                  name="Logins"
                />
                <Area
                  type="monotone"
                  dataKey="submissions"
                  stroke="#059669"
                  fill="#059669"
                  fillOpacity={0.06}
                  strokeWidth={2}
                  name="Submissions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Assessment Breakdown Pie */}
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Assessment Types
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={assessmentBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                >
                  {assessmentBreakdown.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`${value}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
              {assessmentBreakdown.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  ></span>
                  <span className="text-[10px] text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Trends */}
        <div className="bg-white p-3 sm:p-5 border border-gray-100 mb-6">
          <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
            Submission Trends (Weekly)
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={submissionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "11px" }} />
              <Bar dataKey="submitted" fill="#059669" fillOpacity={0.8} name="Submitted" />
              <Bar dataKey="pending" fill="#d97706" fillOpacity={0.8} name="Pending" />
              <Bar dataKey="late" fill="#ef4444" fillOpacity={0.8} name="Late" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminOfficerLayout>
  );
};

export default AOAnalytics;
