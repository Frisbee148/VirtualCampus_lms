import React, { useState } from "react";
import HodLayout from "../HodLayout";
import { X, Plus, ChevronDown, ChevronRight } from "lucide-react";

const initialCourses = [
  { id: 1, code: "CS102", name: "Programming Fundamentals", credits: 4, semester: 1, faculty: "Dr. Neha Gupta", students: 45, schedule: "MWF 9:00-10:00", type: "Core" },
  { id: 2, code: "CS103", name: "Data Structures", credits: 4, semester: 2, faculty: "Dr. Priya Sharma", students: 48, schedule: "TTh 10:00-11:30", type: "Core" },
  { id: 3, code: "CS104", name: "Discrete Mathematics", credits: 3, semester: 2, faculty: "Dr. Ananya Desai", students: 40, schedule: "MWF 11:00-12:00", type: "Core" },
  { id: 4, code: "CS201", name: "Object Oriented Programming", credits: 4, semester: 3, faculty: "Prof. Amit Verma", students: 42, schedule: "MWF 10:00-11:00", type: "Core" },
  { id: 5, code: "CS301", name: "Database Systems", credits: 4, semester: 5, faculty: "Dr. Farah Khan", students: 38, schedule: "TTh 9:00-10:30", type: "Core" },
  { id: 6, code: "CS302", name: "Computer Networks", credits: 3, semester: 5, faculty: "Dr. Neha Gupta", students: 20, schedule: "MWF 2:00-3:00", type: "Core" },
  { id: 7, code: "CS303", name: "Software Engineering", credits: 3, semester: 5, faculty: "Dr. Priya Sharma", students: 42, schedule: "TTh 2:00-3:30", type: "Core" },
  { id: 8, code: "CS401", name: "Compiler Design", credits: 3, semester: 7, faculty: "Prof. Suresh Iyer", students: 45, schedule: "MWF 9:00-10:00", type: "Core" },
  { id: 9, code: "CS405", name: "Machine Learning", credits: 4, semester: 5, faculty: "Dr. Farah Khan", students: 40, schedule: "TTh 11:00-12:30", type: "Elective" },
  { id: 10, code: "CS501", name: "Cloud Computing", credits: 3, semester: 7, faculty: "Prof. Amit Verma", students: 35, schedule: "MWF 11:00-12:00", type: "Elective" },
  { id: 11, code: "CS502", name: "Information Security", credits: 3, semester: 7, faculty: "Dr. Vikram Reddy", students: 28, schedule: "TTh 9:00-10:30", type: "Elective" },
  { id: 12, code: "CS601", name: "Advanced Algorithms", credits: 3, semester: 7, faculty: "Prof. Amit Verma", students: 35, schedule: "MWF 3:00-4:00", type: "Elective" },
  { id: 13, code: "CS602", name: "Deep Learning", credits: 3, semester: 7, faculty: "Dr. Vikram Reddy", students: 28, schedule: "TTh 2:00-3:30", type: "Elective" },
];

const facultyList = [
  "Dr. Farah Khan", "Prof. Amit Verma", "Dr. Neha Gupta",
  "Prof. Suresh Iyer", "Dr. Priya Sharma", "Dr. Vikram Reddy", "Dr. Ananya Desai",
];

const semesterOptions = ["All", "1", "2", "3", "5", "7"];
const typeOptions = ["All", "Core", "Elective"];

