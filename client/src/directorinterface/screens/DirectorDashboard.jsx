import React from "react";
import DirectorLayout from "../DirectorLayout";
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
  { label: "Total Students", value: "3,248" },
  { label: "Total Faculty", value: "186" },
  { label: "Departments", value: "12" },
  { label: "Placement Rate", value: "92%" },
  { label: "Annual Revenue", value: "₹48.2 Cr" },
  { label: "Pending Approvals", value: "7" },
];

const enrollmentData = [
  { year: "2021", students: 2800 },
  { year: "2022", students: 2950 },
  { year: "2023", students: 3100 },
  { year: "2024", students: 3180 },
  { year: "2025", students: 3248 },
];

const deptDistribution = [
  { name: "CSE", value: 820, color: "#9f1239" },
  { name: "ECE", value: 640, color: "#059669" },
  { name: "ME", value: 480, color: "#d97706" },
  { name: "CE", value: 380, color: "#71717a" },
  { name: "Others", value: 928, color: "#94a3b8" },
];

const recentApprovals = [
  {
    id: 1,
    title: "Annual Tech Fest Budget — ₹12L",
    status: "pending",
    from: "Student Affairs",
    date: "Apr 8, 2026",
  },
  {
    id: 2,
    title: "New AI/ML Lab Equipment Purchase",
    status: "pending",
    from: "CSE Department",
    date: "Apr 7, 2026",
  },
  {
    id: 3,
    title: "Faculty Conference Travel Grant — 5 Faculty",
    status: "pending",
    from: "HR Department",
    date: "Apr 6, 2026",
  },
  {
    id: 4,
    title: "Library Digital Subscription Renewal",
    status: "approved",
    from: "Library",
    date: "Apr 5, 2026",
  },
  {
    id: 5,
    title: "Campus Wi-Fi Infrastructure Upgrade",
    status: "approved",
    from: "IT Department",
    date: "Apr 4, 2026",
  },
];

const DirectorDashboard = () => {
  return (
    <DirectorLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Welcome, <span className="font-semibold">Director</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Institution overview & quick actions
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
          {/* Enrollment Trend */}
          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <h3 className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Enrollment Trend
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="year"
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
                <Bar dataKey="students" fill="#9f1239" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <h3 className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Student Distribution by Department
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-full sm:w-1/2 h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deptDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {deptDistribution.map((entry, index) => (
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
                {deptDistribution.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: d.color }}
                    ></span>
                    <span className="text-gray-600">{d.name}</span>
                    <span className="ml-auto text-gray-400 text-xs">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Approvals */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              Recent Approvals
            </p>
            <a
              href="/director/approvals"
              className="text-xs text-[#9f1239] hover:underline font-medium"
            >
              View All
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentApprovals.map((item) => (
              <div
                key={item.id}
                className="px-3 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    From: {item.from} · {item.date}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 self-start sm:self-auto ${
                    item.status === "pending"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  {item.status === "pending" ? "Pending" : "Approved"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DirectorLayout>
  );
};

export default DirectorDashboard;
