import React from "react";
import HodLayout from "../HodLayout";
import { ChevronRight } from "lucide-react";

const kpiCards = [
  { label: "Total Faculty", value: "24", accent: "#9f1239", change: "+2 this sem" },
  { label: "Active Courses", value: "38", accent: "#18181b", change: "6 labs included" },
  { label: "Total Students", value: "486", accent: "#71717a", change: "4 batches" },
  { label: "At Risk Students", value: "31", accent: "#9f1239", change: "6.4% of dept" },
];

const facultyOverview = [
  { name: "Dr. Farah Khan", courses: 2, students: 78, avgAttendance: "88%", status: "active" },
  { name: "Prof. Amit Verma", courses: 3, students: 112, avgAttendance: "82%", status: "active" },
  { name: "Dr. Neha Gupta", courses: 2, students: 65, avgAttendance: "91%", status: "active" },
  { name: "Prof. Suresh Iyer", courses: 1, students: 45, avgAttendance: "79%", status: "on-leave" },
  { name: "Dr. Priya Sharma", courses: 2, students: 90, avgAttendance: "85%", status: "active" },
];

const pendingApprovals = [
  { id: 1, type: "Leave", from: "Prof. Suresh Iyer", detail: "Medical leave — 5 days", time: "2h ago", urgent: true },
  { id: 2, type: "Budget", from: "Dr. Farah Khan", detail: "Lab equipment — Rs. 45,000", time: "1d ago", urgent: false },
  { id: 3, type: "Course", from: "Prof. Amit Verma", detail: "Extra tutorial slot request", time: "1d ago", urgent: false },
  { id: 4, type: "Leave", from: "Dr. Neha Gupta", detail: "Conference travel — 3 days", time: "2d ago", urgent: false },
];

const announcements = [
  { title: "Mid-semester exam schedule published", time: "Today" },
  { title: "Faculty meeting — Friday 4:00 PM", time: "Tomorrow" },
  { title: "NAAC accreditation documents due by April 25", time: "Apr 25" },
  { title: "Summer internship mentors assignment pending", time: "Apr 18" },
];

const statusColors = {
  active: "bg-emerald-50 text-emerald-700",
  "on-leave": "bg-zinc-100 text-zinc-600",
};

const HodDashboard = () => {
  return (
    <HodLayout>
      <div className="max-w-6xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Department Dashboard
        </h2>
        <p className="text-sm text-gray-400 mb-5">Computer Science & Engineering</p>

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

        {/* Main grid: Faculty overview + Pending approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Faculty Overview — 2/3 */}
          <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Faculty Overview</h3>
              <span className="text-[10px] text-gray-400">{facultyOverview.length} members</span>
            </div>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-gray-500">
                    <th className="text-left px-4 py-2.5 font-medium">Name</th>
                    <th className="text-left px-4 py-2.5 font-medium">Courses</th>
                    <th className="text-left px-4 py-2.5 font-medium">Students</th>
                    <th className="text-left px-4 py-2.5 font-medium">Avg Attendance</th>
                    <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyOverview.map((f) => (
                    <tr key={f.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{f.name}</td>
                      <td className="px-4 py-3 text-gray-600">{f.courses}</td>
                      <td className="px-4 py-3 text-gray-600">{f.students}</td>
                      <td className="px-4 py-3 text-gray-600">{f.avgAttendance}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[f.status]}`}>
                          {f.status === "on-leave" ? "On Leave" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {facultyOverview.map((f) => (
                <div key={f.name} className="px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                    <p className="text-[10px] text-gray-400">{f.courses} courses · {f.students} students</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${statusColors[f.status]}`}>
                    {f.status === "on-leave" ? "On Leave" : "Active"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals — 1/3 */}
          <div className="bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Pending Approvals</h3>
              <span className="text-[10px] font-medium text-zinc-600 bg-zinc-50 px-2 py-0.5 rounded-full">
                {pendingApprovals.length} pending
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {pendingApprovals.map((a) => (
                <div key={a.id} className="px-4 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                          {a.type}
                        </span>
                        {a.urgent && (
                          <span className="text-[10px] font-medium text-red-500">Urgent</span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-800 mt-1">{a.from}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.detail}</p>
                    </div>
                    <span className="text-[10px] text-gray-300 flex-shrink-0">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Announcements */}
          <div className="bg-white border border-gray-100 shadow-sm">
            <div className="px-4 sm:px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">Department Announcements</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {announcements.map((a, i) => (
                <div key={i} className="px-4 py-3 flex items-start justify-between gap-3">
                  <p className="text-xs text-gray-700">{a.title}</p>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Department Snapshot</h3>
            <div className="space-y-4">
              {[
                { label: "Avg Dept CGPA", value: "7.6", color: "#9f1239" },
                { label: "Avg Attendance", value: "84%", color: "#18181b" },
                { label: "Courses This Sem", value: "38", color: "#71717a" },
                { label: "Pending Approvals", value: "4", color: "#9f1239" },
              ].map((s) => {
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
      </div>
    </HodLayout>
  );
};

export default HodDashboard;
