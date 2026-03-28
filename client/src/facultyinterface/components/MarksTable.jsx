import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';

const MarksTable = ({ sections }) => {
  const [students, setStudents] = useState([
    { id: 1, name: 'X', marks: { 1: 9 } },
    { id: 2, name: 'Y', marks: { 1: 3 } },
  ]);
  const [editing, setEditing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalWeightage = sections.reduce((sum, s) => sum + s.weightage, 0);

  const addStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents(prev => [...prev, { id: newId, name: `Student ${newId}`, marks: {} }]);
  };

  const updateMark = (studentId, sectionId, value) => {
    setStudents(prev => prev.map(s =>
      s.id === studentId
        ? { ...s, marks: { ...s.marks, [sectionId]: Number(value) || 0 } }
        : s
    ));
  };

  const updateStudentName = (studentId, name) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, name } : s));
  };

  const getTotalMarks = (student) => {
    return sections.reduce((sum, sec) => sum + (student.marks[sec.id] || 0), 0);
  };

  return (
    <div>
      {/* Weightage banner and edit */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="bg-[#e8a435] text-white px-6 py-2 text-sm font-semibold rounded-sm">
          Total weightage = {totalWeightage}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`px-6 py-2 text-sm font-medium border-2 transition-all duration-200 ${
            editing
              ? 'border-red-400 text-red-600 hover:bg-red-50'
              : 'border-[#2d8a4e] text-[#2d8a4e] hover:bg-green-50'
          }`}
        >
          {editing ? 'done' : 'edit'}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#1a7a7a] text-white">
              <th className="text-left px-4 py-3 font-semibold min-w-[120px]">Student name</th>
              {sections.map(sec => (
                <th key={sec.id} className="text-left px-4 py-3 font-semibold min-w-[100px]">
                  {sec.name}<br />
                  <span className="font-normal text-xs">( max {sec.weightage})</span>
                </th>
              ))}
              <th className="text-left px-4 py-3 font-semibold min-w-[110px]">
                Total marks<br />
                <span className="font-normal text-xs">(max {totalWeightage})</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200/60'}>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => updateStudentName(student.id, e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-full max-w-[100px]"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                {sections.map(sec => (
                  <td key={sec.id} className="px-4 py-3">
                    {editing ? (
                      <input
                        type="number"
                        value={student.marks[sec.id] || ''}
                        onChange={(e) => updateMark(student.id, sec.id, e.target.value)}
                        className="bg-white border border-gray-300 px-2 py-1 text-sm w-16"
                        max={sec.weightage}
                      />
                    ) : (
                      student.marks[sec.id] || ''
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 font-medium">{getTotalMarks(student) || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add student */}
      <button
        onClick={addStudent}
        className="flex items-center gap-1 mt-4 text-sm text-gray-700 hover:text-[#1a7a7a] transition-colors"
      >
        Add student <Plus size={16} className="text-[#1a7a7a]" />
      </button>

      {/* Search FAB */}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="flex items-center gap-1 bg-[#4a4a4a] text-white px-4 py-3 rounded shadow-lg hover:bg-[#333] transition-colors"
        >
          <Search size={18} />
          <ChevronDown size={14} className={`transition-transform ${searchOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default MarksTable;
