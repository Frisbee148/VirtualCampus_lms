import React, { useState } from "react";
import StaffLayout from "../StaffLayout";
import { Check, CheckCheck } from "lucide-react";

const notifications = [
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
  const [items, setItems] = useState(notifications);

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <StaffLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Notifications</h2>
            <p className="text-sm text-gray-400">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
          )}
        </div>

        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="divide-y divide-gray-50">
            {items.map((n) => (
              <div
                key={n.id}
                className={`px-4 sm:px-5 py-4 transition-colors ${n.read ? "" : "bg-blue-50/30"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      {!n.read && <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />}
                      <h4 className={`text-xs font-medium ${n.read ? "text-gray-600" : "text-gray-800"}`}>{n.title}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.detail}</p>
                  </div>
                  <span className="text-[10px] text-gray-300 flex-shrink-0">{n.time}</span>
                </div>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-400">No notifications</p>
            </div>
          )}
        </div>
      </div>
    </StaffLayout>
  );
};

export default StaffNotifications;
