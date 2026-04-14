import React from "react";
import HodLayout from "../HodLayout";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const SLOTS = ["9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00"];

const timetable = {
  Monday: { "9:00": "Dept Meeting", "11:00": "CS501 — L2", "3:00": "Faculty Review" },
  Tuesday: { "10:00": "CS701 — Seminar Hall", "2:00": "Office Hours" },
  Wednesday: { "9:00": "CS501 — L2", "11:00": "Board Prep", "3:00": "Office Hours" },
  Thursday: { "10:00": "CS701 — Seminar Hall", "1:00": "PhD Committee", "3:00": "Faculty 1:1s" },
  Friday: { "9:00": "CS501 — L2", "11:00": "Dept Seminar", "2:00": "Office Hours" },
};

const slotColors = {
  CS501: "bg-[#242424] text-white",
  CS701: "bg-[#e8a435] text-white",
  Office: "bg-gray-600 text-white",
  Dept: "bg-[#7c3aed] text-white",
  Board: "bg-[#2d8a4e] text-white",
  PhD: "bg-[#0369a1] text-white",
  Faculty: "bg-[#be185d] text-white",
};

const getSlotStyle = (text) => {
  if (!text) return "";
  for (const key in slotColors) {
    if (text.startsWith(key)) return slotColors[key];
  }
  return "bg-[#242424]/80 text-white";
};

const HodTimetable = () => {
  return (
    <HodLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Timetable</h2>

        <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
          <table className="w-full border-collapse text-[10px] sm:text-sm min-w-[480px] sm:min-w-[640px]">
            <thead>
              <tr className="bg-[#242424] text-white">
                <th className="text-left px-1.5 sm:px-3 py-2 sm:py-3 font-semibold w-[50px] sm:w-[80px]">Time</th>
                {DAYS.map((d) => (
                  <th key={d} className="text-left px-1.5 sm:px-3 py-2 sm:py-3 font-semibold">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot, idx) => (
                <tr key={slot} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
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
            { label: "CS501", color: "bg-[#242424]" },
            { label: "CS701", color: "bg-[#e8a435]" },
            { label: "Office Hours", color: "bg-gray-600" },
            { label: "Dept Admin", color: "bg-[#7c3aed]" },
            { label: "Committee", color: "bg-[#0369a1]" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className={`w-3 h-3 ${item.color}`} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </HodLayout>
  );
};

export default HodTimetable;
