import React, { useEffect, useRef, useState } from "react";
import StudentLayout from "../StudentLayout";
import { ChevronDown } from "lucide-react";

const SEMESTER_RECORDS = [
  {
    id: "sem1",
    label: "Sem 1 (2024-25 I)",
    shortLabel: "Sem 1",
    credits: 21,
    sgpa: 8.12,
  },
  {
    id: "sem2",
    label: "Sem 2 (2024-25 II)",
    shortLabel: "Sem 2",
    credits: 22,
    sgpa: 8.35,
  },
  {
    id: "sem3",
    label: "Sem 3 (2025-26 I)",
    shortLabel: "Sem 3",
    credits: 20,
    sgpa: 8.18,
  },
  {
    id: "sem4",
    label: "Sem 4 (2025-26 II)",
    shortLabel: "Sem 4",
    credits: 21,
    sgpa: 8.63,
  },
];

const SESSION_OPTIONS = [
  { id: "sem4", label: "Session 2025-26 II" },
  { id: "sem3", label: "Session 2025-26 I" },
  { id: "sem2", label: "Session 2024-25 II" },
  { id: "sem1", label: "Session 2024-25 I" },
];

const buildSemesterHistory = (records) => {
  let totalCredits = 0;
  let weightedPoints = 0;

  return records.map((record, index) => {
    totalCredits += record.credits;
    weightedPoints += record.credits * record.sgpa;

    return {
      ...record,
      order: index + 1,
      totalCredits,
      cgpa: Number((weightedPoints / totalCredits).toFixed(2)),
    };
  });
};

const SEMESTER_HISTORY = buildSemesterHistory(SEMESTER_RECORDS);

