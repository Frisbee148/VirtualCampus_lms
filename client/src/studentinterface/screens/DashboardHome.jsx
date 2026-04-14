import React from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../StudentLayout";
import { ChevronRight } from "lucide-react";

const DashboardHome = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Courses",
      value: "6",
      sub: "Active this semester",
      onClick: () => navigate("/course/overview"),
    },
    {
      label: "CIF Completion",
      value: "Course CIF",
      sub: "PDF + digital checklist",
      onClick: () => navigate("/cif-completion"),
    },
    {
      label: "Performance",
      value: "8.4",
      sub: "Current CGPA",
      onClick: () => navigate("/performance"),
    },
    {
      label: "Attendance",
      value: "86%",
      sub: "Overall average",
      onClick: () => navigate("/course/attendance"),
    },
  ];

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-5 sm:mb-8">
          Hi, <span className="font-semibold">User</span>
        </h1>

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

        {/* AI Suggestion */}
        <div className="w-full bg-rose-900 py-6 sm:py-10 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center mt-3 sm:mt-4">
          <h2 className="text-base sm:text-xl font-bold text-white text-center">
            AI suggestions
          </h2>
        </div>
      </div>
    </StudentLayout>
  );
};

export default DashboardHome;
