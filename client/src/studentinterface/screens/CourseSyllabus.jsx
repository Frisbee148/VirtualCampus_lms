import React, { useState } from 'react';
import StudentLayout from '../StudentLayout';
import { CourseTabs } from './CourseOverview';
import { Check } from 'lucide-react';

const CourseSyllabus = () => {
  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const units = [
    { unit: '1', subs: ['1.1', '1.2'] },
    { unit: '2', subs: ['2.1'] },
    { unit: '3', subs: ['3.1'] },
  ];

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ABC Course</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Track syllabus completion</p>
        <CourseTabs active="overview" />

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-center text-xs sm:text-sm font-semibold w-1/4">Unit</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-center text-xs sm:text-sm font-semibold w-1/2">Sub-unit</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-center text-xs sm:text-sm font-semibold w-1/4">Done</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) =>
                u.subs.map((sub, si) => {
                  const key = `${u.unit}-${sub}`;
                  return (
                    <tr key={key} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      {si === 0 && (
                        <td className="py-3 sm:py-4 px-3 sm:px-5 text-center text-xs sm:text-sm font-bold text-gray-900" rowSpan={u.subs.length}>
                          Unit {u.unit}
                        </td>
                      )}
                      <td className="py-3 sm:py-4 px-3 sm:px-5 text-center text-xs sm:text-sm text-gray-600">{sub}</td>
                      <td className="py-3 sm:py-4 px-3 sm:px-5 text-center">
                        <button
                          onClick={() => toggle(key)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 border-2 flex items-center justify-center mx-auto cursor-pointer transition-all duration-200 ${
                            checked[key]
                              ? 'bg-[#4E545C] border-black text-white shadow-sm'
                              : 'border-gray-300 text-transparent hover:border-black/50'
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseSyllabus;
