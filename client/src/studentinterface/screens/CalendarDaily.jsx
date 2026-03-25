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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Timetable</h1>
            <p className="text-sm text-gray-400 mt-1">Daily schedule</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="px-4 py-2.5 bg-white border border-gray-200 text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors"
              onChange={(e) => { if (e.target.value === 'weekly') navigate('/timetable'); }}
              defaultValue="daily"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-sm font-semibold hover:bg-[#0e445b] transition-colors shadow-sm cursor-pointer">
              <Plus size={16} /> Add Event
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[30%]">Time</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Schedule</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-5 text-sm font-semibold text-gray-500">{s.time}</td>
                  <td className="py-5 px-5">
                    {s.event ? (
                      <div>
                        <p className="text-sm font-medium text-gray-900">{s.event}</p>
                        {s.room && <p className="text-xs text-gray-400 mt-0.5">{s.room}</p>}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-300 italic">No event scheduled</span>
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
