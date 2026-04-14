import React, { useState } from "react";
import FacultyLayout from "../FacultyLayout";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const attendanceData = [
  { month: "Jan", present: 88, absent: 12 },
  { month: "Feb", present: 82, absent: 18 },
  { month: "Mar", present: 90, absent: 10 },
  { month: "Apr", present: 75, absent: 25 },
  { month: "May", present: 85, absent: 15 },
  { month: "Jun", present: 78, absent: 22 },
];

const cgpaData = [
  { range: "9-10", count: 8 },
  { range: "8-9", count: 15 },
  { range: "7-8", count: 22 },
  { range: "6-7", count: 18 },
  { range: "5-6", count: 10 },
  { range: "<5", count: 5 },
];

const performanceTrend = [
  { sem: "Sem 1", avg: 7.2 },
  { sem: "Sem 2", avg: 7.5 },
  { sem: "Sem 3", avg: 7.1 },
  { sem: "Sem 4", avg: 7.8 },
  { sem: "Sem 5", avg: 8.0 },
  { sem: "Sem 6", avg: 7.6 },
];

const riskDistribution = [
  { name: "Attendance", value: 12, color: "#e8a435" },
  { name: "CGPA", value: 8, color: "#ef4444" },
  { name: "Inactivity", value: 5, color: "#6b7280" },
  { name: "Safe", value: 53, color: "#4E545C" },
];

const BatchInsights = () => {
  const [batch, setBatch] = useState("2023");

  return (
    <FacultyLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Batch Insights
          </h2>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="bg-[#4E545C] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="2023">Batch 2023</option>
            <option value="2022">Batch 2022</option>
            <option value="2021">Batch 2021</option>
          </select>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {[
            { label: "Total Students", value: "78", accent: "#4E545C" },
            { label: "At Risk", value: "25", accent: "#ef4444" },
            { label: "Avg CGPA", value: "7.4", accent: "#e8a435" },
            { label: "Avg Attendance", value: "83%", accent: "#2d8a4e" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 p-3 sm:p-4 shadow-sm"
            >
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">
                {stat.label}
              </p>
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Attendance Bar Chart */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Monthly Attendance (%)
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="present"
                  fill="#4E545C"
                  animationDuration={1200}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="absent"
                  fill="#e8a435"
                  animationDuration={1200}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* CGPA Distribution */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              CGPA Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cgpaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#4E545C"
                  animationDuration={1400}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Trend */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Avg CGPA Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sem" tick={{ fontSize: 12 }} />
                <YAxis domain={[5, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#4E545C"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#4E545C" }}
                  animationDuration={1600}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution Pie */}
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Risk Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  dataKey="value"
                  animationDuration={1400}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </FacultyLayout>
  );
};

export default BatchInsights;
