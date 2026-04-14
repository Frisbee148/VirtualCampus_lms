import React from "react";
import AdminOfficerLayout from "../AdminOfficerLayout";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChevronRight } from "lucide-react";

const userStats = [
  { label: "Total Students", value: "2,486", accent: "#4E545C" },
  { label: "Total Faculty", value: "187", accent: "#52525b" },
  { label: "Active Users", value: "2,541", accent: "#71717a" },
  { label: "Inactive Users", value: "132", accent: "#ef4444" },
];

const roleDistribution = [
  { name: "Students", value: 2486 },
  { name: "Faculty", value: 187 },
  { name: "Staff", value: 64 },
  { name: "Admin", value: 12 },
];

const ROLE_COLORS = ["#4E545C", "#52525b", "#71717a", "#0f1117"];

const growthData = [
  { term: "Fall '23", students: 1980, faculty: 165 },
  { term: "Spring '24", students: 2080, faculty: 170 },
  { term: "Fall '24", students: 2180, faculty: 175 },
  { term: "Spring '25", students: 2290, faculty: 180 },
  { term: "Fall '25", students: 2380, faculty: 184 },
  { term: "Spring '26", students: 2486, faculty: 187 },
];

const deptBreakdown = [
  { dept: "CSE", students: 520, faculty: 38 },
  { dept: "ECE", students: 410, faculty: 32 },
  { dept: "ME", students: 380, faculty: 28 },
  { dept: "EE", students: 340, faculty: 25 },
  { dept: "CE", students: 290, faculty: 22 },
  { dept: "HSS", students: 210, faculty: 18 },
  { dept: "Math", students: 180, faculty: 14 },
  { dept: "Physics", students: 156, faculty: 10 },
];

const activitySummary = [
  { label: "Logged in last 24h", value: "1,842", pct: "68%" },
  { label: "Logged in last 7d", value: "2,389", pct: "88%" },
  { label: "Logged in last 30d", value: "2,541", pct: "94%" },
  { label: "Never logged in", value: "48", pct: "2%" },
];

const AOUserOverview = () => {
  return (
    <AdminOfficerLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          User <span className="font-semibold">Overview</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Population monitoring — users by role, activity & growth
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {userStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white p-3 sm:p-4 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{s.label}</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: s.accent }}>{s.value}</p>
              </div>
            );
          })}
        </div>

        {/* Role Distribution + Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 mb-6">
          {/* Role Pie */}
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Users by Role
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                >
                  {roleDistribution.map((_, i) => (
                    <Cell key={i} fill={ROLE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: "0", border: "1px solid #e5e7eb", fontSize: "13px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 justify-center">
              {roleDistribution.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ROLE_COLORS[i] }}></span>
                  <span className="text-[10px] text-gray-500">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Over Time */}
          <div className="lg:col-span-2 bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Growth Trends
            </p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="term" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: "0", border: "1px solid #e5e7eb", fontSize: "13px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
                <Bar dataKey="students" fill="#4E545C" fillOpacity={0.8} name="Students" />
                <Bar dataKey="faculty" fill="#52525b" fillOpacity={0.8} name="Faculty" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Breakdown + Activity Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5 mb-6">
          {/* Dept Table */}
          <div className="lg:col-span-2 bg-white border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Department Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500">
                    <th className="text-left px-4 py-2.5 font-medium">Department</th>
                    <th className="text-left px-4 py-2.5 font-medium">Students</th>
                    <th className="text-left px-4 py-2.5 font-medium">Faculty</th>
                    <th className="text-left px-4 py-2.5 font-medium">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {deptBreakdown.map((d) => (
                    <tr key={d.dept} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-gray-700">{d.dept}</td>
                      <td className="px-4 py-2.5 text-gray-600">{d.students}</td>
                      <td className="px-4 py-2.5 text-gray-600">{d.faculty}</td>
                      <td className="px-4 py-2.5 text-gray-500">1:{Math.round(d.students / d.faculty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="bg-white border border-gray-100 p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Activity Summary</h3>
            <div className="space-y-4">
              {activitySummary.map((a) => (
                <div key={a.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">{a.label}</span>
                    <span className="text-xs font-bold text-gray-800">{a.value}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4E545C] rounded-full"
                      style={{ width: a.pct }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5 text-right">{a.pct}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminOfficerLayout>
  );
};

export default AOUserOverview;
