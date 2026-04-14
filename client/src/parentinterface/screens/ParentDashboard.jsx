import React from "react";
import { useNavigate } from "react-router-dom";
import ParentLayout from "../ParentLayout";
import { ChevronRight } from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Courses", value: "6", sub: "Active this semester" },
    {
      label: "Performance",
      value: "8.4",
      sub: "Current CGPA",
      onClick: () => navigate("/parent/performance"),
    },
    {
      label: "Attendance",
      value: "86%",
      sub: "Overall average",
      onClick: () => navigate("/parent/attendance"),
    },
    {
      label: "Fee Status",
      value: "Paid",
      sub: "Semester 3",
      onClick: () => navigate("/parent/fee-status"),
    },
  ];

  return (
    <ParentLayout activeTab="Dashboard">
      <div className="max-w-6xl">
        {/* Ward info banner */}
        <div className="bg-white border border-gray-200 p-4 sm:p-6 mb-5 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src="/Picture1.png"
            alt="Ward"
            className="w-14 h-14 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <p className="text-[10px] sm:text-xs font-semibold text-[#4E545C] uppercase tracking-wider mb-1">
              Your Ward
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Kanye East
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              B.Tech CSE — Semester 3 • Roll No: CSE2022045
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              onClick={s.onClick}
              className={`bg-white p-3 sm:p-5 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${s.onClick ? "cursor-pointer" : ""}`}
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {s.label}
                </p>
                {s.onClick && (
                  <ChevronRight size={14} className="text-gray-300" />
                )}
              </div>
              <p className="text-xl sm:text-3xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                {s.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400">
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div
            onClick={() => navigate("/parent/grades")}
            className="bg-white border border-gray-200 p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Grades
            </p>
            <p className="text-sm text-gray-700">
              View detailed course grades and exam scores
            </p>
          </div>
          <div
            onClick={() => navigate("/parent/timetable")}
            className="bg-white border border-gray-200 p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Timetable
            </p>
            <p className="text-sm text-gray-700">
              Check your ward's weekly class schedule
            </p>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentDashboard;
