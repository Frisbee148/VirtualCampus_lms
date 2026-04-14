import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import DirectorLayout from "../DirectorLayout";

const notifications = [
  {
    title: "Approval Pending",
    desc: "AI/ML Lab equipment purchase is waiting for your approval",
    time: "15m ago",
    unread: true,
  },
  {
    title: "Budget Submission",
    desc: "Annual budget report submitted by Finance Department",
    time: "1h ago",
    unread: true,
  },
  {
    title: "Accreditation Meeting",
    desc: "Review meeting scheduled for April 15 at 11:00 AM",
    time: "3h ago",
    unread: false,
  },
  {
    title: "Placement Update",
    desc: "Campus placement rate updated to 92%",
    time: "Yesterday",
    unread: false,
  },
  {
    title: "Board Minutes",
    desc: "Board of Governors meeting minutes uploaded",
    time: "2d ago",
    unread: false,
  },
];

const DirectorNotifications = () => {
  const navigate = useNavigate();

  return (
    <DirectorLayout>
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
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#242424] flex-shrink-0"></span>
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
    </DirectorLayout>
  );
};

export default DirectorNotifications;
