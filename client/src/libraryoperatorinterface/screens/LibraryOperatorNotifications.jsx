import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { ArrowLeft, Check } from "lucide-react";

const initialNotifications = [
  { id: 1, title: "Book Issued", message: "Data Structures Using C issued to Rahul Verma.", time: "10 min ago", read: false },
  { id: 2, title: "Book Returned", message: "Discrete Mathematics returned by Priya Patel.", time: "1 hr ago", read: false },
  { id: 3, title: "Fine Paid", message: "Late fee of ₹50 collected from Amit Singh.", time: "2 hrs ago", read: false },
  { id: 4, title: "Book Renewed", message: "Database System Concepts renewed for Karan Singh.", time: "3 hrs ago", read: true },
  { id: 5, title: "System Update", message: "Library management software updated successfully.", time: "1 day ago", read: true },
];

const LibraryOperatorNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <LibraryOperatorLayout>
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
          {notifications.map((n) => (
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
                  {n.message}
                </p>
              </div>
              <span className="text-[9px] sm:text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5">
                {n.time}
              </span>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No notifications.
          </div>
        )}
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorNotifications;
