import React, { useState } from "react";
import HodLayout from "../HodLayout";

const courses = [
  { id: 1, code: "CS501", name: "Cloud Computing", semester: 7, students: 35, schedule: "MWF 11:00-12:00" },
  { id: 2, code: "CS701", name: "Research Methodology", semester: 9, students: 18, schedule: "TTh 3:00-4:30" },
];

const HodMyCourses = () => {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  return (
    <HodLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">My Courses</h2>

        {/* Course selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourse(c)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCourse.id === c.id
                  ? "bg-[#1a7a7a] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>

        {/* Course Details */}
        <div className="bg-white border border-gray-100 shadow-sm p-4 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-1">{selectedCourse.code} — {selectedCourse.name}</h3>
          <p className="text-xs text-gray-400 mb-4">Semester {selectedCourse.semester} · {selectedCourse.schedule}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-[#1a7a7a]">{selectedCourse.students}</p>
              <p className="text-[10px] text-gray-400">Students</p>
            </div>
            <div className="bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-[#e8a435]">82%</p>
              <p className="text-[10px] text-gray-400">Avg Attendance</p>
            </div>
            <div className="bg-gray-50 p-3 text-center">
              <p className="text-xl font-bold text-[#2d8a4e]">7.8</p>
              <p className="text-[10px] text-gray-400">Avg CGPA</p>
            </div>
          </div>

          {/* Recent Activity */}
          <h4 className="text-xs font-semibold text-gray-700 mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {[
              { action: "Quiz 1 graded", time: "2 days ago" },
              { action: "Assignment 3 deadline extended", time: "4 days ago" },
              { action: "Attendance marked — Lecture 24", time: "5 days ago" },
              { action: "Mid-sem marks uploaded", time: "1 week ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs text-gray-700">{a.action}</p>
                <span className="text-[10px] text-gray-400">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HodLayout>
  );
};

export default HodMyCourses;
