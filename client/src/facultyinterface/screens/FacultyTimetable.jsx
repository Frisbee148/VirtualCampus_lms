import React from 'react';
import FacultyLayout from '../FacultyLayout';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SLOTS = ['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00'];

const timetable = {
  Monday:    { '9:00': 'CS301 — L1', '11:00': 'CS405 — L3', '2:00': 'CS301 Lab — Lab1' },
  Tuesday:   { '10:00': 'CS301 — L1', '1:00': 'CS405 — L2' },
  Wednesday: { '9:00': 'CS405 — L3', '11:00': 'CS301 — L1', '3:00': 'Office Hours' },
  Thursday:  { '10:00': 'CS301 — L1', '2:00': 'CS405 Lab — Lab2' },
  Friday:    { '9:00': 'CS301 — L1', '11:00': 'CS405 — L3' },
};

const slotColors = {
  'CS301': 'bg-[#4E545C] text-white',
  'CS405': 'bg-[#e8a435] text-white',
  'Office': 'bg-gray-600 text-white',
};

const getSlotStyle = (text) => {
  if (!text) return '';
  for (const key in slotColors) {
    if (text.startsWith(key)) return slotColors[key];
  }
  return 'bg-[#4E545C]/80 text-white';
};

const FacultyTimetable = () => {
  return (
    <FacultyLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Timetable</h2>

        <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
          <table className="w-full border-collapse text-[10px] sm:text-sm min-w-[480px] sm:min-w-[640px]">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="text-left px-1.5 sm:px-3 py-2 sm:py-3 font-semibold w-[50px] sm:w-[80px]">Time</th>
                {DAYS.map((d) => (
                  <th key={d} className="text-left px-1.5 sm:px-3 py-2 sm:py-3 font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot, idx) => (
                <tr key={slot} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-1.5 sm:px-3 py-2 sm:py-4 font-medium text-gray-500 border-r border-gray-200">{slot}</td>
                  {DAYS.map((day) => {
                    const entry = timetable[day]?.[slot];
                    return (
                      <td key={day} className="px-1 sm:px-2 py-1 sm:py-2 border-r border-gray-100">
                        {entry && (
                          <div className={`px-1.5 sm:px-2.5 py-1 sm:py-2 text-[9px] sm:text-xs font-medium ${getSlotStyle(entry)}`}>
                            {entry}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-5">
          {[
            { label: 'CS301', color: 'bg-[#4E545C]' },
            { label: 'CS405', color: 'bg-[#e8a435]' },
            { label: 'Office Hours', color: 'bg-gray-600' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className={`w-3 h-3 ${item.color}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </FacultyLayout>
  );
};

export default FacultyTimetable;
