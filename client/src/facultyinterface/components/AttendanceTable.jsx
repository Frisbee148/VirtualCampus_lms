import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DATE_RANGES = ['1-5', '6-10', '11-15', '16-20', '21-25', '26-31'];

const AttendanceTable = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('1-5');
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: 'X', attendance: {} },
    { id: 2, name: 'Y', attendance: {} },
  ]);

  // Generate date columns from the selected range
  const getDatesFromRange = () => {
    if (!selectedDateRange) return ['date1', 'date2', 'date3', 'date4', 'date5'];
    const [start, end] = selectedDateRange.split('-').map(Number);
    const dates = [];
    for (let i = start; i <= end; i++) {
      dates.push(i);
    }
    return dates;
  };

  const dates = getDatesFromRange();

  const toggleAttendance = (studentId, date) => {
    const key = `${selectedMonth}-${date}`;
    setStudents(prev => prev.map(s =>
      s.id === studentId
        ? { ...s, attendance: { ...s.attendance, [key]: !s.attendance[key] } }
        : s
    ));
  };

  const isAbsent = (student, date) => {
    const key = `${selectedMonth}-${date}`;
    return student.attendance[key] || false;
  };

  const addStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents(prev => [...prev, { id: newId, name: `Student ${newId}`, attendance: {} }]);
  };

  const updateStudentName = (studentId, name) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, name } : s));
  };

  return (
    <div>
      {/* Controls row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {/* Month dropdown */}
          <div className="relative">
            <button
              onClick={() => { setMonthDropdownOpen(!monthDropdownOpen); setDateDropdownOpen(false); }}
              className="bg-[#1a7a7a] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex items-center gap-2"
            >
              {selectedMonth || 'Select month'}
              <ChevronDown size={14} className="text-[#90ee90]" />
            </button>
            {monthDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 max-h-48 overflow-y-auto min-w-[140px]">
                {MONTHS.map(month => (
                  <button
                    key={month}
                    onClick={() => { setSelectedMonth(month); setMonthDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#1a7a7a]/10 transition-colors ${
                      selectedMonth === month ? 'bg-[#1a7a7a]/20 font-medium' : ''
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date range dropdown */}
          <div className="relative">
            <button
              onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setMonthDropdownOpen(false); }}
              className="bg-[#1a7a7a] text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium flex items-center gap-2"
            >
              {selectedDateRange ? `Select dates` : 'Select dates'}
              <ChevronDown size={14} className="text-[#90ee90]" />
            </button>
            {dateDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[120px]">
                {DATE_RANGES.map(range => (
                  <button
                    key={range}
                    onClick={() => { setSelectedDateRange(range); setDateDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#1a7a7a]/10 transition-colors ${
                      selectedDateRange === range ? 'bg-[#1a7a7a]/20 font-medium' : ''
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium border-2 transition-all duration-200 ${
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
        <table className="w-full border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-[#1a7a7a] text-white">
              <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[80px] sm:min-w-[120px]">Student name</th>
              {dates.map(date => (
                <th key={date} className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[60px] sm:min-w-[80px]">
                  {typeof date === 'number' ? `${selectedMonth ? selectedMonth.slice(0, 3) : ''} ${date}` : date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200/60'}>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {editing ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={(e) => updateStudentName(student.id, e.target.value)}
                      className="bg-white border border-gray-300 px-2 py-1 text-xs sm:text-sm w-full"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                {dates.map(date => (
                  <td key={date} className="px-2 sm:px-4 py-2 sm:py-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAbsent(student, date)}
                        onChange={() => toggleAttendance(student.id, date)}
                        disabled={!editing}
                        className="w-4 h-4 accent-[#1a7a7a] cursor-pointer"
                      />
                      {isAbsent(student, date) && (
                        <span className="text-xs text-gray-600">absent</span>
                      )}
                    </label>
                  </td>
                ))}
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
        <button className="flex items-center gap-1 bg-[#4a4a4a] text-white px-4 py-3 rounded shadow-lg hover:bg-[#333] transition-colors">
          <Search size={18} />
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
