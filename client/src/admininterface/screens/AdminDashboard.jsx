import React from "react";
import AdminLayout from "../AdminLayout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { label: "Total Users", value: "4,812" },
  { label: "Active Now", value: "342" },
  { label: "Server Uptime", value: "99.8%" },
  { label: "Security Alerts", value: "3" },
  { label: "Roles Configured", value: "8" },
  { label: "Systems Healthy", value: "12/12" },
];

const trafficData = [
  { time: "00:00", users: 45 },
  { time: "04:00", users: 22 },
  { time: "08:00", users: 180 },
  { time: "10:00", users: 310 },
  { time: "12:00", users: 280 },
  { time: "14:00", users: 342 },
  { time: "16:00", users: 295 },
  { time: "18:00", users: 210 },
  { time: "20:00", users: 165 },
  { time: "22:00", users: 88 },
];

const systemStatus = [
  {
    name: "Web Server (Nginx)",
    status: "healthy",
    cpu: "32%",
    memory: "4.2 GB",
    uptime: "45d 12h",
  },
  {
    name: "Application Server",
    status: "healthy",
    cpu: "58%",
    memory: "8.1 GB",
    uptime: "45d 12h",
  },
  {
    name: "Database (PostgreSQL)",
    status: "healthy",
    cpu: "41%",
    memory: "12.4 GB",
    uptime: "45d 12h",
  },
  {
    name: "Redis Cache",
    status: "healthy",
    cpu: "15%",
    memory: "2.1 GB",
    uptime: "30d 8h",
  },
  {
    name: "File Storage",
    status: "warning",
    cpu: "12%",
    memory: "85% used",
    uptime: "45d 12h",
  },
  {
    name: "Email Service",
    status: "healthy",
    cpu: "8%",
    memory: "1.2 GB",
    uptime: "25d 4h",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "User login",
    user: "admin@lnmiit.ac.in",
    ip: "192.168.1.100",
    time: "2 min ago",
    type: "info",
  },
  {
    id: 2,
    action: "Failed login attempt",
    user: "unknown@test.com",
    ip: "203.45.67.89",
    time: "15 min ago",
    type: "warning",
  },
  {
    id: 3,
    action: "Role updated",
    user: "admin@lnmiit.ac.in",
    ip: "192.168.1.100",
    time: "1 hr ago",
    type: "info",
  },
  {
    id: 4,
    action: "Bulk user import",
    user: "admin@lnmiit.ac.in",
    ip: "192.168.1.100",
    time: "2 hrs ago",
    type: "success",
  },
  {
    id: 5,
    action: "System backup completed",
    user: "system",
    ip: "—",
    time: "6 hrs ago",
    type: "success",
  },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Welcome, <span className="font-semibold">Admin</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          System health, user activity & infrastructure overview
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

        {/* Traffic Chart + System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-10">
          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Active Users Today
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#d97706"
                  fill="#d97706"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-3 sm:p-5 border border-gray-200">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              System Status
            </p>
            <div className="space-y-2.5">
              {systemStatus.map((sys, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${sys.status === "healthy" ? "bg-emerald-500" : "bg-amber-500"}`}
                  ></span>
                  <span className="text-sm text-gray-700 flex-1 truncate">
                    {sys.name}
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {sys.cpu}
                  </span>
                  <span className="text-xs text-gray-400 hidden md:inline">
                    {sys.memory}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 ${
                      sys.status === "healthy"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {sys.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 overflow-hidden">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
              Recent Activity
            </p>
            <a
              href="/admin/audit"
              className="text-xs text-[#d97706] hover:underline font-medium"
            >
              View All Logs
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                className="px-3 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors"
              >
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === "warning"
                      ? "bg-red-500"
                      : item.type === "success"
                        ? "bg-emerald-500"
                        : "bg-blue-500"
                  }`}
                ></span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">
                    {item.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 break-words">
                    {item.user} · IP: {item.ip}
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
    </AdminLayout>
  );
};

export default AdminDashboard;
