import React from "react";
import RegistrarLayout from "../RegistrarLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Pending Admissions", value: "142" },
  { label: "Active Students", value: "3,248" },
  { label: "Upcoming Exams", value: "8" },
  { label: "Certificate Requests", value: "23" },
  { label: "Registrations Open", value: "3" },
  { label: "Processed Today", value: "47" },
];

const admissionsByProgram = [
  { program: "B.Tech", applied: 3200, accepted: 800, rejected: 180 },
  { program: "M.Tech", applied: 650, accepted: 280, rejected: 45 },
  { program: "MBA", applied: 420, accepted: 120, rejected: 30 },
  { program: "Ph.D", applied: 180, accepted: 65, rejected: 12 },
  { program: "M.Sc", applied: 290, accepted: 110, rejected: 25 },
];

const enrollmentStatus = [
  { name: "Enrolled", value: 3248, color: "#4E545C" },
  { name: "Provisional", value: 142, color: "#71717a" },
  { name: "Alumni", value: 12450, color: "#131518" },
  { name: "Withdrawn", value: 85, color: "#d4d4d8" },
];

const recentActivity = [
  {
    id: 1,
    action: "Admission approved",
    student: "Ravi Kumar — B.Tech CSE",
    time: "5 min ago",
  },
  {
    id: 2,
    action: "Transcript generated",
    student: "Priya Sharma — M.Tech ECE",
    time: "15 min ago",
  },
  {
    id: 3,
    action: "Exam schedule published",
    student: "End Semester — April 2026",
    time: "1 hr ago",
  },
  {
    id: 4,
    action: "Degree certificate issued",
    student: "Amit Patel — B.Tech ME (2025)",
    time: "2 hrs ago",
  },
  {
    id: 5,
    action: "Migration certificate request",
    student: "Sneha Gupta — MBA",
    time: "3 hrs ago",
  },
];

const RegistrarDashboard = () => {
  return (
    <RegistrarLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Welcome, <span className="font-semibold">Registrar</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Academic administration overview
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 mb-6 sm:mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-3 sm:p-5 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <p className="text-xl sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                {s.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-10">
          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Admissions by Program
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={admissionsByProgram}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="program"
                  tick={{ fontSize: 12, fill: "#94a3b8" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Bar
                  dataKey="applied"
                  name="Applied"
                  fill="#94a3b8"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="accepted"
                  name="Accepted"
                  fill="#4E545C"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Enrollment Status
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={enrollmentStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {enrollmentStatus.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "0",
                        border: "1px solid #e5e7eb",
                        fontSize: "13px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full sm:flex-1 space-y-2">
                {enrollmentStatus.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    ></span>
                    <span className="text-gray-600">{d.name}</span>
                    <span className="ml-auto text-gray-400 text-xs">
                      {d.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              Recent Activity
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="px-3 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-[#4E545C] flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    {item.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 break-words">
                    {item.student}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 self-start sm:self-auto">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default RegistrarDashboard;
