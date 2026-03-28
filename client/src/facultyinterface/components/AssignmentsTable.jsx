import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';

const AssignmentsTable = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, profName: '', name: 'A', description: '', dueDate: '', file: null, submissionClosed: false },
    { id: 2, profName: '', name: 'B', description: '', dueDate: '', file: null, submissionClosed: false },
  ]);
  const [editing, setEditing] = useState(false);

  // Auto-close submissions when due date exceeds current date
  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setAssignments(prev => prev.map(a => {
      if (a.dueDate) {
        const due = new Date(a.dueDate);
        due.setHours(0, 0, 0, 0);
        if (due < now) {
          return { ...a, submissionClosed: true };
        }
      }
      return a;
    }));
  }, []);

  const addAssignment = () => {
    const newId = assignments.length > 0 ? Math.max(...assignments.map(a => a.id)) + 1 : 1;
    setAssignments(prev => [...prev, {
      id: newId, profName: '', name: '', description: '', dueDate: '', file: null, submissionClosed: false
    }]);
  };

  const updateAssignment = (id, field, value) => {
    setAssignments(prev => prev.map(a => {
      if (a.id !== id) return a;
      const updated = { ...a, [field]: value };
      // Auto-close if due date is set and past
      if (field === 'dueDate' && value) {
        const due = new Date(value);
        due.setHours(0, 0, 0, 0);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (due < now) {
          updated.submissionClosed = true;
        }
      }
      return updated;
    }));
  };

  const toggleSubmission = (id) => {
    setAssignments(prev => prev.map(a =>
      a.id === id ? { ...a, submissionClosed: !a.submissionClosed } : a
    ));
  };

  return (
    <div>
      {/* Edit button */}
      <div className="flex items-center justify-end mb-4">
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
              <th className="text-left px-4 py-3 font-semibold min-w-[110px]">Prof. name</th>
              <th className="text-left px-4 py-3 font-semibold min-w-[120px]">Assignment name</th>
              <th className="text-left px-4 py-3 font-semibold min-w-[130px]">Description</th>
              <th className="text-left px-4 py-3 font-semibold min-w-[110px]">Due date</th>
              <th className="text-left px-4 py-3 font-semibold min-w-[110px]">Upload file</th>
              <th className="text-left px-4 py-3 font-semibold min-w-[120px]">Submission close</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, idx) => (
              <tr key={assignment.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200/60'}>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={assignment.profName}
                      onChange={(e) => updateAssignment(assignment.id, 'profName', e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-full max-w-[100px]"
                    />
                  ) : (
                    assignment.profName
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={assignment.name}
                      onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-full max-w-[100px]"
                    />
                  ) : (
                    assignment.name
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={assignment.description}
                      onChange={(e) => updateAssignment(assignment.id, 'description', e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm w-full max-w-[130px]"
                    />
                  ) : (
                    assignment.description
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="date"
                      value={assignment.dueDate}
                      onChange={(e) => updateAssignment(assignment.id, 'dueDate', e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-sm"
                    />
                  ) : (
                    assignment.dueDate
                  )}
                </td>
                <td className="px-4 py-3">
                  {editing ? (
                    <input
                      type="file"
                      onChange={(e) => updateAssignment(assignment.id, 'file', e.target.files[0])}
                      className="text-xs w-full max-w-[120px]"
                    />
                  ) : (
                    assignment.file ? (
                      <span className="text-[#1a7a7a] text-xs">{assignment.file.name}</span>
                    ) : ''
                  )}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={assignment.submissionClosed}
                    onChange={() => toggleSubmission(assignment.id)}
                    disabled={!editing}
                    className="w-4 h-4 accent-[#1a7a7a] cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add section */}
      <button
        onClick={addAssignment}
        className="flex items-center gap-1 mt-4 text-sm text-gray-700 hover:text-[#1a7a7a] transition-colors"
      >
        Add section <Plus size={16} className="text-[#1a7a7a]" />
      </button>

      {/* Search FAB */}
      <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
        <button className="flex items-center gap-1 bg-[#4a4a4a] text-white px-4 py-3 rounded shadow-lg hover:bg-[#333] transition-colors">
          <Search size={18} />
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default AssignmentsTable;
