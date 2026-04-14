import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../StudentLayout";
import StudentEventModal from "../components/StudentEventModal";
import {
  DAILY_EVENTS_STORAGE_KEY,
  formatTimeInputLabel,
  loadStoredArray,
  saveStoredArray,
  timeLabelToMinutes,
} from "../utils/studentEventHelpers";
import { Plus } from "lucide-react";

const CalendarDaily = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customSchedule, setCustomSchedule] = useState(() =>
    loadStoredArray(DAILY_EVENTS_STORAGE_KEY),
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventIndex, setEditEventIndex] = useState(0);
  const [form, setForm] = useState({ time: "09:00", event: "", room: "" });

  useEffect(() => {
    saveStoredArray(DAILY_EVENTS_STORAGE_KEY, customSchedule);
  }, [customSchedule]);

  const defaultSchedule = [
    { time: "9:00 AM", event: "Data Structures Lecture", room: "Room 201" },
    { time: "10:30 AM", event: "Operating Systems Lab", room: "Lab 3" },
    { time: "12:00 PM", event: "Lunch Break", room: "" },
    { time: "1:30 PM", event: "Algorithm Design", room: "Room 305" },
    { time: "3:00 PM", event: "Project Discussion", room: "Meeting Room A" },
    { time: "4:30 PM", event: "", room: "" },
  ];

  const schedule = [
    ...defaultSchedule.map((scheduleItem, index) => ({
      ...scheduleItem,
      id: `default-${index}`,
      isCustom: false,
    })),
    ...customSchedule.map((scheduleItem, index) => ({
      ...scheduleItem,
      id: `custom-${index}`,
      isCustom: true,
      customIndex: index,
    })),
  ].sort(
    (leftItem, rightItem) =>
      timeLabelToMinutes(leftItem.time) - timeLabelToMinutes(rightItem.time),
  );

  const toTimeInputValue = (timeLabel) => {
    const totalMinutes = timeLabelToMinutes(timeLabel);
    const hour = Math.floor(totalMinutes / 60) % 24;
    const minute = totalMinutes % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const applyFormFromCustomEvent = (scheduleItem) => {
    setForm({
      time: toTimeInputValue(scheduleItem.time),
      event: scheduleItem.event || "",
      room: scheduleItem.room || "",
    });
  };

  const openAddEvent = () => {
    setIsEditMode(false);
    setEditEventIndex(0);
    setForm({ time: "09:00", event: "", room: "" });
    setShowModal(true);
  };

  const openEditEventAtIndex = (eventIndex) => {
    const selectedEvent = customSchedule[eventIndex];
    if (!selectedEvent) return;

    setIsEditMode(true);
    setEditEventIndex(eventIndex);
    applyFormFromCustomEvent(selectedEvent);
    setShowModal(true);
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();

    if (!form.event.trim()) return;

    const nextScheduleItem = {
      time: formatTimeInputLabel(form.time),
      event: form.event.trim(),
      room: form.room.trim(),
    };

    if (isEditMode) {
      setCustomSchedule((currentSchedule) =>
        currentSchedule.map((scheduleItem, index) =>
          index === editEventIndex ? nextScheduleItem : scheduleItem,
        ),
      );
    } else {
      setCustomSchedule((currentSchedule) => [
        ...currentSchedule,
        nextScheduleItem,
      ]);
    }

    setShowModal(false);
  };

  return (
    <StudentLayout activeTab="Timetable">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 sm:mb-8 gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Timetable
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Daily schedule
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-gray-200 text-xs sm:text-sm font-medium text-gray-700 cursor-pointer outline-none focus:border-black transition-colors"
              onChange={(e) => {
                if (e.target.value === "weekly") navigate("/timetable");
              }}
              defaultValue="daily"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
            <button
              onClick={openAddEvent}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#242424] text-white text-xs sm:text-sm font-semibold hover:bg-[#434343] transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} className="sm:w-4 sm:h-4" />{" "}
              <span className="hidden sm:inline">Add Event</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        <StudentEventModal
          open={showModal}
          title={isEditMode ? "Edit Timetable Entry" : "Add Timetable Entry"}
          description={
            isEditMode
              ? "Update this custom daily timetable item."
              : "Create a custom item for the daily timetable."
          }
          submitLabel={isEditMode ? "Save Changes" : "Add Event"}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitEvent}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Time
              </span>
              <input
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    time: event.target.value,
                  }))
                }
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-gray-700">
                Room
              </span>
              <input
                type="text"
                value={form.room}
                onChange={(event) =>
                  setForm((currentForm) => ({
                    ...currentForm,
                    room: event.target.value,
                  }))
                }
                placeholder="Optional room or venue"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">
              Event Title
            </span>
            <input
              type="text"
              value={form.event}
              onChange={(event) =>
                setForm((currentForm) => ({
                  ...currentForm,
                  event: event.target.value,
                }))
              }
              placeholder="Enter event title"
              className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
              required
            />
          </label>
        </StudentEventModal>

        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#242424] text-white">
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold w-[30%]">
                  Time
                </th>
                <th className="py-2.5 sm:py-3.5 px-3 sm:px-5 text-left text-xs sm:text-sm font-semibold">
                  Schedule
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, idx) => (
                <tr
                  key={s.id || idx}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 sm:py-5 px-3 sm:px-5 text-xs sm:text-sm font-semibold text-gray-500">
                    {s.time}
                  </td>
                  <td className="py-3 sm:py-5 px-3 sm:px-5">
                    {s.event ? (
                      s.isCustom ? (
                        <button
                          type="button"
                          onClick={() => openEditEventAtIndex(s.customIndex)}
                          title="Click to edit"
                          className="w-full text-left cursor-pointer"
                        >
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {s.event}
                          </p>
                          {s.room && (
                            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                              {s.room}
                            </p>
                          )}
                        </button>
                      ) : (
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {s.event}
                          </p>
                          {s.room && (
                            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                              {s.room}
                            </p>
                          )}
                        </div>
                      )
                    ) : (
                      <span className="text-[10px] sm:text-xs text-gray-300 italic">
                        No event scheduled
                      </span>
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
