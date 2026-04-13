import React from "react";
import { useNavigate } from "react-router-dom";
import AdminOfficerLayout from "../AdminOfficerLayout";

const notifications = [
  {
    title: "Enrollment Spike Detected",
    desc: "CS301 Data Structures enrollment exceeded 90% capacity",
    time: "10m ago",
    unread: true,
  },
  {
    title: "Unassigned Courses Alert",
    desc: "6 courses for Spring 2026 still have no instructor assigned",
    time: "1h ago",
    unread: true,
  },
  {
    title: "Low Completion Warning",
    desc: "ME301 Fluid Mechanics completion rate dropped below 40%",
    time: "3h ago",
    unread: true,
  },
  {
    title: "Term Report Available",
    desc: "Fall 2025 institutional performance report is ready for download",
    time: "Yesterday",
    unread: false,
  },
  {
    title: "Faculty Load Review",
    desc: "3 instructors have 5+ course assignments this term",
    time: "2d ago",
    unread: false,
  },
  {
    title: "Enrollment Summary Published",
    desc: "Spring 2026 enrollment summary has been auto-generated",
    time: "3d ago",
    unread: false,
  },
];

const AONotifications = () => {
  const navigate = useNavigate();

  return (
    <AdminOfficerLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-5 sm:mb-8 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="flex-shrink-0 px-2 py-1 text-xs sm:text-sm hover:bg-gray-100 text-gray-500 cursor-pointer transition-colors"
            >
              Back
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
              Notifications
            </h1>
          </div>
          <button className="flex-shrink-0 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer whitespace-nowrap">
            <span className="hidden sm:inline">Mark all as read</span>
            <span className="sm:hidden">Read all</span>
          </button>
        </div>

        <div className="space-y-0">
          {notifications.map((n, idx) => (
            <div
              key={idx}
              className={`border-b border-gray-100 px-3 sm:px-4 py-3 sm:py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer gap-2 ${n.unread ? "bg-black/[0.02]" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {n.title}
                  </h3>
                  {n.unread && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">
                  {n.desc}
                </p>
              </div>
              <span className="text-[9px] sm:text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5">
                {n.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminOfficerLayout>
  );
};

export default AONotifications;
