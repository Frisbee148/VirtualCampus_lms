import React, { useState } from "react";
import AdminLayout from "../AdminLayout";

const logsData = [
  {
    id: 1,
    action: "User Login",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 9, 2026 10:30:15 AM",
    type: "auth",
    severity: "info",
  },
  {
    id: 2,
    action: "Failed Login Attempt",
    user: "unknown@test.com",
    role: "—",
    ip: "203.45.67.89",
    timestamp: "Apr 9, 2026 10:15:42 AM",
    type: "auth",
    severity: "warning",
  },
  {
    id: 3,
    action: "Role Updated: Faculty → HOD",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 9, 2026 09:45:00 AM",
    type: "user",
    severity: "info",
  },
  {
    id: 4,
    action: "Bulk User Import — 142 users",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 9, 2026 09:00:00 AM",
    type: "user",
    severity: "info",
  },
  {
    id: 5,
    action: "System Backup Completed",
    user: "system",
    role: "System",
    ip: "—",
    timestamp: "Apr 9, 2026 03:00:00 AM",
    type: "system",
    severity: "success",
  },
  {
    id: 6,
    action: "Database Migration v2.4.1",
    user: "system",
    role: "System",
    ip: "—",
    timestamp: "Apr 8, 2026 11:30:00 PM",
    type: "system",
    severity: "info",
  },
  {
    id: 7,
    action: "Permission Denied: /admin/settings",
    user: "faculty@lnmiit.ac.in",
    role: "Faculty",
    ip: "192.168.1.55",
    timestamp: "Apr 8, 2026 04:22:10 PM",
    type: "security",
    severity: "warning",
  },
  {
    id: 8,
    action: "Password Changed",
    user: "priya.20b@lnmiit.ac.in",
    role: "Student",
    ip: "192.168.2.30",
    timestamp: "Apr 8, 2026 03:15:00 PM",
    type: "auth",
    severity: "info",
  },
  {
    id: 9,
    action: "New User Created: dr.newprof@lnmiit.ac.in",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 8, 2026 02:00:00 PM",
    type: "user",
    severity: "info",
  },
  {
    id: 10,
    action: "Suspicious Activity: Multiple IP Login",
    user: "aarav.20b@lnmiit.ac.in",
    role: "Student",
    ip: "45.33.xx.xx",
    timestamp: "Apr 8, 2026 01:30:00 PM",
    type: "security",
    severity: "critical",
  },
  {
    id: 11,
    action: "Settings Updated: Academic Year",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 8, 2026 11:00:00 AM",
    type: "system",
    severity: "info",
  },
  {
    id: 12,
    action: "User Deactivated: ramesh.k@lnmiit.ac.in",
    user: "admin@lnmiit.ac.in",
    role: "Admin",
    ip: "192.168.1.100",
    timestamp: "Apr 7, 2026 05:00:00 PM",
    type: "user",
    severity: "warning",
  },
];

const severityConfig = {
  info: { bg: "bg-zinc-100", text: "text-zinc-600" },
  success: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  warning: { bg: "bg-amber-50", text: "text-amber-600" },
  critical: { bg: "bg-red-50", text: "text-red-600" },
};

const AuditLogs = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filtered = logsData.filter((log) => {
    const matchSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || log.type === typeFilter;
    const matchSeverity =
      severityFilter === "all" || log.severity === severityFilter;
    return matchSearch && matchType && matchSeverity;
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Audit Logs
            </h2>
            <p className="text-sm text-gray-400">
              Activity trail for all system events and user actions
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-fit justify-center sm:justify-start">
            Export Logs
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 mb-6">
          <div className="w-full sm:flex-1 sm:max-w-xs">
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full transition-colors"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] transition-colors w-full sm:w-auto"
          >
            <option value="all">All Types</option>
            <option value="auth">Authentication</option>
            <option value="user">User Management</option>
            <option value="system">System</option>
            <option value="security">Security</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] transition-colors w-full sm:w-auto"
          >
            <option value="all">All Severity</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Logs List */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((log) => {
              const sc = severityConfig[log.severity];
              return (
                <div
                  key={log.id}
                  className="px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700">
                      {log.action}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-gray-400">{log.user}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{log.role}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">
                        IP: {log.ip}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${sc.bg} ${sc.text}`}
                    >
                      {log.severity}
                    </span>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {log.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No logs match your filters.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLogs;
