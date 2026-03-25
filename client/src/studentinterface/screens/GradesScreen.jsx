import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { ChevronDown, ChevronUp } from 'lucide-react';

const GradesScreen = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const courses = [
    { name: 'ABC Course', total: 56, avg: 50, grade: 'B', exams: [{ name: 'Quiz 1 (max: 10)', score: 8 }, { name: 'Midsem (max: 30)', score: 25 }, { name: 'Assignment (max: 20)', score: 13 }, { name: 'Endsem (max: 40)', score: 10 }] },
    { name: 'DEF Course', total: 78, avg: 65, grade: 'A-', exams: [{ name: 'Quiz 1 (max: 15)', score: 12 }, { name: 'Midsem (max: 35)', score: 28 }, { name: 'Endsem (max: 50)', score: 38 }] },
  ];

  return (
    <StudentLayout activeTab="Grades">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Grades</h1>
        <p className="text-sm text-gray-400 mb-8">Session 2024-25 II</p>

        <div className="inline-block px-5 py-2 bg-black text-white text-sm font-semibold mb-8 shadow-sm">
          Session - 2024-25 II
        </div>

        <div className="space-y-3">
          {courses.map((c, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm overflow-hidden">
              <div 
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <div className="flex items-center gap-5 flex-1">
                  <span className="text-sm font-semibold text-black hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate('/course/overview'); }}>{c.name}</span>
                  <span className="text-sm text-gray-500">Total: <b className="text-gray-900">{c.total}</b></span>
                  <span className="text-sm text-gray-500">Avg: <b className="text-gray-900">{c.avg}</b></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-blue-700">{c.grade}</span>
                  {expanded === idx ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </div>
              </div>
              {expanded === idx && (
                <div className="border-t border-gray-100 bg-gray-50/30">
                  <div className="grid grid-cols-4 gap-0">
                    {c.exams.map((ex, i) => (
                      <div key={i} className="p-4 border-r border-gray-100 last:border-r-0">
                        <p className="text-[11px] text-gray-400 font-medium mb-1">{ex.name}</p>
                        <p className="text-xl font-bold text-gray-900">{ex.score}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default GradesScreen;
