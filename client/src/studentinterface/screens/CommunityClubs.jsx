import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ChevronRight } from 'lucide-react';
import { fetchClubs } from '../../auth/studentApi';

const CommunityClubs = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchClubs()
      .then((data) => { if (!cancelled) setClubs(data.clubs || []); })
      .catch(() => { if (!cancelled) setClubs([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <StudentLayout activeTab="Community">
        <div className="max-w-5xl">
          <div className="h-8 w-40 bg-gray-100 mb-6 animate-pulse" />
          <div className="bg-white border border-gray-200 overflow-hidden">
            {[1,2,3].map(i => <div key={i} className="h-16 border-b border-gray-100 animate-pulse" />)}
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Community">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Community</h1>
            <p className="text-xs sm:text-sm text-gray-400">Your clubs and organizations</p>
          </div>
          <button className="px-3 sm:px-4 py-2 bg-[#4E545C] text-white text-[11px] sm:text-xs font-semibold shadow-sm hover:bg-[#62686f] transition-colors whitespace-nowrap">
            Request Join
          </button>
        </div>
        <div className="bg-white border border-gray-200 overflow-hidden">
          {clubs.map((c, idx) => (
            <div
              key={c.id || idx}
              onClick={() => navigate(`/community/club?id=${c.id}`)}
              className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors cursor-pointer group gap-2"
            >
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900">{c.name}</h3>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{c.member_count} members</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold border ${c.role === 'Coordinator'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                  }`}>{c.role || 'Member'}</span>
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
