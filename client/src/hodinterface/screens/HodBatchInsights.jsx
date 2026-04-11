import React, { useState } from "react";
import HodLayout from "../HodLayout";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { month: "Aug", present: 89, absent: 11 },
  { month: "Sep", present: 86, absent: 14 },
  { month: "Oct", present: 83, absent: 17 },
  { month: "Nov", present: 80, absent: 20 },
  { month: "Dec", present: 77, absent: 23 },
  { month: "Jan", present: 84, absent: 16 },
  { month: "Feb", present: 82, absent: 18 },
  { month: "Mar", present: 85, absent: 15 },
];

const cgpaData = [
  { range: "9-10", count: 24 },
  { range: "8-9", count: 68 },
  { range: "7-8", count: 112 },
  { range: "6-7", count: 98 },
  { range: "5-6", count: 52 },
  { range: "<5", count: 18 },
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
  { name: "Attendance", value: 14, color: "#e8a435" },
  { name: "CGPA", value: 9, color: "#ef4444" },
  { name: "Inactivity", value: 5, color: "#6b7280" },
  { name: "Safe", value: 458, color: "#1a7a7a" },
];

const HodBatchInsights = () => {
  const [batch, setBatch] = useState("2023");

  return (
    <HodLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Batch Insights</h2>
            <p className="text-sm text-gray-400">Department-wide batch performance</p>
          </div>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="bg-[#1a7a7a] text-white px-4 py-2 text-sm font-medium outline-none cursor-pointer"
          >
            <option value="2023">Batch 2023</option>
            <option value="2024">Batch 2024</option>
            <option value="2025">Batch 2025</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {[
            { label: "Total Students", value: "128", accent: "#1a7a7a" },
            { label: "At Risk", value: "12", accent: "#ef4444" },
            { label: "Avg CGPA", value: "7.6", accent: "#e8a435" },
            { label: "Avg Attendance", value: "84%", accent: "#2d8a4e" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 p-3 sm:p-4 shadow-sm">
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: stat.accent }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Attendance (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="present" fill="#1a7a7a" radius={[3, 3, 0, 0]} />
                <Bar dataKey="absent" fill="#e8a435" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">CGPA Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cgpaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#1a7a7a" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Avg CGPA Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="sem" tick={{ fontSize: 12 }} />
                <YAxis domain={[5, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#1a7a7a" strokeWidth={2.5} dot={{ r: 4, fill: "#1a7a7a" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-gray-100 p-3 sm:p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
    </HodLayout>
  );
};

export default HodBatchInsights;