const HodCourseAllocation = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [semFilter, setSemFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [semOpen, setSemOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAllocate, setShowAllocate] = useState(false);
  const [allocateFaculty, setAllocateFaculty] = useState("");

  const filtered = courses.filter((c) => {
    const matchesSearch = c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.faculty.toLowerCase().includes(search.toLowerCase());
    const matchesSem = semFilter === "All" || String(c.semester) === semFilter;
    const matchesType = typeFilter === "All" || c.type === typeFilter;
    return matchesSearch && matchesSem && matchesType;
  });

  const handleReassign = () => {
    if (!allocateFaculty || !selectedCourse) return;
    setCourses((prev) =>
      prev.map((c) => c.id === selectedCourse.id ? { ...c, faculty: allocateFaculty } : c)
    );
    setSelectedCourse({ ...selectedCourse, faculty: allocateFaculty });
    setShowAllocate(false);
    setAllocateFaculty("");
  };

  return (
    <HodLayout>
      <div className="max-w-6xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Course Allocation</h2>
        <p className="text-sm text-gray-400 mb-5">{courses.length} courses this semester</p>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by code, name, or faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => { setSemOpen(!semOpen); setTypeOpen(false); }}
                className="px-3 py-2.5 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                Sem: {semFilter} <ChevronDown size={14} className="text-gray-400" />
              </button>
              {semOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[120px]">
                  {semesterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSemFilter(opt); setSemOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${semFilter === opt ? "bg-gray-100 font-medium" : ""}`}
                    >
                      {opt === "All" ? "All Semesters" : `Semester ${opt}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => { setTypeOpen(!typeOpen); setSemOpen(false); }}
                className="px-3 py-2.5 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                {typeFilter} <ChevronDown size={14} className="text-gray-400" />
              </button>
              {typeOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[120px]">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setTypeFilter(opt); setTypeOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${typeFilter === opt ? "bg-gray-100 font-medium" : ""}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="text-left px-4 py-3 font-medium">Code</th>
                <th className="text-left px-4 py-3 font-medium">Course Name</th>
                <th className="text-left px-4 py-3 font-medium">Credits</th>
                <th className="text-left px-4 py-3 font-medium">Semester</th>
                <th className="text-left px-4 py-3 font-medium">Faculty</th>
                <th className="text-left px-4 py-3 font-medium">Students</th>
                <th className="text-left px-4 py-3 font-medium">Type</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCourse(c)}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-[#242424]">{c.code}</td>
                  <td className="px-4 py-3 text-gray-800">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">{c.credits}</td>
                  <td className="px-4 py-3 text-gray-600">{c.semester}</td>
                  <td className="px-4 py-3 text-gray-600">{c.faculty}</td>
                  <td className="px-4 py-3 text-gray-600">{c.students}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                      c.type === "Core" ? "bg-blue-50 text-[#242424]" : "bg-purple-50 text-purple-700"
                    }`}>
                      {c.type}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No courses found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCourse(c)}
              className="bg-white border border-gray-100 p-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{c.code} — {c.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c.faculty}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${
                  c.type === "Core" ? "bg-blue-50 text-[#242424]" : "bg-purple-50 text-purple-700"
                }`}>
                  {c.type}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
                <span>{c.credits} cr</span>
                <span>Sem {c.semester}</span>
                <span>{c.students} students</span>
              </div>
            </div>
          ))}
        </div>

        {/* Course Detail Modal */}
        {selectedCourse && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => { setSelectedCourse(null); setShowAllocate(false); }} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-lg bg-white rounded-lg shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{selectedCourse.code} — {selectedCourse.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedCourse.type} · Semester {selectedCourse.semester}</p>
                </div>
                <button onClick={() => { setSelectedCourse(null); setShowAllocate(false); }} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Credits", value: selectedCourse.credits },
                    { label: "Students", value: selectedCourse.students },
                    { label: "Schedule", value: selectedCourse.schedule },
                    { label: "Semester", value: selectedCourse.semester },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">{item.label}</p>
                      <p className="text-xs text-gray-800 font-medium mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-gray-700">Assigned Faculty</h4>
                    <button
                      onClick={() => setShowAllocate(!showAllocate)}
                      className="text-[10px] font-medium text-[#242424] hover:underline flex items-center gap-1"
                    >
                      <Plus size={12} /> Reassign
                    </button>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{selectedCourse.faculty}</p>

                  {showAllocate && (
                    <div className="mt-3 p-3 bg-gray-50 space-y-2">
                      <p className="text-[10px] font-medium text-gray-500 uppercase">Reassign to</p>
                      <select
                        value={allocateFaculty}
                        onChange={(e) => setAllocateFaculty(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:border-[#242424]"
                      >
                        <option value="">Select faculty...</option>
                        {facultyList.filter((f) => f !== selectedCourse.faculty).map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      <button
                        onClick={handleReassign}
                        disabled={!allocateFaculty}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-[#242424] hover:bg-[#15696a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        Confirm Reassignment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </HodLayout>
  );
};

export default HodCourseAllocation;
