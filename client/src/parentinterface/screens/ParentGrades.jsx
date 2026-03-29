import React, { useState } from 'react';
import ParentLayout from '../ParentLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ParentGrades = () => {
  const [expanded, setExpanded] = useState(null);

  const courses = [
    { name: 'ABC Course', total: 56, avg: 50, grade: 'B', exams: [{ name: 'Quiz 1 (max: 10)', score: 8 }, { name: 'Midsem (max: 30)', score: 25 }, { name: 'Assignment (max: 20)', score: 13 }, { name: 'Endsem (max: 40)', score: 10 }] },
    { name: 'DEF Course', total: 78, avg: 65, grade: 'A-', exams: [{ name: 'Quiz 1 (max: 15)', score: 12 }, { name: 'Midsem (max: 35)', score: 28 }, { name: 'Endsem (max: 50)', score: 38 }] },
  ];

  return (
    <ParentLayout activeTab="Grades">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Grades</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Session 2024-25 II</p>

        <div className="inline-block px-3 sm:px-5 py-1.5 sm:py-2 bg-black text-white text-xs sm:text-sm font-semibold mb-5 sm:mb-8 shadow-sm">
          Session - 2024-25 II
        </div>

        <div className="space-y-3">
          {courses.map((c, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              <div 
                className="flex items-center justify-between px-3 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-gray-50/50 transition-colors gap-2"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-1 flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-semibold text-gray-900">{c.name}</span>
                  <span className="text-[10px] sm:text-sm text-gray-500">Total: <b className="text-gray-900">{c.total}</b></span>
                  <span className="text-[10px] sm:text-sm text-gray-500">Avg: <b className="text-gray-900">{c.avg}</b></span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-blue-700">{c.grade}</span>
                  {expanded === idx ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>
              {expanded === idx && (
                <div className="border-t border-gray-100 bg-gray-50/30">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-0">
                    {c.exams.map((ex, i) => (
                      <div key={i} className="p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-b-0 sm:last:border-r-0 flex items-center justify-between sm:block">
                        <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium sm:mb-1 leading-snug">{ex.name}</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">{ex.score}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentGrades;
