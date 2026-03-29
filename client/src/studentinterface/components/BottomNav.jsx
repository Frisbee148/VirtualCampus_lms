import React from 'react';
import { Home, Calendar, MessageSquareText, User } from 'lucide-react';

const BottomNav = ({ activeTab = 'home', onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'mentor', icon: MessageSquareText, label: 'AI Mentor' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange && onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-full px-2 py-1 transition-colors ${
                isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={24} className={isActive ? 'stroke-[2.5px]' : 'stroke-2'} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
