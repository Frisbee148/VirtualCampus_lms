import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ArrowLeft, Check } from 'lucide-react';

const NotificationsScreen = () => {
  const navigate = useNavigate();
  const notifications = [
    { title: 'Quiz 1 - DSA', desc: 'Scheduled for Oct 25 at 10:00 AM', time: '2h ago', unread: true },
    { title: 'New Assignment - OS Lab', desc: 'Submission deadline: Oct 28', time: '5h ago', unread: true },
    { title: 'Attendance Warning', desc: 'Your attendance in Networks is 75%', time: '1d ago', unread: false },
    { title: 'New Upload - DSA Notes', desc: 'Chapter 5: Dynamic Programming uploaded', time: '2d ago', unread: false },
    { title: 'Admin Circular', desc: 'Winter break schedule has been announced', time: '3d ago', unread: false },
  ];

  return (
    <StudentLayout activeTab="">
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 text-gray-400 cursor-pointer transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button className="flex items-center gap-2 text-sm text-black font-medium hover:underline cursor-pointer">
            <Check size={16} /> Mark all as read
          </button>
        </div>

        <div className="space-y-0">
          {notifications.map((n, idx) => (
            <div key={idx} className={`border-b border-gray-100 px-4 py-4 flex items-start justify-between hover:bg-gray-50/50 transition-colors cursor-pointer ${n.unread ? 'bg-black/[0.02]' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-900">{n.title}</h3>
                  {n.unread && <span className="w-2 h-2 bg-black flex-shrink-0"></span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
              </div>
              <span className="text-[11px] text-gray-300 font-medium flex-shrink-0 mt-0.5 ml-4">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default NotificationsScreen;
