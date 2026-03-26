import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../StudentLayout';
import { Plus } from 'lucide-react';

const CalendarDaily = () => {
  const navigate = useNavigate();
  const schedule = [
    { time: '9:00 AM', event: 'Data Structures Lecture', room: 'Room 201' },
    { time: '10:30 AM', event: 'Operating Systems Lab', room: 'Lab 3' },
    { time: '12:00 PM', event: 'Lunch Break', room: '' },
    { time: '1:30 PM', event: 'Algorithm Design', room: 'Room 305' },
    { time: '3:00 PM', event: 'Project Discussion', room: 'Meeting Room A' },
    { time: '4:30 PM', event: '', room: '' },
  ];

  return (
    <StudentLayout activeTab="Timetable">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-8 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Timetable</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Daily schedule</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors"
              onChange={(e) => { if (e.target.value === 'weekly') navigate('/timetable'); }}
              defaultValue="daily"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#0e445b] transition-colors shadow-sm cursor-pointer">
              <Plus size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Add Event</span><span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold w-[30%]">Time</th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">Schedule</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 sm:py-5 px-3 sm:px-5 text-xs sm:text-sm font-semibold text-gray-500">{s.time}</td>
                  <td className="py-3 sm:py-5 px-3 sm:px-5">
                    {s.event ? (
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-900">{s.event}</p>
                        {s.room && <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{s.room}</p>}
                      </div>
                    ) : (
                      <span className="text-[10px] sm:text-xs text-gray-300 italic">No event scheduled</span>
                    )}
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

export default CalendarDaily;