const PerformanceCGPA = () => {
  const semesterMenuRef = useRef(null);
  const [semesterMenuOpen, setSemesterMenuOpen] = useState(false);
  const [selectedSemesterId, setSelectedSemesterId] = useState("sem4");

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        semesterMenuRef.current &&
        !semesterMenuRef.current.contains(event.target)
      ) {
        setSemesterMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  const activeSemester =
    SEMESTER_HISTORY.find((semester) => semester.id === selectedSemesterId) ||
    null;
  const selectedSessionLabel =
    SESSION_OPTIONS.find((session) => session.id === selectedSemesterId)
      ?.label || "All Sessions";

  const visibleHistory = SEMESTER_HISTORY;

  const totalCredits = SEMESTER_HISTORY.reduce(
    (sum, semester) => sum + semester.credits,
    0,
  );
  const weightedCgpa =
    totalCredits > 0
      ? SEMESTER_HISTORY.reduce(
          (sum, semester) => sum + semester.credits * semester.sgpa,
          0,
        ) / totalCredits
      : 0;
  const latestCgpa = SEMESTER_HISTORY[SEMESTER_HISTORY.length - 1].cgpa;

  const summaryCards = activeSemester
    ? [
        {
          label: "Semester Credits",
          value: activeSemester.credits,
          note: activeSemester.label,
        },
        {
          label: "SGPA",
          value: activeSemester.sgpa.toFixed(2),
          note: "This session performance",
        },
        {
          label: "CGPA",
          value: activeSemester.cgpa.toFixed(2),
          note: "Cumulative performance",
        },
      ]
    : [
        {
          label: "Credits Earned",
          value: totalCredits,
          note: "Across all sessions",
        },
        {
          label: "Average SGPA",
          value: weightedCgpa.toFixed(2),
          note: "Weighted semester average",
        },
        {
          label: "CGPA",
          value: latestCgpa.toFixed(2),
          note: "Cumulative performance",
        },
      ];

  const summaryTitle = activeSemester
    ? activeSemester.label
    : "Current Session";

  const chartPadding = { top: 24, right: 24, bottom: 42, left: 44 };
  const chartWidth = 760;
  const chartHeight = 320;
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right;
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const dataValues = visibleHistory.flatMap((semester) => [
    semester.sgpa,
    semester.cgpa,
  ]);
  const rawMin = Math.min(...dataValues);
  const rawMax = Math.max(...dataValues);
  const chartMin = rawMin === rawMax ? rawMin - 0.5 : rawMin - 0.2;
  const chartMax = rawMin === rawMax ? rawMax + 0.5 : rawMax + 0.2;
  const yScale = (value) =>
    chartPadding.top +
    ((chartMax - value) / (chartMax - chartMin)) * plotHeight;
  const xScale = (index) =>
    chartPadding.left +
    (plotWidth / Math.max(visibleHistory.length - 1, 1)) * index;

  const buildPath = (key) =>
    visibleHistory
      .map(
        (semester, index) =>
          `${index === 0 ? "M" : "L"} ${xScale(index)} ${yScale(semester[key])}`,
      )
      .join(" ");

  return (
    <StudentLayout activeTab="Grades">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Semester Performance
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Semester credits, SGPA, and CGPA trend.
            </p>
          </div>

          <div
            ref={semesterMenuRef}
            className="relative self-start sm:self-auto"
          >
            <button
              type="button"
              onClick={() => setSemesterMenuOpen((current) => !current)}
              aria-haspopup="menu"
              aria-expanded={semesterMenuOpen}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-black text-white text-xs sm:text-sm font-semibold shadow-sm hover:bg-[#0e445b] transition-colors"
            >
              {selectedSessionLabel}
              <ChevronDown
                size={14}
                className={`transition-transform ${semesterMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            {semesterMenuOpen ? (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 shadow-xl z-30 overflow-hidden">
                <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 border-b border-gray-100">
                  Sessions
                </p>
                <div className="py-1">
                  {SESSION_OPTIONS.map((session) => (
                    <button
                      key={session.id}
                      type="button"
                      onClick={() => {
                        setSelectedSemesterId(session.id);
                        setSemesterMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${
                        selectedSemesterId === session.id
                          ? "bg-gray-50 font-semibold text-black"
                          : "text-gray-600"
                      }`}
                    >
                      {session.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-gray-100 shadow-sm p-4 sm:p-5"
            >
              <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                {card.label}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {card.value}
                </span>
              </div>
              <p className="mt-2 text-[10px] sm:text-xs text-gray-400">
                {card.label === "Semester Credits" ? summaryTitle : card.note}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-6">
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Academic Trend
            </h2>
            <span className="text-[10px] sm:text-xs text-gray-400">
              {visibleHistory.length} semesters shown
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full min-w-[720px] h-auto"
            >
              {[0, 1, 2, 3, 4].map((gridIndex) => {
                const value =
                  chartMin + (gridIndex * (chartMax - chartMin)) / 4;
                const y = yScale(value);

                return (
                  <g key={gridIndex}>
                    <line
                      x1={chartPadding.left}
                      y1={y}
                      x2={chartWidth - chartPadding.right}
                      y2={y}
                      stroke="#eef2f7"
                      strokeWidth="1"
                    />
                    <text
                      x={chartPadding.left - 10}
                      y={y + 4}
                      fontSize="11"
                      fill="#94a3b8"
                      textAnchor="end"
                    >
                      {value.toFixed(1)}
                    </text>
                  </g>
                );
              })}

              <line
                x1={chartPadding.left}
                y1={chartPadding.top}
                x2={chartPadding.left}
                y2={chartHeight - chartPadding.bottom}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <line
                x1={chartPadding.left}
                y1={chartHeight - chartPadding.bottom}
                x2={chartWidth - chartPadding.right}
                y2={chartHeight - chartPadding.bottom}
                stroke="#e2e8f0"
                strokeWidth="1"
              />

              <path
                d={buildPath("sgpa")}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d={buildPath("cgpa")}
                fill="none"
                stroke="#111827"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {visibleHistory.map((semester, index) => {
                const x = xScale(index);
                const sgpaY = yScale(semester.sgpa);
                const cgpaY = yScale(semester.cgpa);

                return (
                  <g key={semester.id}>
                    <rect
                      x={x - 4}
                      y={sgpaY - 4}
                      width="8"
                      height="8"
                      fill="#f97316"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <rect
                      x={x - 4}
                      y={cgpaY - 4}
                      width="8"
                      height="8"
                      fill="#111827"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={chartHeight - 16}
                      fontSize="12"
                      fill="#94a3b8"
                      textAnchor="middle"
                    >
                      {semester.shortLabel}
                    </text>
                  </g>
                );
              })}

              <g>
                <rect
                  x={chartWidth - 168}
                  y={16}
                  width="10"
                  height="10"
                  fill="#f97316"
                />
                <text x={chartWidth - 152} y={25} fontSize="12" fill="#6b7280">
                  SGPA
                </text>
                <rect
                  x={chartWidth - 102}
                  y={16}
                  width="10"
                  height="10"
                  fill="#111827"
                />
                <text x={chartWidth - 86} y={25} fontSize="12" fill="#6b7280">
                  CGPA
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default PerformanceCGPA;
