import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const MarksTable = ({ sections }) => {
  const [students, setStudents] = useState([
    { id: 1, name: "X", marks: { 1: 9 } },
    { id: 2, name: "Y", marks: { 1: 3 } },
  ]);
  const [editing, setEditing] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalWeightage = sections.reduce((sum, s) => sum + s.weightage, 0);

  const addStudent = () => {
    const newId =
      students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    setStudents((prev) => [
      ...prev,
      { id: newId, name: `Student ${newId}`, marks: {} },
    ]);
  };

  const updateMark = (studentId, sectionId, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, marks: { ...s.marks, [sectionId]: Number(value) || 0 } }
          : s,
      ),
    );
  };

  const updateStudentName = (studentId, name) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, name } : s)),
    );
  };

  const getTotalMarks = (student) => {
    return sections.reduce((sum, sec) => sum + (student.marks[sec.id] || 0), 0);
  };

  return (
    <div>
      {/* Weightage banner and edit */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="bg-[#e8a435] text-white px-3 sm:px-6 py-2 text-xs sm:text-sm font-semibold rounded-sm">
          Total weightage = {totalWeightage}
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium border-2 transition-all duration-200 ${
            editing
              ? "border-red-400 text-red-600 hover:bg-red-50"
              : "border-[#2d8a4e] text-[#2d8a4e] hover:bg-green-50"
          }`}
        >
          {editing ? "done" : "edit"}
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-[#4E545C] text-white">
              <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm">
                Student name
              </th>
              {sections.map((sec) => (
                <th
                  key={sec.id}
                  className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[70px] sm:min-w-[100px] text-xs sm:text-sm"
                >
                  {sec.name}
                  <br />
                  <span className="font-normal text-xs">
                    ( max {sec.weightage})
                  </span>
                </th>
              ))}
              <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[70px] sm:min-w-[110px] text-xs sm:text-sm">
                Total marks
                <br />
                <span className="font-normal text-xs">
                  (max {totalWeightage})
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.id}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-gray-200/60"}
              >
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) =>
                        updateStudentName(student.id, e.target.value)
                      }
                      className="bg-white border border-gray-300 px-2 py-1 text-xs sm:text-sm w-full"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                {sections.map((sec) => (
                  <td key={sec.id} className="px-2 sm:px-4 py-2 sm:py-3">
                    {editing ? (
                      <input
                        type="number"
                        value={student.marks[sec.id] || ""}
                        onChange={(e) =>
                          updateMark(student.id, sec.id, e.target.value)
                        }
                        className="bg-white border border-gray-300 px-2 py-1 text-xs sm:text-sm w-14 sm:w-16"
                        max={sec.weightage}
                      />
                    ) : (
                      student.marks[sec.id] || ""
                    )}
                  </td>
                ))}
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-xs sm:text-sm">
                  {getTotalMarks(student) || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border border-gray-200 p-3 space-y-2.5"
          >
            <div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                Student
              </p>
              {editing ? (
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    updateStudentName(student.id, e.target.value)
                  }
                  className="bg-white border border-gray-300 px-2 py-1.5 text-sm w-full mt-1"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {student.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              {sections.map((sec) => (
                <div
                  key={sec.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-xs text-gray-600">
                    {sec.name} (max {sec.weightage})
                  </span>
                  {editing ? (
                    <input
                      type="number"
                      value={student.marks[sec.id] || ""}
                      onChange={(e) =>
                        updateMark(student.id, sec.id, e.target.value)
                      }
                      className="bg-white border border-gray-300 px-2 py-1 text-xs w-20"
                      max={sec.weightage}
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      {student.marks[sec.id] || "-"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-1 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Total
              </span>
              <span className="text-sm font-semibold text-gray-800">
                {getTotalMarks(student) || 0} / {totalWeightage}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add student */}
      <button
        onClick={addStudent}
        className="flex items-center gap-1 mt-4 text-sm text-gray-700 hover:text-[#4E545C] transition-colors"
      >
        Add student
      </button>

      {/* Search FAB */}
      {/* Search FAB removed */}
    </div>
  );
};

export default MarksTable;
