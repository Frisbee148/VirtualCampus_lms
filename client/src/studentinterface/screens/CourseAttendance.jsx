import React, { useState, useEffect } from 'react';
import StudentLayout from '../StudentLayout';
import { CourseTabs } from './CourseOverview';
import { fetchCourses, fetchCourseAttendance } from '../../auth/studentApi';
import { useSession } from '../../context/SessionContext';

const FALLBACK_ATTENDANCE = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 1, 1,
  1, 1, null, null, null, null, null,
  null, null, null, null, null, null, null
];

const CourseAttendance = () => {
  const { selectedSessionId } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCourses(selectedSessionId)
      .then((res) => {
        const courses = Array.isArray(res) ? res : res.courses;
        if (Array.isArray(courses) && courses.length > 0) {
          return fetchCourseAttendance(courses[0]._id || courses[0].id);
        }
        return null;
      })
      .then((result) => setData(result))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selectedSessionId]);

  const courseName = data?.courseName || 'ABC Course';
  const attendanceData = data?.days || FALLBACK_ATTENDANCE;
  const yourPct = data?.yourAttendance || '86%';
  const required = data?.required || '85%';
  const monthLabel = data?.monthLabel || 'October 2024';

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dayLabelsFull = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const present = attendanceData.filter(s => s === 1).length;
  const absent = attendanceData.filter(s => s === 0).length;

  if (loading) {
    return (
      <StudentLayout activeTab="Performance Review">
        <div className="max-w-5xl">
          <div className="bg-gray-100 animate-pulse h-64 flex items-center justify-center">
            <span className="text-sm text-gray-400">Loading...</span>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{courseName}</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Attendance tracking</p>
        <CourseTabs active="attendance" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Your Attendance</p>
            <p className="text-xl sm:text-3xl font-bold text-gray-900">{yourPct}</p>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Required</p>
            <p className="text-xl sm:text-3xl font-bold text-gray-900">{required}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Present</p>
            <p className="text-xl sm:text-3xl font-bold text-emerald-700">{present} days</p>
          </div>
          <div className="bg-red-50 border border-red-100 p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Absent</p>
            <p className="text-xl sm:text-3xl font-bold text-red-600">{absent} days</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">{monthLabel}</h3>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-3">
            {dayLabels.map((d, i) => (
              <div key={i} className="text-center text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider py-1">
                <span className="sm:hidden">{d}</span>
                <span className="hidden sm:inline">{dayLabelsFull[i]}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {attendanceData.map((status, idx) => (
              <div
                key={idx}
                className={`aspect-square flex flex-col items-center justify-center transition-all duration-200 ${
                  status === 1 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                  status === 0 ? 'bg-red-100 text-red-600 border border-red-200' :
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}
              >
                <span className="text-[10px] sm:text-sm font-semibold">{idx + 1}</span>
                {status !== null && (
                  <span className="text-[7px] sm:text-[10px] font-medium opacity-80 mt-0.5 sm:mt-1">
                    09:00 AM
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-100 border border-emerald-200"></span> Present
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-100 border border-red-200"></span> Absent
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseAttendance;
