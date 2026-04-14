import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ExternalLink } from 'lucide-react';

export const CourseTabs = ({ active = 'overview' }) => {
  const navigate = useNavigate();
  const tabs = [
    { id: 'overview', label: 'Overview', path: '/course/overview' },
    { id: 'attendance', label: 'Attendance', path: '/course/attendance' },
    { id: 'faculties', label: 'Faculties', path: '/course/faculties' }
  ];

  return (
    <div className="flex gap-0 sm:gap-2 mb-5 sm:mb-8 border-b border-gray-200 pb-0 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className={`px-3 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
            active === tab.id 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const CourseOverview = () => {
  const navigate = useNavigate();

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ABC Course</h1>
        
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8 mt-3 sm:mt-4">
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-semibold border border-emerald-200">Elective</span>
          <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-blue-50 text-[#242424] text-xs sm:text-sm font-semibold border border-blue-200">Semester 3</span>
        </div>

        <CourseTabs active="overview" />

        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-3 sm:px-5 py-1.5 sm:py-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs sm:text-sm font-semibold">
            Total Weightage: 100
          </span>
        </div>

        {/* Mobile: card layout; Desktop: table layout */}
        <div className="hidden sm:block bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#242424] text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Evaluation Criteria</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Weightage</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Your Score</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Feedback Form</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Class Average</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-sm font-medium text-gray-900">Quiz 1</td>
                <td className="py-4 px-5 text-sm text-gray-600">10</td>
                <td className="py-4 px-5 text-sm font-semibold text-gray-900">8</td>
                <td className="py-4 px-5">
                  <button onClick={() => navigate('/feedback')} className="inline-flex items-center gap-1.5 text-sm text-black font-medium hover:underline cursor-pointer">
                    <ExternalLink size={14} /> Open
                  </button>
                </td>
                <td className="py-4 px-5 text-sm text-gray-500">7</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-sm font-medium text-gray-900">Midsem</td>
                <td className="py-4 px-5 text-sm text-gray-600">30</td>
                <td className="py-4 px-5 text-sm font-semibold text-gray-900">25</td>
                <td className="py-4 px-5">
                  <button onClick={() => navigate('/feedback')} className="inline-flex items-center gap-1.5 text-sm text-black font-medium hover:underline cursor-pointer">
                    <ExternalLink size={14} /> Open
                  </button>
                </td>
                <td className="py-4 px-5 text-sm text-gray-500">23</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="sm:hidden space-y-3">
          {[
            { criteria: 'Quiz 1', weight: 10, score: 8, avg: 7 },
            { criteria: 'Midsem', weight: 30, score: 25, avg: 23 },
          ].map((row, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">{row.criteria}</h3>
                <button onClick={() => navigate('/feedback')} className="inline-flex items-center gap-1 text-xs text-black font-medium hover:underline cursor-pointer">
                  <ExternalLink size={12} /> Feedback
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Weightage</p>
                  <p className="text-sm font-semibold text-gray-900">{row.weight}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Score</p>
                  <p className="text-sm font-semibold text-gray-900">{row.score}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Class Avg</p>
                  <p className="text-sm font-semibold text-gray-500">{row.avg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseOverview;
