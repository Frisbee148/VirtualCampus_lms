import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../StudentLayout";
import StudentEventModal from "../components/StudentEventModal";
import {
  WEEKLY_EVENTS_STORAGE_KEY,
  formatWeeklyTimeRange,
  loadStoredArray,
  saveStoredArray,
} from "../utils/studentEventHelpers";
import { Plus } from "lucide-react";
import { fetchTimetable } from "../../auth/studentApi";
import { useSession } from "../../context/SessionContext";

const FALLBACK_EVENTS = [
  {
    day: 0,
    start: 0,
    dur: 3,
    title: "UX 1 Assignment",
    time: "8-11am",
    color: "bg-indigo-400",
  },
  {
    day: 0,
    start: 3,
    dur: 3,
    title: "UX 2 Assignment",
    time: "11am-2pm",
    color: "bg-emerald-500",
  },
  {
    day: 0,
    start: 6,
    dur: 2,
    title: "Workout + Lunch",
    time: "2-4pm",
    color: "bg-red-500",
  },
  {
    day: 0,
    start: 8,
    dur: 2,
    title: "Booklab Assignment",
    time: "4-6pm",
    color: "bg-amber-500",
  },
  {
    day: 1,
    start: 0,
    dur: 1,
    title: "Messaging Matrix",
    time: "8-9am",
    color: "bg-red-500",
  },
  {
    day: 1,
    start: 1,
    dur: 1,
    title: "Marketing Workload",
    time: "9-10am",
    color: "bg-emerald-500",
  },
  {
    day: 1,
    start: 3,
    dur: 2,
    title: "Portfolio Dev",
    time: "11am-12:30pm",
    color: "bg-sky-500",
  },
  {
    day: 1,
    start: 5,
    dur: 2,
    title: "Call David",
    time: "1-2:30pm",
    color: "bg-orange-500",
  },
  {
    day: 1,
    start: 7,
    dur: 3,
    title: "Taylor House Call",
    time: "3-6pm",
    color: "bg-amber-400",
  },
  {
    day: 2,
    start: 0,
    dur: 1,
    title: "Workload Mgmt",
    time: "8-9am",
    color: "bg-purple-600",
  },
  {
    day: 2,
    start: 1,
    dur: 2,
    title: "Portfolio Due Reminder",
    time: "9-11am",
    color: "bg-orange-500",
  },
  {
    day: 2,
    start: 3,
    dur: 1,
    title: "Brand Design",
    time: "11am-12pm",
    color: "bg-emerald-500",
  },
  {
    day: 2,
    start: 4,
    dur: 4,
    title: "UX3 Project",
    time: "12-4pm",
    color: "bg-amber-400",
  },
  {
    day: 2,
    start: 8,
    dur: 2,
    title: "Booklab",
    time: "4-6pm",
    color: "bg-amber-500",
  },
  {
    day: 3,
    start: 0.5,
    dur: 1,
    title: "Get ready + Commute",
    time: "8:30-9:30",
    color: "bg-emerald-500",
  },
  {
    day: 3,
    start: 2,
    dur: 2,
    title: "Print + Prep Brand 4",
    time: "10-12pm",
    color: "bg-orange-500",
  },
  {
    day: 3,
    start: 5,
    dur: 3,
    title: "Brand Design 4",
    time: "1-4pm",
    color: "bg-amber-400",
  },
  {
    day: 3,
    start: 8,
    dur: 2,
    title: "Climb",
    time: "4-6pm",
    color: "bg-teal-600",
  },
  {
    day: 4,
    start: 0,
    dur: 1.5,
    title: "Leeds Content Dev",
    time: "8-9:30",
    color: "bg-red-500",
  },
  {
    day: 4,
    start: 1.5,
    dur: 1,
    title: "BBW",
    time: "9:30-10:30",
    color: "bg-teal-600",
  },
  {
    day: 4,
    start: 4,
    dur: 2,
    title: "Hold for Tracy",
    time: "12-2pm",
    color: "bg-orange-500",
  },
  {
    day: 4,
    start: 6,
    dur: 2,
    title: "CU Grad Pages",
    time: "2-4pm",
    color: "bg-sky-500",
  },
  {
    day: 4,
    start: 8,
    dur: 2,
    title: "Re:Studio",
    time: "4-6pm",
    color: "bg-stone-600",
  },
];

