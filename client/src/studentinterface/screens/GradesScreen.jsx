import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../StudentLayout";
import { ChevronDown, ChevronUp } from "lucide-react";

const SESSION_OPTIONS = [
  {
    id: "2024-25-II",
    label: "Session 2024-25 II",
    courses: [
      {
        name: "ABC Course",
        total: 56,
        avg: 50,
        grade: "B",
        exams: [
          { name: "Quiz 1 (max: 10)", score: 8 },
          { name: "Midsem (max: 30)", score: 25 },
          { name: "Assignment (max: 20)", score: 13 },
          { name: "Endsem (max: 40)", score: 10 },
        ],
      },
      {
        name: "DEF Course",
        total: 78,
        avg: 65,
        grade: "AB",
        exams: [
          { name: "Quiz 1 (max: 15)", score: 12 },
          { name: "Midsem (max: 35)", score: 28 },
          { name: "Endsem (max: 50)", score: 38 },
        ],
      },
    ],
  },
  {
    id: "2024-25-I",
    label: "Session 2024-25 I",
    courses: [
      {
        name: "ABC Course",
        total: 62,
        avg: 54,
        grade: "BC",
        exams: [
          { name: "Quiz 1 (max: 10)", score: 9 },
          { name: "Midsem (max: 30)", score: 24 },
          { name: "Assignment (max: 20)", score: 15 },
          { name: "Endsem (max: 40)", score: 14 },
        ],
      },
      {
        name: "DEF Course",
        total: 71,
        avg: 60,
        grade: "A",
        exams: [
          { name: "Quiz 1 (max: 15)", score: 11 },
          { name: "Midsem (max: 35)", score: 26 },
          { name: "Endsem (max: 50)", score: 34 },
        ],
      },
    ],
  },
  {
    id: "2023-24-II",
    label: "Session 2023-24 II",
    courses: [
      {
        name: "ABC Course",
        total: 68,
        avg: 58,
        grade: "A",
        exams: [
          { name: "Quiz 1 (max: 10)", score: 9 },
          { name: "Midsem (max: 30)", score: 27 },
          { name: "Assignment (max: 20)", score: 14 },
          { name: "Endsem (max: 40)", score: 18 },
        ],
      },
      {
        name: "DEF Course",
        total: 74,
        avg: 62,
        grade: "AB",
        exams: [
          { name: "Quiz 1 (max: 15)", score: 12 },
          { name: "Midsem (max: 35)", score: 27 },
          { name: "Endsem (max: 50)", score: 35 },
        ],
      },
    ],
  },
  {
    id: "2023-24-I",
    label: "Session 2023-24 I",
    courses: [
      {
        name: "ABC Course",
        total: 59,
        avg: 51,
        grade: "B",
        exams: [
          { name: "Quiz 1 (max: 10)", score: 7 },
          { name: "Midsem (max: 30)", score: 24 },
          { name: "Assignment (max: 20)", score: 14 },
          { name: "Endsem (max: 40)", score: 14 },
        ],
      },
      {
        name: "DEF Course",
        total: 69,
        avg: 58,
        grade: "CD",
        exams: [
          { name: "Quiz 1 (max: 15)", score: 10 },
          { name: "Midsem (max: 35)", score: 25 },
          { name: "Endsem (max: 50)", score: 34 },
        ],
      },
    ],
  },
];

const GradesScreen = () => {
  const navigate = useNavigate();
  const sessionMenuRef = useRef(null);
  const [expanded, setExpanded] = useState(null);
  const [sessionMenuOpen, setSessionMenuOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(
    SESSION_OPTIONS[0].id,
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        sessionMenuRef.current &&
        !sessionMenuRef.current.contains(event.target)
      ) {
        setSessionMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const selectedSession =
    SESSION_OPTIONS.find((session) => session.id === selectedSessionId) ||
    SESSION_OPTIONS[0];
  const courses = selectedSession.courses;

  return (
    <StudentLayout activeTab="Grades">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Grades
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Choose a session to view its course grades.
            </p>
          </div>

          <div
            ref={sessionMenuRef}
            className="relative self-start sm:self-auto"
          >
            <button
              type="button"
              onClick={() => setSessionMenuOpen((current) => !current)}
              aria-haspopup="menu"
              aria-expanded={sessionMenuOpen}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#0e445b] transition-colors"
            >
              {selectedSession.label}
              <ChevronDown
                size={14}
                className={`transition-transform ${sessionMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {sessionMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl z-30 overflow-hidden">
                <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100">
                  All Sessions
                </p>
                <div className="py-1">
                  {SESSION_OPTIONS.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => {
                        setSelectedSessionId(session.id);
                        setSessionMenuOpen(false);
                        setExpanded(null);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                        selectedSessionId === session.id
                          ? "bg-gray-50 font-semibold text-black"
                          : "text-gray-600"
                      }`}
                    >
                      {session.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {courses.map((c, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 shadow-sm overflow-hidden"
            >
              <div
                className="flex items-center gap-3 sm:gap-5 px-3 sm:px-5 py-3 sm:py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate("/course/overview");
                  }}
                  className="justify-self-start inline-flex shrink-0 items-center rounded-none border border-gray-200 bg-white px-3 py-1 text-left text-xs sm:text-sm font-semibold text-black shadow-sm transition-colors hover:border-black hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 whitespace-nowrap"
                >
                  {c.name}
                </button>
                <div className="flex flex-1 items-center justify-center gap-4 sm:gap-12 min-w-0">
                  <span className="text-[10px] sm:text-sm text-gray-500 whitespace-nowrap">
                    Total: <b className="text-gray-900">{c.total}</b>
                  </span>
                  <span className="text-[10px] sm:text-sm text-gray-500 whitespace-nowrap">
                    Avg: <b className="text-gray-900">{c.avg}</b>
                  </span>
                </div>
                <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">
                    {c.grade}
                  </span>
                  <span>
                    {expanded === idx ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              {expanded === idx && (
                <div className="border-t border-gray-100 bg-gray-50/30">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-0">
                    {c.exams.map((ex, i) => (
                      <div
                        key={i}
                        className="p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-b-0 sm:last:border-r-0 flex items-center justify-between sm:block"
                      >
                        <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium sm:mb-1 leading-snug">
                          {ex.name}
                        </p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">
                          {ex.score}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default GradesScreen;
