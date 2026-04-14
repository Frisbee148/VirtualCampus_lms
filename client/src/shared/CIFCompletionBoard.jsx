import React, { useEffect, useMemo, useState } from "react";
import {
  CIF_COURSES,
  getCifCourse,
  getCifCompletionSummary,
  getCifSelectedCourseKey,
  getCifStorageKey,
} from "./cifCompletionData";

const SELECTED_COURSE_STORAGE_KEY = "cif-selected-course";

const readStoredCompletion = (courseKey) => {
  try {
    const stored = localStorage.getItem(getCifStorageKey(courseKey));
    const course = getCifCourse(courseKey);
    if (!stored) return course.defaultCompletedTopicIds;

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : course.defaultCompletedTopicIds;
  } catch {
    return getCifCourse(courseKey).defaultCompletedTopicIds;
  }
};

const saveStoredCompletion = (courseKey, completedIds) => {
  localStorage.setItem(
    getCifStorageKey(courseKey),
    JSON.stringify(completedIds),
  );
};

const CIFCompletionBoard = ({
  editable = false,
  roleLabel = "Student View",
  courseKey,
  showCourseSelector = true,
}) => {
  const [selectedCourseKey, setSelectedCourseKey] = useState(
    () => courseKey || getCifSelectedCourseKey(),
  );
  const currentCourse = useMemo(
    () => getCifCourse(selectedCourseKey),
    [selectedCourseKey],
  );
  const [savedIds, setSavedIds] = useState(() =>
    readStoredCompletion(selectedCourseKey),
  );
  const [completedIds, setCompletedIds] = useState(savedIds);

  useEffect(() => {
    if (courseKey) {
      setSelectedCourseKey(courseKey);
      return;
    }

    setSelectedCourseKey(getCifSelectedCourseKey());
  }, [courseKey]);

  useEffect(() => {
    if (!showCourseSelector) {
      return;
    }

    try {
      localStorage.setItem(SELECTED_COURSE_STORAGE_KEY, selectedCourseKey);
    } catch {
      // Ignore storage failures.
    }
  }, [selectedCourseKey, showCourseSelector]);

  useEffect(() => {
    const loaded = readStoredCompletion(selectedCourseKey);
    setSavedIds(loaded);
    setCompletedIds(loaded);
  }, [selectedCourseKey]);

  const handleSave = () => {
    saveStoredCompletion(selectedCourseKey, completedIds);
    setSavedIds(completedIds);
  };

  const hasUnsavedChanges = 
    JSON.stringify([...completedIds].sort()) !== JSON.stringify([...savedIds].sort());

  const summary = useMemo(
    () => getCifCompletionSummary(completedIds, currentCourse),
    [completedIds, currentCourse],
  );

  const toggleTopic = (topicId) => {
    if (!editable) return;

    setCompletedIds((currentIds) =>
      currentIds.includes(topicId)
        ? currentIds.filter((id) => id !== topicId)
        : [...currentIds, topicId],
    );
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Course CIFs
            </p>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1">
              Select the course CIF
            </h2>

          </div>
          <div className="text-xs sm:text-sm text-gray-500 text-right">
            <p className="font-semibold text-gray-700">{roleLabel}</p>
            <p>{CIF_COURSES.length} course CIFs available</p>
          </div>
        </div>

        {showCourseSelector ? (
          <div className="mt-4 max-w-[420px]">
            <label className="block text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Course option
            </label>
            <div className="relative">
              <select
                value={selectedCourseKey}
                onChange={(e) => setSelectedCourseKey(e.target.value)}
                className="w-full appearance-none border border-gray-200 bg-white px-3 py-3 pr-10 text-sm sm:text-base font-semibold text-gray-900 shadow-sm outline-none transition-colors focus:border-[#4E545C]"
              >
                {CIF_COURSES.map((course) => (
                  <option key={course.key} value={course.key}>
                    {course.code} - {course.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 max-w-[420px] border border-gray-200 bg-[#f8fbfb] px-3 py-3">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Assigned course
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
              {currentCourse.code} - {currentCourse.title}
            </p>

          </div>
        )}
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Completion
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {summary.percent}%
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Checked Topics
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {summary.completedTopics}/{summary.totalTopics}
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Completed Hours
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
            {summary.completedHours}
          </p>

        </div>
        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Current CIF
          </p>
          <p className="text-sm sm:text-lg font-bold text-gray-900 mt-1 leading-tight">
            {currentCourse.code}
          </p>

        </div>
      </div>

      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-4 sm:gap-5">
        <section className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                CIF PDF Preview
              </h2>

            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-gray-500">
              PDF
            </div>
          </div>

          <div className="bg-[#f7f5ef] px-3 sm:px-4 py-4 sm:py-5">
            <div className="mx-auto max-w-[780px] bg-white border border-gray-200 shadow-[0_12px_40px_rgba(15,17,23,0.08)] p-3 sm:p-5 max-h-[680px] overflow-y-auto">
              <div className="border border-gray-300">
                <div className="grid grid-cols-[minmax(0,1fr)_70px_90px] sm:grid-cols-[minmax(0,1fr)_90px_110px] border-b border-gray-300 text-[10px] sm:text-xs font-semibold text-gray-800 bg-gray-50">
                  <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center">
                    Course Topics
                  </div>
                  <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-300">
                    Lecture Hours
                  </div>
                  <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-300">
                    Associated CO
                  </div>
                </div>

                {currentCourse.sections.map((section) => (
                  <div
                    key={section.id}
                    className="border-b border-gray-300 last:border-b-0"
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_70px_90px] sm:grid-cols-[minmax(0,1fr)_90px_110px] bg-white text-[10px] sm:text-xs text-gray-800">
                      <div className="px-2 sm:px-3 py-2 sm:py-2.5 font-semibold">
                        {section.unitTitle}
                      </div>
                      <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-300 font-semibold">
                        {section.unitHours}
                      </div>
                      <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-300 font-semibold">
                        {section.unitCo}
                      </div>
                    </div>

                    {section.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="grid grid-cols-[minmax(0,1fr)_70px_90px] sm:grid-cols-[minmax(0,1fr)_90px_110px] border-t border-gray-200 text-[10px] sm:text-xs text-gray-700"
                      >
                        <div className="px-2 sm:px-3 py-2 sm:py-2.5">
                          {topic.label}
                        </div>
                        <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-200">
                          {topic.hours}
                        </div>
                        <div className="px-2 sm:px-3 py-2 sm:py-2.5 text-center border-l border-gray-200">
                          {topic.co}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-start justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Digital CIF Checklist
              </h2>

            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-emerald-700">
              Live
            </div>
          </div>

          <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
            <div className="h-2.5 bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-[#4E545C] transition-all duration-300"
                style={{ width: `${summary.percent}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  {summary.percent}%
                </span>{" "}
                complete
              </p>
              {editable ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                  <button
                    onClick={handleSave}
                    disabled={!hasUnsavedChanges}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      hasUnsavedChanges
                        ? "bg-[#4E545C] text-white hover:bg-[#145c5c] cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {hasUnsavedChanges ? "Save Changes" : "Saved"}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="max-h-[560px] overflow-y-auto border border-gray-200">
              {currentCourse.sections.map((section) => (
                <div key={section.id}>
                  <div className="grid grid-cols-[minmax(0,1fr)_70px_80px] sm:grid-cols-[minmax(0,1fr)_90px_100px_120px] bg-[#131518] text-white text-[10px] sm:text-xs font-semibold">
                    <div className="px-3 sm:px-4 py-2 sm:py-2.5">
                      {section.unitTitle}
                    </div>
                    <div className="px-3 sm:px-4 py-2 sm:py-2.5 text-center border-l border-white/10">
                      Hours
                    </div>
                    <div className="px-3 sm:px-4 py-2 sm:py-2.5 text-center border-l border-white/10">
                      CO
                    </div>
                    <div className="hidden sm:block px-3 sm:px-4 py-2 sm:py-2.5 text-center border-l border-white/10">
                      Status
                    </div>
                  </div>

                  {section.topics.map((topic) => {
                    const checked = completedIds.includes(topic.id);

                    return (
                      <div
                        key={topic.id}
                        className="grid grid-cols-[auto_minmax(0,1fr)_70px_80px] sm:grid-cols-[auto_minmax(0,1fr)_90px_100px_120px] border-t border-gray-200 text-xs sm:text-sm"
                      >
                        <label className="flex items-start justify-center px-2 sm:px-3 py-3 sm:py-3.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!editable}
                            onChange={() => toggleTopic(topic.id)}
                            className="mt-1 h-4 w-4 cursor-pointer accent-[#4E545C] disabled:cursor-default"
                          />
                        </label>
                        <div className="px-2 sm:px-3 py-3 sm:py-3.5 min-w-0">
                          <p className="text-gray-900 font-medium leading-snug">
                            {topic.label}
                          </p>

                        </div>
                        <div className="px-2 sm:px-3 py-3 sm:py-3.5 text-center border-l border-gray-200 text-gray-700 font-semibold">
                          {topic.hours}
                        </div>
                        <div className="px-2 sm:px-3 py-3 sm:py-3.5 text-center border-l border-gray-200 text-gray-700 font-semibold">
                          {topic.co}
                        </div>
                        <div className="hidden sm:flex px-2 sm:px-3 py-3 sm:py-3.5 items-center justify-center border-l border-gray-200">
                          {checked ? (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Completed
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-gray-50 text-gray-500 border border-gray-200">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CIFCompletionBoard;