const CalendarWeekly = () => {
  const navigate = useNavigate();
  const { selectedSessionId } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [customEvents, setCustomEvents] = useState(() =>
    loadStoredArray(WEEKLY_EVENTS_STORAGE_KEY),
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventIndex, setEditEventIndex] = useState(0);
  const [form, setForm] = useState({
    day: "0",
    startTime: "08:00",
    duration: "1",
    title: "",
    color: "#4E545C",
  });
  const [apiEvents, setApiEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveStoredArray(WEEKLY_EVENTS_STORAGE_KEY, customEvents);
  }, [customEvents]);

  useEffect(() => {
    setLoading(true);
    fetchTimetable(selectedSessionId, "week")
      .then((res) => {
        const items = Array.isArray(res) ? res : res.events || res.schedule;
        if (Array.isArray(items) && items.length > 0) setApiEvents(items);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedSessionId]);

  const hours = [
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const defaultEvents = apiEvents || FALLBACK_EVENTS;

  const colorClassByValue = {
    "#4E545C": "bg-[#4E545C]",
    "#0ea5e9": "bg-sky-500",
    "#6366f1": "bg-indigo-500",
    "#ef4444": "bg-red-500",
    "#f59e0b": "bg-amber-500",
    "#8b5cf6": "bg-violet-500",
    "#10b981": "bg-emerald-500",
    "#4b5563": "bg-slate-600",
  };
  const colorValueByClass = Object.entries(colorClassByValue).reduce(
    (accumulator, [colorValue, colorClass]) => {
      accumulator[colorClass] = colorValue;
      return accumulator;
    },
    {},
  );

  const cellH = 40;
  const cellHSm = 56;

  const timeInputFromSlot = (slotValue) => {
    const totalMinutes = 8 * 60 + Math.round(Number(slotValue) * 60);
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const applyFormFromCustomEvent = (eventItem) => {
    setForm({
      day: String(eventItem.day ?? 0),
      startTime: timeInputFromSlot(eventItem.start ?? 0),
      duration: String(eventItem.dur ?? 1),
      title: eventItem.title || "",
      color: colorValueByClass[eventItem.color] || "#4E545C",
    });
  };

  const openAddEvent = () => {
    setIsEditMode(false);
    setEditEventIndex(0);
    setForm({
      day: "0",
      startTime: "08:00",
      duration: "1",
      title: "",
      color: "#4E545C",
    });
    setShowModal(true);
  };

  const openEditEventAtIndex = (eventIndex) => {
    const selectedEvent = customEvents[eventIndex];
    if (!selectedEvent) return;

    setIsEditMode(true);
    setEditEventIndex(eventIndex);
    applyFormFromCustomEvent(selectedEvent);
    setShowModal(true);
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();

    if (!form.title.trim()) return;

    const durationValue = Number(form.duration);
    const startHour = Number(form.startTime.split(":")[0]);
    const startMinute = Number(form.startTime.split(":")[1]);
    const startSlot = startHour + startMinute / 60 - 8;
    const nextEvent = {
      day: Number(form.day),
      start: startSlot,
      dur: durationValue,
      title: form.title.trim(),
      time: formatWeeklyTimeRange(form.startTime, durationValue),
      color: colorClassByValue[form.color] || "bg-[#4E545C]",
    };

    if (isEditMode) {
      setCustomEvents((currentEvents) =>
        currentEvents.map((currentEvent, index) =>
          index === editEventIndex ? nextEvent : currentEvent,
        ),
      );
    } else {
      setCustomEvents((currentEvents) => [...currentEvents, nextEvent]);
    }

    setShowModal(false);
  };

  const events = [
    ...defaultEvents.map((eventItem, index) => ({
      ...eventItem,
      id: `default-${index}`,
      isCustom: false,
    })),
    ...customEvents.map((eventItem, index) => ({
      ...eventItem,
      id: `custom-${index}`,
      isCustom: true,
      customIndex: index,
    })),
  ].sort((leftEvent, rightEvent) => {
    if (leftEvent.day !== rightEvent.day) return leftEvent.day - rightEvent.day;
    return leftEvent.start - rightEvent.start;
  });

  if (loading) {
    return (
      <StudentLayout activeTab="Timetable">
        <div className="max-w-6xl">
          <div className="bg-gray-100 animate-pulse h-64 flex items-center justify-center">
            <span className="text-sm text-gray-400">Loading...</span>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Timetable">
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Timetable
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Weekly schedule
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors"
              onChange={(e) => {
                if (e.target.value === "daily") navigate("/timetable/daily");
              }}
              defaultValue="weekly"
            >
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
            <button
              type="button"
              onClick={openAddEvent}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#4E545C] text-white text-xs sm:text-sm font-semibold hover:bg-[#828a91] transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        <StudentEventModal
          open={showModal}
          title={isEditMode ? "Edit Timetable Event" : "Add Timetable Event"}
          description={
            isEditMode
              ? "Update this custom weekly timetable block."
              : "Create a custom block for your weekly timetable."
          }
          submitLabel={isEditMode ? "Save Changes" : "Add Event"}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitEvent}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Day
              </span>
              <select
                value={form.day}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    day: event.target.value,
                  }))
                }
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
              >
                {days.map((day, index) => (
                  <option key={day} value={index}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Start Time
              </span>
              <input
                type="time"
                step="1800"
                min="08:00"
                max="18:00"
                value={form.startTime}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    startTime: event.target.value,
                  }))
                }
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
                required
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Duration
              </span>
              <select
                value={form.duration}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    duration: event.target.value,
                  }))
                }
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
              >
                <option value="0.5">30 minutes</option>
                <option value="1">1 hour</option>
                <option value="1.5">1.5 hours</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </select>
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

        <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-[40px_repeat(5,1fr)] sm:grid-cols-[60px_repeat(5,1fr)] border-b border-gray-100">
              <div className="py-2 sm:py-3 text-center text-[8px] sm:text-[10px] font-semibold text-gray-300 uppercase">
                Time
              </div>
              {days.map((d) => (
                <div
                  key={d}
                  className="py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider border-l border-gray-50"
                >
                  {d}
                </div>
              ))}
            </div>

            <div
              className="grid grid-cols-[40px_repeat(5,1fr)] sm:grid-cols-[60px_repeat(5,1fr)] relative"
              style={{ height: `${hours.length * cellHSm}px` }}
            >
              <div className="relative">
                {hours.map((hr, idx) => (
                  <div
                    key={idx}
                    className="absolute w-full text-right pr-1 sm:pr-2"
                    style={{ top: `${idx * cellHSm - 7}px` }}
                  >
                    <span className="text-[8px] sm:text-[10px] font-medium text-gray-400">
                      {hr}
                    </span>
                  </div>
                ))}
              </div>
              {days.map((_, dayIdx) => (
                <div key={dayIdx} className="relative border-l border-gray-50">
                  {hours.map((_, hIdx) => (
                    <div
                      key={hIdx}
                      className="absolute w-full h-px bg-gray-50"
                      style={{ top: `${hIdx * cellHSm}px` }}
                    ></div>
                  ))}
                  {events
                    .filter((e) => e.day === dayIdx)
                    .map((ev, i) =>
                      ev.isCustom ? (
                        <button
                          key={ev.id || i}
                          type="button"
                          onClick={() => openEditEventAtIndex(ev.customIndex)}
                          title="Click to edit"
                          className={`absolute left-0.5 right-0.5 sm:left-1 sm:right-1 ${ev.color} text-white px-1 sm:px-2 py-1 sm:py-1.5 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left`}
                          style={{
                            top: `${ev.start * cellHSm}px`,
                            height: `${ev.dur * cellHSm - 4}px`,
                          }}
                        >
                          <p className="text-[8px] sm:text-[10px] font-bold truncate leading-tight">
                            {ev.title}
                          </p>
                          <p className="text-[7px] sm:text-[9px] opacity-80 mt-0.5 hidden sm:block">
                            {ev.time}
                          </p>
                        </button>
                      ) : (
                        <div
                          key={ev.id || i}
                          className={`absolute left-0.5 right-0.5 sm:left-1 sm:right-1 ${ev.color} text-white px-1 sm:px-2 py-1 sm:py-1.5 overflow-hidden shadow-sm`}
                          style={{
                            top: `${ev.start * cellHSm}px`,
                            height: `${ev.dur * cellHSm - 4}px`,
                          }}
                        >
                          <p className="text-[8px] sm:text-[10px] font-bold truncate leading-tight">
                            {ev.title}
                          </p>
                          <p className="text-[7px] sm:text-[9px] opacity-80 mt-0.5 hidden sm:block">
                            {ev.time}
                          </p>
                        </div>
                      ),
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CalendarWeekly;
