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
    <div className="flex gap-2 mb-8 border-b border-gray-200 pb-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => navigate(tab.path)}
          className={`px-6 py-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ABC Course</h1>
        
        <div className="flex gap-3 mb-8 mt-4">
          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold border border-emerald-200">Elective</span>
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200">Semester 3</span>
        </div>

        <CourseTabs active="overview" />

        <div className="mb-6">
          <span className="inline-block px-5 py-2 bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold">
            Total Weightage: 100
          </span>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
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
      </div>
    </StudentLayout>
  );
};

export default CourseOverview;
