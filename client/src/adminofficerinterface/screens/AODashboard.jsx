import React from "react";
import AdminOfficerLayout from "../AdminOfficerLayout";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Calendar,
  AlertTriangle,
  UserX,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const kpis = [
  {
    label: "Total Students",
    value: "2,486",
    change: "+124 this term",
    trend: "up",
    icon: Users,
    accent: "#2563eb",
  },
  {
    label: "Total Faculty",
    value: "187",
    change: "12 departments",
    trend: "neutral",
    icon: GraduationCap,
    accent: "#7c3aed",
  },
  {
    label: "Active Courses",
    value: "312",
    change: "98% with instructors",
    trend: "up",
    icon: BookOpen,
    accent: "#0891b2",
  },
  {
    label: "Active Enrollments",
    value: "8,942",
    change: "+6.2% vs last term",
    trend: "up",
    icon: ClipboardCheck,
    accent: "#059669",
  },
  {
    label: "Current Term",
    value: "Spring '26",
    change: "Jan 15 — May 30",
    trend: "neutral",
    icon: Calendar,
    accent: "#d97706",
  },
];

const enrollmentTrend = [
  { month: "Aug", enrollments: 7200 },
  { month: "Sep", enrollments: 7800 },
  { month: "Oct", enrollments: 8100 },
  { month: "Nov", enrollments: 8050 },
  { month: "Dec", enrollments: 7900 },
  { month: "Jan", enrollments: 8400 },
  { month: "Feb", enrollments: 8700 },
  { month: "Mar", enrollments: 8942 },
];

const completionByDept = [
  { dept: "CSE", rate: 92 },
  { dept: "ECE", rate: 87 },
  { dept: "ME", rate: 78 },
  { dept: "EE", rate: 84 },
  { dept: "CE", rate: 81 },
  { dept: "HSS", rate: 95 },
  { dept: "Math", rate: 90 },
  { dept: "Phys", rate: 88 },
];

const healthIndicators = [
  { label: "Course Completion Rate", value: "86%", status: "good" },
  { label: "Submission Completion", value: "74%", status: "warning" },
  { label: "Avg Enrollment per Course", value: "28.7", status: "good" },
  { label: "Faculty-Student Ratio", value: "1:13", status: "good" },
];

const alerts = [
  {
    id: 1,
    severity: "critical",
    message: "6 courses without assigned instructors",
    icon: AlertTriangle,
  },
  {
    id: 2,
    severity: "warning",
    message: "3 courses below 50% completion rate",
    icon: TrendingDown,
  },
  {
    id: 3,
    severity: "warning",
    message: "12 faculty with 5+ course assignments",
    icon: UserX,
  },
  {
    id: 4,
    severity: "info",
    message: "Enrollment up 6.2% vs previous term",
    icon: TrendingUp,
  },
];

const severityStyles = {
  critical: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const severityDot = {
  critical: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
};

const AODashboard = () => {
  return (
    <AdminOfficerLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Executive <span className="font-semibold">Dashboard</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Institutional overview — Strategic insights & health monitoring
        </p>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="bg-white p-3 sm:p-4 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                    {kpi.label}
                  </p>
                  <Icon size={15} style={{ color: kpi.accent }} />
                </div>
                <p
                  className="text-xl sm:text-2xl font-bold mb-0.5"
                  style={{ color: kpi.accent }}
                >
                  {kpi.value}
                </p>
                <p className="text-[10px] text-gray-400">{kpi.change}</p>
              </div>
            );
          })}
        </div>

        {/* Health Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
          {healthIndicators.map((h) => (
            <div
              key={h.label}
              className="bg-white px-3 sm:px-4 py-3 border border-gray-100 flex items-center gap-3"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                  h.status === "good" ? "bg-emerald-500" : "bg-amber-500"
                }`}
              ></span>
              <div className="min-w-0">
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  {h.value}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                  {h.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {/* Enrollment Trend */}
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Enrollment Trend
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
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
                  dataKey="enrollments"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Completion by Department */}
          <div className="bg-white p-3 sm:p-5 border border-gray-100">
            <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Completion Rate by Department
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={completionByDept}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="dept"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0",
                    border: "1px solid #e5e7eb",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`${value}%`, "Completion"]}
                />
                <Bar dataKey="rate" fill="#059669" fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white border border-gray-100 mb-6">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">
              Institutional Alerts
            </h3>
            <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
              {alerts.filter((a) => a.severity === "critical").length} critical
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {alerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  className={`px-4 sm:px-5 py-3 flex items-center gap-3 border-l-2 ${severityStyles[alert.severity]}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${severityDot[alert.severity]}`}
                  ></span>
                  <Icon size={16} className="flex-shrink-0 opacity-60" />
                  <p className="text-xs sm:text-sm flex-1">{alert.message}</p>
                  <span className="text-[10px] font-medium uppercase opacity-60">
                    {alert.severity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AdminOfficerLayout>
  );
};

export default AODashboard;
