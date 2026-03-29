import React from 'react';
import { useNavigate } from 'react-router-dom';
import ParentLayout from '../ParentLayout';

const ParentPerformance = () => {
  const navigate = useNavigate();

  return (
    <ParentLayout activeTab="Performance">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-8 gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course History</h1>
          <button className="px-4 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#0e445b] transition-colors shadow-sm cursor-pointer self-start sm:self-auto">
            Filter by Semester
          </button>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block bg-white border border-gray-100 shadow-sm overflow-hidden mb-10">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Course Name</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Total Marks (out of 100)</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Grade</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Course Type</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-sm font-medium text-gray-900">Course A</td>
                <td className="py-4 px-5 text-sm text-gray-600">85</td>
                <td className="py-4 px-5"><span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">A</span></td>
                <td className="py-4 px-5 text-sm text-gray-500">Core</td>
              </tr>
              <tr className="hover:bg-gray-50/50 transition-colors">
                <td className="py-4 px-5 text-sm font-medium text-gray-600">Course B</td>
                <td className="py-4 px-5 text-sm text-gray-600">72</td>
                <td className="py-4 px-5"><span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">B+</span></td>
                <td className="py-4 px-5 text-sm text-gray-500">Elective</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="sm:hidden space-y-3 mb-6">
          {[
            { name: 'Course A', marks: 85, grade: 'A', gradeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', type: 'Core' },
            { name: 'Course B', marks: 72, grade: 'B+', gradeColor: 'bg-blue-50 text-blue-700 border-blue-200', type: 'Elective' },
          ].map((c, idx) => (
            <div key={idx} className="bg-white border border-gray-100 shadow-sm p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">{c.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-semibold border ${c.gradeColor}`}>{c.grade}</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Marks</p>
                  <p className="text-sm font-semibold text-gray-900">{c.marks}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Type</p>
                  <p className="text-sm text-gray-500">{c.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">CGPA Trend</h2>
          <div className="relative">
            <svg viewBox="0 0 700 280" className="w-full h-auto">
              {[0, 1, 2, 3, 4, 5, 6].map((gridY) => {
                const y = 260 - (gridY * 42);
                return (
                  <g key={gridY}>
                    <line x1="40" y1={y} x2="680" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    <text x="25" y={y + 4} fontSize="11" fill="#94a3b8" textAnchor="end" fontFamily="Inter">{gridY}</text>
                  </g>
                );
              })}
              <line x1="40" y1="8" x2="40" y2="260" stroke="#e2e8f0" strokeWidth="1" />
              <text x="150" y="278" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily="Inter">Sem 1</text>
              <text x="300" y="278" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily="Inter">Sem 2</text>
              <text x="450" y="278" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily="Inter">Sem 3</text>
              <text x="600" y="278" fontSize="11" fill="#94a3b8" textAnchor="middle" fontFamily="Inter">Sem 4</text>
              <polyline points="150,110 300,180 450,140 600,90" fill="none" stroke="black" strokeWidth="2.5" strokeLinejoin="round" />
              {[[150,110],[300,180],[450,140],[600,90]].map(([cx,cy],i) => <rect key={i} x={cx-4} y={cy-4} width="8" height="8" fill="black" stroke="white" strokeWidth="2" />)}
              <polyline points="150,180 300,100 450,200 600,170" fill="none" stroke="#ff7f0e" strokeWidth="2.5" strokeLinejoin="round" />
              {[[150,180],[300,100],[450,200],[600,170]].map(([cx,cy],i) => <rect key={i} x={cx-4} y={cy-4} width="8" height="8" fill="#ff7f0e" stroke="white" strokeWidth="2" />)}
              <polyline points="150,190 300,190 450,160 600,80" fill="none" stroke="#2ca02c" strokeWidth="2.5" strokeLinejoin="round" />
              {[[150,190],[300,190],[450,160],[600,80]].map(([cx,cy],i) => <rect key={i} x={cx-4} y={cy-4} width="8" height="8" fill="#2ca02c" stroke="white" strokeWidth="2" />)}
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500"><span className="w-3 h-0.5 bg-black"></span> SGPA</div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500"><span className="w-3 h-0.5 bg-[#ff7f0e]"></span> CGPA</div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-500"><span className="w-3 h-0.5 bg-[#2ca02c]"></span> Class Avg</div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentPerformance;
