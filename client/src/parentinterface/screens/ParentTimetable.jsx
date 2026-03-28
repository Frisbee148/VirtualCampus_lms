import React from 'react';
import ParentLayout from '../ParentLayout';

const ParentTimetable = () => {
  const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const events = [
    { day: 0, start: 0, dur: 3, title: 'UX 1 Assignment', time: '8-11am', color: 'bg-indigo-400' },
    { day: 0, start: 3, dur: 3, title: 'UX 2 Assignment', time: '11am-2pm', color: 'bg-emerald-500' },
    { day: 0, start: 6, dur: 2, title: 'Workout + Lunch', time: '2-4pm', color: 'bg-red-500' },
    { day: 0, start: 8, dur: 2, title: 'Booklab Assignment', time: '4-6pm', color: 'bg-amber-500' },
    { day: 1, start: 0, dur: 1, title: 'Messaging Matrix', time: '8-9am', color: 'bg-red-500' },
    { day: 1, start: 1, dur: 1, title: 'Marketing Workload', time: '9-10am', color: 'bg-emerald-500' },
    { day: 1, start: 3, dur: 2, title: 'Portfolio Dev', time: '11am-12:30pm', color: 'bg-sky-500' },
    { day: 1, start: 5, dur: 2, title: 'Call David', time: '1-2:30pm', color: 'bg-orange-500' },
    { day: 1, start: 7, dur: 3, title: 'Taylor House Call', time: '3-6pm', color: 'bg-amber-400' },
    { day: 2, start: 0, dur: 1, title: 'Workload Mgmt', time: '8-9am', color: 'bg-purple-600' },
    { day: 2, start: 1, dur: 2, title: 'Portfolio Due Reminder', time: '9-11am', color: 'bg-orange-500' },
    { day: 2, start: 3, dur: 1, title: 'Brand Design', time: '11am-12pm', color: 'bg-emerald-500' },
    { day: 2, start: 4, dur: 4, title: 'UX3 Project', time: '12-4pm', color: 'bg-amber-400' },
    { day: 2, start: 8, dur: 2, title: 'Booklab', time: '4-6pm', color: 'bg-amber-500' },
    { day: 3, start: 0.5, dur: 1, title: 'Get ready + Commute', time: '8:30-9:30', color: 'bg-emerald-500' },
    { day: 3, start: 2, dur: 2, title: 'Print + Prep Brand 4', time: '10-12pm', color: 'bg-orange-500' },
    { day: 3, start: 5, dur: 3, title: 'Brand Design 4', time: '1-4pm', color: 'bg-amber-400' },
    { day: 3, start: 8, dur: 2, title: 'Climb', time: '4-6pm', color: 'bg-teal-600' },
    { day: 4, start: 0, dur: 1.5, title: 'Leeds Content Dev', time: '8-9:30', color: 'bg-red-500' },
    { day: 4, start: 1.5, dur: 1, title: 'BBW', time: '9:30-10:30', color: 'bg-teal-600' },
    { day: 4, start: 4, dur: 2, title: 'Hold for Tracy', time: '12-2pm', color: 'bg-orange-500' },
    { day: 4, start: 6, dur: 2, title: 'CU Grad Pages', time: '2-4pm', color: 'bg-sky-500' },
    { day: 4, start: 8, dur: 2, title: 'Re:Studio', time: '4-6pm', color: 'bg-stone-600' },
  ];

  const cellHSm = 56;

  return (
    <ParentLayout activeTab="Timetable">
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Timetable</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Your ward's weekly schedule</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-[40px_repeat(5,1fr)] sm:grid-cols-[60px_repeat(5,1fr)] border-b border-gray-100">
              <div className="py-2 sm:py-3 text-center text-[8px] sm:text-[10px] font-semibold text-gray-300 uppercase">Time</div>
              {days.map(d => (
                <div key={d} className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider border-l border-gray-50">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-[40px_repeat(5,1fr)] sm:grid-cols-[60px_repeat(5,1fr)] relative" style={{ height: `${hours.length * cellHSm}px` }}>
              <div className="relative">
                {hours.map((hr, idx) => (
                  <div key={idx} className="absolute w-full text-right pr-1 sm:pr-2" style={{ top: `${idx * cellHSm - 7}px` }}>
                    <span className="text-[8px] sm:text-[10px] font-medium text-gray-400">{hr}</span>
                  </div>
                ))}
              </div>
              {days.map((_, dayIdx) => (
                <div key={dayIdx} className="relative border-l border-gray-50">
                  {hours.map((_, hIdx) => (
                    <div key={hIdx} className="absolute w-full h-px bg-gray-50" style={{ top: `${hIdx * cellHSm}px` }}></div>
                  ))}
                  {events.filter(e => e.day === dayIdx).map((ev, i) => (
                    <div
                      key={i}
                      className={`absolute left-0.5 right-0.5 sm:left-1 sm:right-1 ${ev.color} text-white px-1 sm:px-2 py-1 sm:py-1.5 overflow-hidden shadow-sm`}
                      style={{ top: `${ev.start * cellHSm}px`, height: `${ev.dur * cellHSm - 4}px` }}
                    >
                      <p className="text-[8px] sm:text-[10px] font-bold truncate leading-tight">{ev.title}</p>
                      <p className="text-[7px] sm:text-[9px] opacity-80 mt-0.5 hidden sm:block">{ev.time}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ParentLayout>
  );
};

export default ParentTimetable;
