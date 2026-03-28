import React from 'react';
import ParentLayout from '../ParentLayout';
import { Plus } from 'lucide-react';

const ParentCalendar = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysOfWeekFull = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const colors = {
    red: 'bg-red-100 text-red-700 border-red-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
    green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
  };

  const calendarCells = [
    { date: '', event: null }, { date: '', event: null }, { date: '', event: null },
    { date: '1', event: null }, { date: '2', event: null },
    { date: '3', event: { title: 'Rent Due', style: colors.yellow } },
    { date: '4', event: null },
    { date: '5', event: null }, { date: '6', event: null },
    { date: '7', event: { title: 'Internet bill due', style: colors.red } },
    { date: '8', event: null },
    { date: '9', event: { title: 'Phone bill due', style: colors.pink } },
    { date: '10', event: null },
    { date: '11', event: { title: "Lisa's birthday", style: colors.purple } },
    { date: '12', event: null },
    { date: '13', event: { title: 'Mum Arrives', style: colors.green } },
    { date: '14', event: null },
    { date: '15', event: { title: 'Water bill due', style: colors.cyan } },
    { date: '16', event: null },
    { date: '17', event: { title: 'Rent Due', style: colors.yellow } },
    { date: '18', event: null },
    { date: '19', event: { title: 'Mum Departs', style: colors.green } },
    { date: '20', event: null },
    { date: '21', event: { title: 'Lunch with Kim', style: colors.orange } },
    { date: '22', event: null }, { date: '23', event: null },
    { date: '24', event: { title: 'Trivia night', style: colors.cyan } },
    { date: '25', event: null },
    { date: '26', event: null }, { date: '27', event: null }, { date: '28', event: null },
    { date: '29', event: null }, { date: '30', event: null },
    { date: '31', event: { title: 'Rent Due', style: colors.yellow } },
    { date: '', event: null }
  ];

  return (
    <ParentLayout activeTab="Calendar">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-5 sm:mb-8 gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">September</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Monthly calendar</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span className="sm:hidden">{day}</span>
                <span className="hidden sm:inline">{daysOfWeekFull[idx]}</span>
              </div>
            ))}
          </div>
          {[0, 1, 2, 3, 4].map((rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-7 border-b border-gray-50 last:border-b-0">
              {[0, 1, 2, 3, 4, 5, 6].map((colIdx) => {
                const cell = calendarCells[rowIdx * 7 + colIdx];
                return (
                  <div key={colIdx} className="min-h-[50px] sm:min-h-[90px] p-1 sm:p-2 border-r border-gray-50 last:border-r-0 hover:bg-gray-50/50 transition-colors">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-400 block mb-0.5 sm:mb-1">{cell.date}</span>
                    {cell.event && (
                      <div className={`text-[8px] sm:text-[11px] font-semibold px-1 sm:px-2 py-0.5 sm:py-1 border ${cell.event.style} truncate`}>
                        {cell.event.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentCalendar;
