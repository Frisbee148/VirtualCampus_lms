import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ArrowLeft, Check } from 'lucide-react';
import { fetchNotifications, markAllNotificationsRead } from '../../auth/studentApi';

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchNotifications()
      .then((data) => {
        if (!cancelled) setNotifications(data.notifications || []);
      })
      .catch(() => {
        if (!cancelled) setNotifications([]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleMarkAllRead = () => {
    markAllNotificationsRead()
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      })
      .catch(() => {});
  };

  const formatTime = (createdAt) => {
    if (!createdAt) return '';
    const diff = Date.now() - new Date(createdAt).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <StudentLayout activeTab="">
        <div className="max-w-3xl">
          <div className="h-8 w-48 bg-gray-100 mb-6 animate-pulse" />
          <div className="space-y-0">
            {[1,2,3,4,5].map(i => <div key={i} className="h-14 bg-gray-50 border-b border-gray-100 animate-pulse" />)}
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="">
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-5 sm:mb-8 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button onClick={() => navigate(-1)} className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors">
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">Notifications</h1>
          </div>
          <button onClick={handleMarkAllRead} className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer whitespace-nowrap">
            <Check size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Mark all as read</span><span className="sm:hidden">Read all</span>
          </button>
        </div>

        <div className="space-y-0">
          {notifications.map((n, idx) => (
            <div key={n.id || idx} className={`border-b border-gray-100 px-3 sm:px-4 py-3 sm:py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer gap-2 ${!n.is_read ? 'bg-black/[0.02]' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{n.title}</h3>
                  {!n.is_read && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4E545C] flex-shrink-0"></span>}
                </div>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 truncate">{n.description}</p>
              </div>
              <span className="text-[9px] sm:text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5">{formatTime(n.created_at)}</span>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default NotificationsScreen;
