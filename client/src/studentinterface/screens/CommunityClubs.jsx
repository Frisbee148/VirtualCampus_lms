import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ChevronRight } from 'lucide-react';

const CommunityClubs = () => {
  const navigate = useNavigate();
  const clubs = [
    { name: 'Coding Club', role: 'Member', members: 45 },
    { name: 'Photography Club', role: 'Coordinator', members: 32 },
    { name: 'Robotics Club', role: 'Member', members: 28 },
  ];

  return (
    <StudentLayout activeTab="Community">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Your clubs and organizations</p>

        <div className="bg-white border border-gray-200 overflow-hidden">
          {clubs.map((c, idx) => (
            <div 
              key={idx}
              onClick={() => navigate('/community/club')}
              className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer group gap-2"
            >
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900">{c.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{c.members} members</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold border ${
                  c.role === 'Coordinator' 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>{c.role}</span>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors sm:w-4 sm:h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default CommunityClubs;
