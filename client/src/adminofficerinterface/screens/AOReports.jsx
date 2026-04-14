import React, { useState } from "react";
import AdminOfficerLayout from "../AdminOfficerLayout";
import { Download, ChevronRight } from "lucide-react";

const reportCategories = [
  {
    id: "enrollment",
    title: "Enrollment Reports",
    accent: "#9f1239",
    reports: [
      { name: "Enrollment Summary", desc: "Total enrollments by term, department, and course", formats: ["CSV", "PDF"] },
      { name: "Enrollment Trends", desc: "Term-over-term enrollment comparison", formats: ["CSV", "PDF"] },
      { name: "Enrollment by Department", desc: "Department-wise breakdown of active enrollments", formats: ["CSV"] },
    ],
  },
  {
    id: "course",
    title: "Course Performance",
    accent: "#059669",
    reports: [
      { name: "Course Completion Report", desc: "Completion rates across all active courses", formats: ["CSV", "PDF"] },
      { name: "Instructor Load Report", desc: "Course assignments per instructor", formats: ["CSV"] },
      { name: "Course Utilization", desc: "Seat capacity vs actual enrollment", formats: ["CSV", "PDF"] },
    ],
  },
  {
    id: "user",
    title: "User Statistics",
    accent: "#52525b",
    reports: [
      { name: "User Count by Role", desc: "Breakdown of students, faculty, staff, and admin", formats: ["CSV", "PDF"] },
      { name: "Active vs Inactive Users", desc: "User activity status across the institution", formats: ["CSV"] },
      { name: "User Growth Report", desc: "New user registrations over time", formats: ["CSV", "PDF"] },
    ],
  },
  {
    id: "academic",
    title: "Academic Performance",
    accent: "#d97706",
    reports: [
      { name: "Grade Distribution", desc: "Grade breakdowns across courses and departments", formats: ["CSV", "PDF"] },
      { name: "Pass/Fail Ratios", desc: "Course-wise pass and fail statistics", formats: ["CSV", "PDF"] },
      { name: "Submission Statistics", desc: "Assignment submission rates and timeliness", formats: ["CSV"] },
    ],
  },
];

const recentExports = [
  { name: "Enrollment Summary — Spring 2026", date: "Apr 10, 2026", format: "PDF", size: "245 KB" },
  { name: "Course Completion Report", date: "Apr 8, 2026", format: "CSV", size: "128 KB" },
  { name: "User Count by Role", date: "Apr 5, 2026", format: "PDF", size: "89 KB" },
  { name: "Grade Distribution — CSE", date: "Apr 2, 2026", format: "CSV", size: "312 KB" },
];

const AOReports = () => {
  const [selectedTerm, setSelectedTerm] = useState("Spring 2026");

  const handleExport = (reportName, format) => {
    // Frontend trigger only — actual export handled by backend
    alert(`Exporting "${reportName}" as ${format} for ${selectedTerm}`);
  };

  return (
    <AdminOfficerLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
              Reports & <span className="font-semibold">Exports</span>
            </h1>
            <p className="text-sm text-gray-400">
              Generate and download institutional reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="text-xs border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-400"
            >
              <option>Spring 2026</option>
              <option>Fall 2025</option>
              <option>Spring 2025</option>
              <option>Fall 2024</option>
            </select>
          </div>
        </div>

        {/* Report Categories */}
        <div className="space-y-4 sm:space-y-6 mb-8">
          {reportCategories.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <div key={cat.id} className="bg-white border border-gray-100">
                <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700">{cat.title}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {cat.reports.map((report) => (
                    <div
                      key={report.name}
                      className="px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800">{report.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{report.desc}</p>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {report.formats.map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => handleExport(report.name, fmt)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer"
                          >
                            <Download size={10} />
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Exports */}
        <div className="bg-white border border-gray-100">
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-700">Recent Exports</h3>
          </div>

          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">Report</th>
                  <th className="text-left px-4 py-2.5 font-medium">Date</th>
                  <th className="text-left px-4 py-2.5 font-medium">Format</th>
                  <th className="text-left px-4 py-2.5 font-medium">Size</th>
                  <th className="text-left px-4 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map((exp, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{exp.name}</td>
                    <td className="px-4 py-3 text-gray-500">{exp.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600">{exp.format}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{exp.size}</td>
                    <td className="px-4 py-3">
                      <button className="text-gray-400 hover:text-rose-800 transition-colors cursor-pointer">
                        <Download size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-50">
            {recentExports.map((exp, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{exp.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{exp.date} · {exp.format} · {exp.size}</p>
                </div>
                <button className="text-gray-400 hover:text-rose-800 flex-shrink-0 cursor-pointer">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminOfficerLayout>
  );
};

export default AOReports;
