import React from 'react';
import StudentLayout from '../StudentLayout';
import { ExternalLink } from 'lucide-react';

const FacultyFeedback = () => {
  const feedbacks = [
    { name: 'Midsem Feedback - DSA', link: '#' },
    { name: 'Quiz 1 Feedback - OS', link: '#' },
    { name: 'Lab Evaluation - Networks', link: '#' },
  ];

  return (
    <StudentLayout activeTab="Feedback">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Faculty Feedback</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Submit feedback forms for your courses</p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5 sm:mb-8">
          <select className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Subject</option>
            <option>Data Structures</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
          </select>
          <select className="w-full sm:flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Professor</option>
            <option>Dr. Teacher 1</option>
            <option>Dr. Teacher 2</option>
          </select>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Feedback Name</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold w-[80px] sm:w-auto">Link</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-gray-900">{f.name}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-5">
                    <button className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-black font-medium hover:underline cursor-pointer">
                      <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5" /> <span className="hidden sm:inline">Open Form</span><span className="sm:hidden">Open</span>
                    </button>
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

export default FacultyFeedback;
