import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../StaffLayout";
import { ArrowLeft, Check } from "lucide-react";

const notificationsData = [
  { id: 1, title: "New enrollment request", detail: "Rahul Verma wants to enroll in MA201 Linear Algebra", time: "5 min ago", read: false },
  { id: 2, title: "Course created", detail: "ME205 Thermodynamics added to Fall 2026 catalog", time: "22 min ago", read: false },
  { id: 3, title: "Enrollment approved", detail: "Batch approval completed — 15 students enrolled in EE101", time: "2h ago", read: false },
  { id: 4, title: "User account flagged", detail: "Sunil Kumar — inactive for 90+ days", time: "3h ago", read: true },
  { id: 5, title: "Announcement delivered", detail: "Mid-semester exam schedule sent to 1,248 users", time: "5h ago", read: true },
  { id: 6, title: "Course instructor assigned", detail: "Prof. Amit Verma assigned to CS405 Machine Learning", time: "1d ago", read: true },
  { id: 7, title: "Enrollment rejected", detail: "Duplicate enrollment — Mohit Gupta already in CS301", time: "1d ago", read: true },
  { id: 8, title: "System update", detail: "Academic term Spring 2026 activated", time: "2d ago", read: true },
];

const StaffNotifications = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(notificationsData);

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <StaffLayout>
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
          <button
            onClick={markAllRead}
            className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer whitespace-nowrap"
          >
            <Check size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Mark all as read</span>
            <span className="sm:hidden">Read all</span>
          </button>
        </div>

        <div className="space-y-0">
          {items.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`border-b border-gray-100 px-3 sm:px-4 py-3 sm:py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer gap-2 ${!n.read ? "bg-black/[0.02]" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3
                    className={`text-xs sm:text-sm font-semibold truncate ${n.read ? "text-gray-700" : "text-gray-900"}`}
                  >
                    {n.title}
                  </h3>
                  {!n.read && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#242424] flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">
                  {n.detail}
                </p>
              </div>
              <span className="text-[9px] sm:text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5">
                {n.time}
              </span>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="px-4 py-12 text-center text-gray-400 text-sm">
            No notifications
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffNotifications;
