import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";

const notifications = [
  {
    title: "Server CPU Alert",
    desc: "CPU usage crossed 85% threshold on app-server-02",
    time: "5m ago",
    unread: true,
  },
  {
    title: "Failed Login Attempts",
    desc: "Multiple failed login attempts detected from an unknown IP",
    time: "28m ago",
    unread: true,
  },
  {
    title: "Backup Completed",
    desc: "Nightly database backup completed successfully",
    time: "2h ago",
    unread: false,
  },
  {
    title: "Bulk User Import",
    desc: "142 users were created via CSV import",
    time: "Yesterday",
    unread: false,
  },
  {
    title: "Certificate Renewal",
    desc: "SSL certificate for campus portal expires in 15 days",
    time: "2d ago",
    unread: false,
  },
];

const AdminNotifications = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default AdminNotifications;
