import React, { useState } from "react";
import HodLayout from "../HodLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EVENTS = {
  "2026-04-02": [{ title: "Dept Meeting", color: "#6b7280" }],
  "2026-04-05": [{ title: "Mid-sem Exams Begin", color: "#ef4444" }],
  "2026-04-10": [{ title: "Mid-sem Exams End", color: "#ef4444" }],
  "2026-04-14": [{ title: "Faculty Review Meeting", color: "#1a7a7a" }],
  "2026-04-18": [{ title: "NAAC Submission Deadline", color: "#e8a435" }],
  "2026-04-22": [{ title: "Conference — Dr. Neha", color: "#2d8a4e" }],
  "2026-04-25": [{ title: "Board Meeting", color: "#7c3aed" }],
  "2026-04-28": [{ title: "Summer Intern Allotment", color: "#1a7a7a" }],
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HodCalendar = () => {
  const [current, setCurrent] = useState(new Date(2026, 3, 1));

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getEvents = (day) => {
    if (!day) return [];
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return EVENTS[key] || [];
  };

  const isToday = (day) => day && today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  const monthName = current.toLocaleString("default", { month: "long" });

  return (
    <HodLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Calendar</h2>

        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <button onClick={prev} className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0">
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center">{monthName} {year}</h3>
          <button onClick={next} className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0">
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 bg-[#1a7a7a] text-white text-[10px] sm:text-sm font-semibold">
          {DAYS.map((d) => (
            <div key={d} className="py-1.5 sm:py-2.5 text-center">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 border-l border-t border-gray-200">
          {cells.map((day, i) => {
            const events = getEvents(day);
            return (
              <div key={i} className={`min-h-[56px] sm:min-h-[100px] border-r border-b border-gray-200 p-1 sm:p-1.5 ${day ? "bg-white" : "bg-gray-50"}`}>
                {day && (
                  <>
                    <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs font-medium ${
                      isToday(day) ? "bg-[#1a7a7a] text-white rounded-full" : "text-gray-700"
                    }`}>{day}</span>
                    {events.map((ev, j) => (
                      <div key={j} className="mt-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium text-white truncate" style={{ backgroundColor: ev.color }}>
                        {ev.title}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </HodLayout>
  );
};

export default HodCalendar;
