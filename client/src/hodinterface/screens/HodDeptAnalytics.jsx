import React, { useState } from "react";
import HodLayout from "../HodLayout";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const attendanceData = [
  { month: "Aug", value: 89 },
  { month: "Sep", value: 86 },
  { month: "Oct", value: 83 },
  { month: "Nov", value: 80 },
  { month: "Dec", value: 77 },
  { month: "Jan", value: 84 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 85 },
];

const cgpaDistribution = [
  { range: "9-10", count: 24 },
  { range: "8-9", count: 68 },
  { range: "7-8", count: 112 },
  { range: "6-7", count: 98 },
  { range: "5-6", count: 52 },
  { range: "<5", count: 18 },
];

const facultyWorkload = [
  { name: "Dr. Farah Khan", courses: 2, students: 78 },
  { name: "Prof. Amit Verma", courses: 3, students: 112 },
  { name: "Dr. Neha Gupta", courses: 2, students: 65 },
  { name: "Prof. Suresh Iyer", courses: 1, students: 45 },
  { name: "Dr. Priya Sharma", courses: 2, students: 90 },
  { name: "Dr. Vikram Reddy", courses: 2, students: 56 },
  { name: "Dr. Ananya Desai", courses: 1, students: 40 },
];

const semesterTrend = [
  { sem: "2022-I", avg: 7.1 },
  { sem: "2022-II", avg: 7.3 },
  { sem: "2023-I", avg: 7.2 },
  { sem: "2023-II", avg: 7.5 },
  { sem: "2024-I", avg: 7.4 },
  { sem: "2024-II", avg: 7.6 },
  { sem: "2025-I", avg: 7.8 },
  { sem: "2025-II", avg: 7.6 },
];

const riskBreakdown = [
  { name: "Low Attendance", value: 14, color: "#e8a435" },
  { name: "Low CGPA", value: 9, color: "#ef4444" },
  { name: "Both", value: 5, color: "#7c3aed" },
  { name: "Inactive", value: 3, color: "#6b7280" },
];

const coursePerformance = [
  { code: "CS102", avg: 7.8 },
  { code: "CS103", avg: 7.2 },
  { code: "CS201", avg: 7.5 },
  { code: "CS301", avg: 7.1 },
  { code: "CS401", avg: 6.8 },
  { code: "CS405", avg: 8.0 },
  { code: "CS501", avg: 7.4 },
  { code: "CS502", avg: 7.9 },
];

const batchOptions = ["All Batches", "2023", "2024", "2025"];

const HodDeptAnalytics = () => {
  const [batch, setBatch] = useState("All Batches");

  return (
    <HodLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Department Analytics</h2>
            <p className="text-sm text-gray-400">Computer Science & Engineering — Academic Performance</p>
          </div>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:border-gray-400 cursor-pointer"
          >
            {batchOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {[
            { label: "Dept Avg CGPA", value: "7.6", accent: "#1a7a7a" },
            { label: "Avg Attendance", value: "84%", accent: "#e8a435" },
            { label: "Pass Rate", value: "96.3%", accent: "#2d8a4e" },
            { label: "At Risk %", value: "6.4%", accent: "#ef4444" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 p-3 sm:p-4 shadow-sm">
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">{s.label}</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: s.accent }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Attendance Trend */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Attendance Trend (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1a7a7a" strokeWidth={2.5} dot={{ r: 4, fill: "#1a7a7a" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* CGPA Distribution */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">CGPA Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cgpaDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1a7a7a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Semester Avg CGPA Trend */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Semester Avg CGPA Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={semesterTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sem" tick={{ fontSize: 10 }} />
                <YAxis domain={[6, 9]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#e8a435" strokeWidth={2.5} dot={{ r: 4, fill: "#e8a435" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Breakdown */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">At-Risk Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {riskBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Faculty Workload + Course Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Faculty Workload */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Faculty Workload (Students)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={facultyWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={110} />
                <Tooltip />
                <Bar dataKey="students" fill="#1a7a7a" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Course Performance */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Course Avg CGPA</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="code" tick={{ fontSize: 11 }} />
                <YAxis domain={[5, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="avg" fill="#e8a435" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </HodLayout>
  );
};

export default HodDeptAnalytics;
