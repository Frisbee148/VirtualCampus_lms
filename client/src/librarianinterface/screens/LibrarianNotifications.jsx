import React, { useState } from "react";
import LibrarianLayout from "../LibrarianLayout";
import { AlertTriangle, BookOpen, Clock, Check } from "lucide-react";

const initialNotifications = [
  { id: 1, type: "overdue", title: "Overdue: Data Structures Using C", message: "Rahul Verma has not returned this book. 7 days overdue.", time: "10 min ago", read: false },
  { id: 2, type: "overdue", title: "Overdue: Linear Algebra", message: "Meera Iyer has not returned this book. 5 days overdue.", time: "10 min ago", read: false },
  { id: 3, type: "reservation", title: "Reservation Request", message: "Karan Singh has reserved 'Database System Concepts'.", time: "1 hr ago", read: false },
  { id: 4, type: "return", title: "Book Returned", message: "Priya Patel returned 'Database System Concepts'.", time: "2 hrs ago", read: true },
  { id: 5, type: "overdue", title: "Overdue: Probability & Statistics", message: "Karan Singh has not returned this book. 3 days overdue.", time: "3 hrs ago", read: true },
  { id: 6, type: "system", title: "System Backup Complete", message: "Library database backup completed successfully.", time: "6 hrs ago", read: true },
  { id: 7, type: "return", title: "Book Returned", message: "Vikram Reddy returned 'Discrete Mathematics'.", time: "1 day ago", read: true },
];

const iconMap = {
  overdue: AlertTriangle,
  reservation: Clock,
  return: BookOpen,
  system: Check,
};

const iconColorMap = {
  overdue: "text-red-500 bg-red-50",
  reservation: "text-blue-500 bg-blue-50",
  return: "text-emerald-500 bg-emerald-50",
  system: "text-gray-500 bg-gray-100",
};

const LibrarianNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <LibrarianLayout>
      <div className="max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notifications</h2>
            <p className="text-sm text-gray-400">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 text-sm font-medium text-[#d97706] bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors w-full sm:w-auto"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-50">
            {notifications.map((n) => {
              const Icon = iconMap[n.type] || Check;
              const colorClass = iconColorMap[n.type] || iconColorMap.system;
              return (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`px-4 sm:px-5 py-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    n.read ? "hover:bg-gray-50/50" : "bg-amber-50/30 hover:bg-amber-50/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg flex-shrink-0 ${colorClass}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${n.read ? "text-gray-700" : "text-gray-800 font-medium"}`}>
                        {n.title}
                      </p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#d97706] flex-shrink-0 mt-1.5"></span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-gray-300 mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No notifications.
            </div>
          )}
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianNotifications;
