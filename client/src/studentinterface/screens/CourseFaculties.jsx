import React from 'react';
import StudentLayout from '../StudentLayout';
import { CourseTabs } from './CourseOverview';

const CourseFaculties = () => {
  const teachers = [
    { name: 'Dr. Teacher 1', branch: 'CSE', room: '202', email: 'teacher1@mail.com' },
    { name: 'Dr. Teacher 2', branch: 'CSE', room: '203', email: 'teacher2@mail.com' }
  ];

  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">ABC Course</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6">Faculty members</p>
        <CourseTabs active="faculties" />

        {/* Desktop table */}
        <div className="hidden sm:block bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#242424] text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Name</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Department</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Room</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-medium text-gray-900">{t.name}</td>
                  <td className="py-4 px-5 text-sm text-gray-600">{t.branch}</td>
                  <td className="py-4 px-5 text-sm text-gray-600">{t.room}</td>
                  <td className="py-4 px-5 text-sm text-black">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="sm:hidden space-y-3">
          {teachers.map((t, idx) => (
            <div key={idx} className="bg-white border border-gray-200 p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{t.name}</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Department</span>
                  <span className="text-xs text-gray-600">{t.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Room</span>
                  <span className="text-xs text-gray-600">{t.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-gray-400 uppercase">Email</span>
                  <span className="text-xs text-black break-all">{t.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default CourseFaculties;
