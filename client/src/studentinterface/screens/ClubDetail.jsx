import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';

const ClubDetail = () => {
  const navigate = useNavigate();
  const members = [
    { name: 'Alice M.', role: 'Coordinator', initials: 'AM' },
    { name: 'Bob K.', role: 'Member', initials: 'BK' },
    { name: 'Charlie N.', role: 'Member', initials: 'CN' },
  ];

  return (
    <StudentLayout activeTab="Community">
      <div className="max-w-5xl">
        <button onClick={() => navigate('/community')} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-gray-600 mb-4 sm:mb-6 cursor-pointer transition-colors">
          <ArrowLeft size={14} className="sm:w-4 sm:h-4" /> Back to Community
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Coding Club</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">A community of passionate programmers building cool projects together.</p>

        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Upcoming Events</h2>
        <div className="bg-white border border-gray-200 overflow-hidden mb-6 sm:mb-10">
          <table className="w-full">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Event Name</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Date</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Links</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-gray-900">Hackathon 2024</td>
                <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm text-gray-500">Nov 20, 2024</td>
                <td className="py-3 sm:py-4 px-3 sm:px-5">
                  <button className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer"><LinkIcon size={12} className="sm:w-3.5 sm:h-3.5" /> Register</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Members</h2>
        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-2.5 sm:py-3 px-3 sm:px-5 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-5 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-xs sm:text-sm font-medium text-gray-900">{m.name}</td>
                  <td className="py-2.5 sm:py-3.5 px-3 sm:px-5">
                    <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold border ${
                      m.role === 'Coordinator' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'
                    }`}>{m.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ClubDetail;
