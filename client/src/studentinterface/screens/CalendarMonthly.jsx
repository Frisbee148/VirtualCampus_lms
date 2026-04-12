import React, { useEffect, useState } from "react";
import StudentLayout from "../StudentLayout";
import StudentEventModal from "../components/StudentEventModal";
import {
  MONTHLY_EVENTS_STORAGE_KEY,
  loadStoredArray,
  saveStoredArray,
} from "../utils/studentEventHelpers";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const DEFAULT_EVENTS = {
  "2026-03-02": [{ title: "Quiz 1 — CS301", color: "#6366f1" }],
  "2026-03-05": [{ title: "Assignment Due — CS301", color: "#e8a435" }],
  "2026-03-10": [{ title: "Midsem Exam", color: "#ef4444" }],
  "2026-03-14": [{ title: "Hackathon", color: "#8b5cf6" }],
  "2026-03-18": [{ title: "Guest Lecture", color: "#2d8a4e" }],
  "2026-03-20": [{ title: "Project Submission", color: "#1a7a7a" }],
  "2026-03-25": [{ title: "Lab Test — CS302", color: "#ef4444" }],
  "2026-03-28": [{ title: "Cultural Fest", color: "#ec4899" }],
  "2026-04-01": [{ title: "Semester Break Starts", color: "#e8a435" }],
  "2026-04-07": [{ title: "Classes Resume", color: "#2d8a4e" }],
  "2026-04-09": [{ title: "Quiz 2 — CS301", color: "#6366f1" }],
  "2026-04-15": [{ title: "Assignment Due — CS302", color: "#e8a435" }],
  "2026-04-22": [{ title: "Endsem Prep Begins", color: "#6b7280" }],
  "2026-04-28": [{ title: "Endsem Exams Start", color: "#ef4444" }],
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarMonthly = () => {
  const [current, setCurrent] = useState(new Date(2026, 2, 1)); // March 2026
  const [showModal, setShowModal] = useState(false);
  const [customEvents, setCustomEvents] = useState(() =>
    loadStoredArray(MONTHLY_EVENTS_STORAGE_KEY),
  );
  const [form, setForm] = useState({ date: "", title: "", color: "#1a7a7a" });

  useEffect(() => {
    saveStoredArray(MONTHLY_EVENTS_STORAGE_KEY, customEvents);
  }, [customEvents]);

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const openAddEvent = () => {
    setForm({
      date: `${year}-${String(month + 1).padStart(2, "0")}-01`,
      title: "",
      color: "#1a7a7a",
    });
    setShowModal(true);
  };

  const handleAddEvent = (event) => {
    event.preventDefault();

    if (!form.date || !form.title.trim()) return;

    setCustomEvents((currentEvents) => [
      ...currentEvents,
      {
        date: form.date,
        title: form.title.trim(),
        color: form.color,
      },
    ]);
    setShowModal(false);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getEvents = (day) => {
    if (!day) return [];
    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return [
      ...(DEFAULT_EVENTS[key] || []),
      ...customEvents.filter((ev) => ev.date === key),
    ];
  };

  const isToday = (day) =>
    day &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const monthName = current.toLocaleString("default", { month: "long" });

  return (
    <StudentLayout activeTab="Calendar">
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Calendar
        </h2>

        <div className="flex justify-end mb-3 sm:mb-4">
          <button
            onClick={openAddEvent}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-black text-white text-xs sm:text-sm font-semibold hover:bg-[#0e445b] transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Add Event</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Month navigation */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <button
            onClick={prev}
            className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center">
            {monthName} {year}
          </h3>
          <button
            onClick={next}
            className="p-2 hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <StudentEventModal
          open={showModal}
          title="Add Calendar Event"
          description="Create a custom calendar item for the selected date."
          submitLabel="Add Event"
          onClose={() => setShowModal(false)}
          onSubmit={handleAddEvent}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Date
              </span>
              <input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    date: event.target.value,
                  }))
                }
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Color
              </span>
              <input
                type="color"
                value={form.color}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    color: event.target.value,
                  }))
                }
                className="h-[46px] w-full cursor-pointer border border-gray-200 bg-white px-2 py-1"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">
              Title
            </span>
            <input
              type="text"
              value={form.title}
              onChange={(event) =>
                setForm((currentForm) => ({
                  ...currentForm,
                  title: event.target.value,
                }))
              }
              placeholder="Enter event title"
              className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
              required
            />
          </label>
        </StudentEventModal>

        {/* Day headers */}
        <div className="grid grid-cols-7 bg-[#1a7a7a] text-white text-[10px] sm:text-sm font-semibold">
          {DAYS.map((d) => (
            <div key={d} className="py-1.5 sm:py-2.5 text-center">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 border-l border-t border-gray-200">
          {cells.map((day, i) => {
            const events = getEvents(day);
            return (
              <div
                key={i}
                className={`min-h-[56px] sm:min-h-[100px] border-r border-b border-gray-200 p-1 sm:p-1.5 ${
                  day ? "bg-white" : "bg-gray-50"
                }`}
              >
                {day && (
                  <>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 text-[10px] sm:text-xs font-medium ${
                        isToday(day)
                          ? "bg-[#1a7a7a] text-white rounded-full"
                          : "text-gray-700"
                      }`}
                    >
                      {day}
                    </span>
                    {events.map((ev, j) => (
                      <div
                        key={j}
                        className="mt-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-medium text-white truncate"
                        style={{ backgroundColor: ev.color }}
                      >
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
    </StudentLayout>
  );
};

export default CalendarMonthly;
