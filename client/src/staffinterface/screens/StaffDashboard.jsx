import React from "react";
import StaffLayout from "../StaffLayout";
import { ChevronRight } from "lucide-react";

const kpiCards = [
  { label: "Total Users", value: "1,248", accent: "#242424", change: "Students: 986 · Faculty: 142 · Staff: 120" },
  { label: "Total Courses", value: "156", accent: "#000000", change: "12 depts · 6 terms" },
  { label: "Active Enrollments", value: "3,842", accent: "#71717a", change: "Spring 2026" },
  { label: "Current Term", value: "Spring '26", accent: "#242424", change: "Jan 15 – May 30" },
];

const alerts = [
  { id: 1, type: "Enrollment", message: "23 pending enrollment approvals", color: "text-amber-600 bg-amber-50", urgent: true },
  { id: 2, type: "Course", message: "4 courses without assigned instructors", color: "text-red-600 bg-red-50", urgent: true },
  { id: 3, type: "User", message: "8 inactive user accounts flagged", color: "text-orange-600 bg-orange-50", urgent: false },
  { id: 4, type: "Announcement", message: "2 draft announcements pending review", color: "text-zinc-600 bg-zinc-50", urgent: false },
];

const recentActivity = [
  { action: "New enrollment", detail: "Rahul Verma → CS301 Data Structures", time: "5 min ago" },
  { action: "User activated", detail: "Dr. Meera Patel — Faculty account", time: "22 min ago" },
  { action: "Course created", detail: "ME205 Thermodynamics — Fall 2026", time: "1h ago" },
  { action: "Enrollment approved", detail: "Batch approval — 15 students → EE101", time: "2h ago" },
  { action: "Announcement sent", detail: "Mid-semester exam schedule published", time: "3h ago" },
  { action: "User deactivated", detail: "Sunil Kumar — Graduated", time: "5h ago" },
  { action: "Course archived", detail: "HS102 Communication Skills — Fall 2025", time: "1d ago" },
  { action: "Instructor assigned", detail: "Prof. Amit Verma → CS405 Machine Learning", time: "1d ago" },
];

const quickStats = [
  { label: "Pending Enrollments", value: "23", color: "#000000" },
  { label: "Unassigned Courses", value: "4", color: "#242424" },
  { label: "Inactive Users", value: "8", color: "#71717a" },
  { label: "Active Courses", value: "98", color: "#242424" },
];

const StaffDashboard = () => {
  return (
    <StaffLayout>
      <div className="max-w-6xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Staff Dashboard
        </h2>
        <p className="text-sm text-gray-400 mb-5">Institution Overview — Academic Office</p>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white border border-gray-100 p-3 sm:p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{card.label}</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: card.accent }}>
                  {card.value}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{card.change}</p>
              </div>
            );
          })}
        </div>

        {/* Alerts + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Alerts — 2/3 */}
          <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Alerts</h3>
              <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                {alerts.filter((a) => a.urgent).length} urgent
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {alert.type}
                        </span>
                        {alert.urgent && (
                          <span className="text-[10px] font-medium text-red-500">Urgent</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-700 mt-1">{alert.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats — 1/3 */}
          <div className="bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {quickStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600">{s.label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: s.color }}>{s.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="px-4 sm:px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Recent Activity</h3>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">Action</th>
                  <th className="text-left px-4 py-2.5 font-medium">Detail</th>
                  <th className="text-left px-4 py-2.5 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{item.action}</td>
                    <td className="px-4 py-3 text-gray-600">{item.detail}</td>
                    <td className="px-4 py-3 text-gray-400">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-800">{item.action}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-[10px] text-gray-300 flex-shrink-0">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffDashboard;
