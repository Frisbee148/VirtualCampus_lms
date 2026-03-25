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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Feedback</h1>
        <p className="text-sm text-gray-400 mb-8">Submit feedback forms for your courses</p>

        <div className="flex gap-4 mb-8">
          <select className="flex-1 px-4 py-3 bg-white border border-gray-200 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Subject</option>
            <option>Data Structures</option>
            <option>Operating Systems</option>
            <option>Computer Networks</option>
          </select>
          <select className="flex-1 px-4 py-3 bg-white border border-gray-200 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors">
            <option>Select Professor</option>
            <option>Dr. Teacher 1</option>
            <option>Dr. Teacher 2</option>
          </select>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[70%]">Feedback Name</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Link</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-medium text-gray-900">{f.name}</td>
                  <td className="py-4 px-5">
                    <button className="inline-flex items-center gap-1.5 text-sm text-black font-medium hover:underline cursor-pointer">
                      <ExternalLink size={14} /> Open Form
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
