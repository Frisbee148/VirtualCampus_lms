import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import RegistrarLayout from "../RegistrarLayout";

const notifications = [
  {
    title: "New Admissions",
    desc: "15 new applications received for UG admissions",
    time: "20m ago",
    unread: true,
  },
  {
    title: "Transcript Request",
    desc: "Urgent transcript request submitted by Aarav Sharma",
    time: "1h ago",
    unread: true,
  },
  {
    title: "Exam Schedule",
    desc: "End-semester exam plan needs final confirmation",
    time: "3h ago",
    unread: false,
  },
  {
    title: "Certificate Issued",
    desc: "Migration certificate issued for Priya Patel",
    time: "Yesterday",
    unread: false,
  },
  {
    title: "Enrollment Deadline",
    desc: "Semester enrollment verification deadline is Apr 15",
    time: "2d ago",
    unread: false,
  },
];

const RegistrarNotifications = () => {
  const navigate = useNavigate();

  return (
    <RegistrarLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-5 sm:mb-8 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
              Notifications
            </h1>
          </div>
          <button className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer whitespace-nowrap">
            <Check size={14} className="sm:w-4 sm:h-4" />
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
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E545C] flex-shrink-0"></span>
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
    </RegistrarLayout>
  );
};

export default RegistrarNotifications;
