import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, UserCircle, Menu, X } from 'lucide-react';

const notifications = [
  { id: 1, text: 'Aarav Sharma attendance dropped below 60%', time: '10 min ago', unread: true },
  { id: 2, text: 'CS301 Quiz 1 grading deadline tomorrow', time: '1 hr ago', unread: true },
  { id: 3, text: 'New feedback submitted by Priya Patel', time: '3 hrs ago', unread: false },
  { id: 4, text: 'Faculty meeting scheduled for March 30', time: 'Yesterday', unread: false },
  { id: 5, text: 'Semester exam schedule published', time: '2 days ago', unread: false },
];

const FacultyTopHeader = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const panelRef = useRef(null);

  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    if (notifOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [notifOpen]);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-[#f8f9fa]/80 backdrop-blur-md border-b border-gray-100">
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 text-gray-500 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
      >
        <Menu size={22} strokeWidth={1.8} />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Notification bell */}
        <div className="relative" ref={panelRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 sm:p-2.5 text-gray-400 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
          >
            <Bell size={20} strokeWidth={1.8} className="sm:w-[22px] sm:h-[22px]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 ring-2 ring-[#f8f9fa]"></span>
            )}
          </button>

          {/* Dropdown panel */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-[320px] max-w-[320px] bg-white border border-gray-200 shadow-xl z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-[#1a7a7a] hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {items.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 border-b border-gray-50 last:border-b-0 ${
                      n.unread ? 'bg-[#1a7a7a]/[0.04]' : ''
                    }`}
                  >
                    <div className="flex gap-2">
                      {n.unread && (
                        <span className="mt-1.5 w-2 h-2 bg-[#1a7a7a] rounded-full shrink-0" />
                      )}
                      <div className={!n.unread ? 'pl-4' : ''}>
                        <p className="text-sm text-gray-700 leading-snug">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile icon */}
        <button
          onClick={() => navigate('/faculty/profile')}
          className="p-1.5 sm:p-2 text-gray-400 hover:text-black hover:bg-black/5 transition-all duration-200 cursor-pointer"
        >
          <UserCircle size={24} strokeWidth={1.5} className="sm:w-[26px] sm:h-[26px]" />
        </button>
      </div>
    </header>
  );
};

export default FacultyTopHeader;
