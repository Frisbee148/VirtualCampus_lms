import React from 'react';
import StudentLayout from '../StudentLayout';
import { CourseTabs } from './CourseOverview';

const CourseAttendance = () => {
  const attendanceData = [
    1, 1, 1, 0, 1, 1, 1,
    1, 0, 1, 1, 1, 1, 1,
    1, 1, 0, 1, 1, 1, 1,
    1, 1, null, null, null, null, null,
    null, null, null, null, null, null, null
  ];
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dayLabelsFull = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const present = attendanceData.filter(s => s === 1).length;
  const absent = attendanceData.filter(s => s === 0).length;

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ABC Course</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Attendance tracking</p>
        <CourseTabs active="attendance" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10">
          <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Your Attendance</p>
            <p className="text-xl sm:text-3xl font-bold text-gray-900">86%</p>
          </div>
          <div className="bg-white border border-gray-100 shadow-sm p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Required</p>
            <p className="text-xl sm:text-3xl font-bold text-gray-900">85%</p>
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
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-5">October 2024</h3>
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
                className={`aspect-square flex items-center justify-center text-[10px] sm:text-sm font-semibold transition-all duration-200 ${
                  status === 1 ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                  status === 0 ? 'bg-red-100 text-red-600 border border-red-200' :
                  'bg-gray-50 text-gray-300 border border-gray-100'
                }`}
              >
                {idx + 1}
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
