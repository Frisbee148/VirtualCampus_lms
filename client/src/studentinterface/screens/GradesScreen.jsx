import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../StudentLayout";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "../../context/SessionContext";
import { fetchGrades } from "../../auth/studentApi";

const GradesScreen = () => {
  const navigate = useNavigate();
  const { selectedSessionId, selectedSession } = useSession();
  const [expanded, setExpanded] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setExpanded(null);
    fetchGrades(selectedSessionId)
      .then((data) => {
        if (!cancelled) setCourses(data.courses || []);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedSessionId]);

  if (loading) {
    return (
      <StudentLayout activeTab="Grades">
        <div className="max-w-5xl">
          <div className="h-8 w-48 bg-gray-100 mb-4 animate-pulse" />
          <div className="space-y-3">
            {[1,2].map(i => <div key={i} className="h-16 bg-gray-50 border border-gray-100 animate-pulse" />)}
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Grades">
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Grades
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Viewing grades for{" "}
              <span className="font-semibold text-gray-600">
                {selectedSession.label}
              </span>
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-sm text-gray-400">
              No grade data available for this session.
            </p>
          </div>
        ) : (
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
                    className="justify-self-start inline-flex shrink-0 items-center rounded-none border border-gray-200 bg-white px-3 py-1 text-left text-xs sm:text-sm font-semibold text-black shadow-sm transition-colors hover:border-black hover:bg-[#4E545C] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 whitespace-nowrap"
                  >
                    {c.name || c.course_name}
                  </button>
                  <div className="flex flex-1 items-center justify-center gap-4 sm:gap-12 min-w-0">
                    <span className="text-[10px] sm:text-sm text-gray-500 whitespace-nowrap">
                      Total: <b className="text-gray-900">{c.total_score ?? c.total}</b>
                    </span>
                    <span className="text-[10px] sm:text-sm text-gray-500 whitespace-nowrap">
                      Avg: <b className="text-gray-900">{c.class_avg ?? c.avg}</b>
                    </span>
                  </div>
                  <div className="ml-auto flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-[#4E545C] whitespace-nowrap">
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
                {expanded === idx && c.exams && (
                  <div className="border-t border-gray-100 bg-gray-50/30">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-0">
                      {c.exams.map((ex, i) => (
                        <div
                          key={i}
                          className="p-3 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-100 last:border-b-0 sm:last:border-r-0 flex items-center justify-between sm:block"
                        >
                          <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium sm:mb-1 leading-snug">
                            {ex.name} (max: {ex.max_score})
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
        )}
      </div>
    </StudentLayout>
  );
};

export default GradesScreen;
