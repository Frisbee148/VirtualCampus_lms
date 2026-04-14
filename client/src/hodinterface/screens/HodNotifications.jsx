import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import HodLayout from "../HodLayout";

const initialNotifications = [
  { title: "Leave Request", desc: "Prof. Suresh Iyer submitted medical leave request — 5 days", time: "2h ago", unread: true },
  { title: "At-Risk Alert", desc: "3 new students flagged across CS301 and CS201", time: "4h ago", unread: true },
  { title: "Budget Approval Needed", desc: "Dr. Farah Khan — Lab equipment Rs. 45,000", time: "1d ago", unread: true },
  { title: "NAAC Deadline", desc: "Accreditation documents due April 25", time: "1d ago", unread: false },
  { title: "Faculty Meeting", desc: "Department meeting scheduled Friday 4:00 PM", time: "2d ago", unread: false },
  { title: "Course Feedback", desc: "Student feedback reports available for CS501", time: "3d ago", unread: false },
  { title: "New Faculty Joined", desc: "Dr. Ananya Desai joined as Assistant Professor", time: "1w ago", unread: false },
  { title: "Exam Schedule", desc: "Mid-semester exam schedule published by registrar", time: "1w ago", unread: false },
];

const HodNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markRead = (idx) => {
    setNotifications((prev) => prev.map((n, i) => (i === idx ? { ...n, unread: false } : n)));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <HodLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-5 sm:mb-8 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button onClick={() => navigate(-1)} className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors">
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
            </div>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer whitespace-nowrap">
              <Check size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Mark all as read</span>
              <span className="sm:hidden">Read all</span>
            </button>
          )}
        </div>

        <div className="space-y-0">
          {notifications.map((n, idx) => (
            <div
              key={idx}
              onClick={() => markRead(idx)}
              className={`border-b border-gray-100 px-3 sm:px-4 py-3 sm:py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer gap-2 ${n.unread ? "bg-black/[0.02]" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{n.title}</h3>
                  {n.unread && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black flex-shrink-0"></span>}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{n.desc}</p>
              </div>
              <span className="text-[9px] sm:text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </HodLayout>
  );
};

export default HodNotifications;
