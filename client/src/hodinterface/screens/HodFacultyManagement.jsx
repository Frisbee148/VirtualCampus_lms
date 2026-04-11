import React, { useState } from "react";
import HodLayout from "../HodLayout";
import { Search, X, ChevronDown } from "lucide-react";

const initialFaculty = [
  { id: 1, name: "Dr. Farah Khan", designation: "Associate Professor", email: "farah.khan@lnmiit.ac.in", phone: "+91 98765 12345", courses: ["CS301", "CS405"], students: 78, avgAttendance: "88%", avgCGPA: "7.8", publications: 12, status: "active", joiningYear: "2018", cabin: "A-204", leaveBalance: 18 },
  { id: 2, name: "Prof. Amit Verma", designation: "Professor", email: "amit.verma@lnmiit.ac.in", phone: "+91 98765 23456", courses: ["CS201", "CS501", "CS601"], students: 112, avgAttendance: "82%", avgCGPA: "7.2", publications: 28, status: "active", joiningYear: "2012", cabin: "A-301", leaveBalance: 14 },
  { id: 3, name: "Dr. Neha Gupta", designation: "Assistant Professor", email: "neha.gupta@lnmiit.ac.in", phone: "+91 98765 34567", courses: ["CS102", "CS302"], students: 65, avgAttendance: "91%", avgCGPA: "8.1", publications: 6, status: "active", joiningYear: "2021", cabin: "B-105", leaveBalance: 22 },
  { id: 4, name: "Prof. Suresh Iyer", designation: "Associate Professor", email: "suresh.iyer@lnmiit.ac.in", phone: "+91 98765 45678", courses: ["CS401"], students: 45, avgAttendance: "79%", avgCGPA: "7.0", publications: 15, status: "on-leave", joiningYear: "2015", cabin: "A-210", leaveBalance: 5 },
  { id: 5, name: "Dr. Priya Sharma", designation: "Assistant Professor", email: "priya.sharma@lnmiit.ac.in", phone: "+91 98765 56789", courses: ["CS103", "CS303"], students: 90, avgAttendance: "85%", avgCGPA: "7.5", publications: 9, status: "active", joiningYear: "2019", cabin: "B-202", leaveBalance: 20 },
  { id: 6, name: "Dr. Vikram Reddy", designation: "Professor", email: "vikram.reddy@lnmiit.ac.in", phone: "+91 98765 67890", courses: ["CS502", "CS602"], students: 56, avgAttendance: "87%", avgCGPA: "7.9", publications: 35, status: "active", joiningYear: "2010", cabin: "A-105", leaveBalance: 12 },
  { id: 7, name: "Dr. Ananya Desai", designation: "Assistant Professor", email: "ananya.desai@lnmiit.ac.in", phone: "+91 98765 78901", courses: ["CS104"], students: 40, avgAttendance: "93%", avgCGPA: "8.3", publications: 4, status: "active", joiningYear: "2023", cabin: "B-301", leaveBalance: 24 },
];

const statusColors = {
  active: "bg-emerald-50 text-emerald-700",
  "on-leave": "bg-amber-50 text-amber-700",
};

const designationOptions = ["All", "Professor", "Associate Professor", "Assistant Professor"];

const HodFacultyManagement = () => {
  const [search, setSearch] = useState("");
  const [designationFilter, setDesignationFilter] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filtered = initialFaculty.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchesDesignation = designationFilter === "All" || f.designation === designationFilter;
    return matchesSearch && matchesDesignation;
  });

  return (
    <HodLayout>
      <div className="max-w-6xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Faculty Management</h2>
        <p className="text-sm text-gray-400 mb-5">{initialFaculty.length} faculty members in department</p>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 bg-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="w-full sm:w-auto px-4 py-2.5 text-sm border border-gray-200 bg-white flex items-center justify-between sm:justify-start gap-2 hover:bg-gray-50 transition-colors"
            >
              {designationFilter} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 right-0 sm:right-auto mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[200px]">
                {designationOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setDesignationFilter(opt); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      designationFilter === opt ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Designation</th>
                <th className="text-left px-4 py-3 font-medium">Courses</th>
                <th className="text-left px-4 py-3 font-medium">Students</th>
                <th className="text-left px-4 py-3 font-medium">Avg Attendance</th>
                <th className="text-left px-4 py-3 font-medium">Publications</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  onClick={() => setSelectedFaculty(f)}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">{f.name}</td>
                  <td className="px-4 py-3 text-gray-600">{f.designation}</td>
                  <td className="px-4 py-3 text-gray-600">{f.courses.length}</td>
                  <td className="px-4 py-3 text-gray-600">{f.students}</td>
                  <td className="px-4 py-3 text-gray-600">{f.avgAttendance}</td>
                  <td className="px-4 py-3 text-gray-600">{f.publications}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[f.status]}`}>
                      {f.status === "on-leave" ? "On Leave" : "Active"}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No faculty found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {filtered.map((f) => (
            <div
              key={f.id}
              onClick={() => setSelectedFaculty(f)}
              className="bg-white border border-gray-100 p-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{f.name}</p>
                  <p className="text-[10px] text-gray-400">{f.designation}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${statusColors[f.status]}`}>
                  {f.status === "on-leave" ? "On Leave" : "Active"}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-[10px] text-gray-500">
                <span>{f.courses.length} courses</span>
                <span>{f.students} students</span>
                <span>{f.avgAttendance} att.</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white border border-gray-100 p-6 text-center text-gray-400 text-sm">
              No faculty found.
            </div>
          )}
        </div>

        {/* Faculty Detail Modal */}
        {selectedFaculty && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedFaculty(null)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-lg bg-white rounded-lg shadow-2xl z-50 max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">{selectedFaculty.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{selectedFaculty.designation}</p>
                </div>
                <button onClick={() => setSelectedFaculty(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {/* Contact */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Email", value: selectedFaculty.email },
                    { label: "Phone", value: selectedFaculty.phone },
                    { label: "Cabin", value: selectedFaculty.cabin },
                    { label: "Joining Year", value: selectedFaculty.joiningYear },
                    { label: "Leave Balance", value: `${selectedFaculty.leaveBalance} days` },
                    { label: "Status", value: selectedFaculty.status === "on-leave" ? "On Leave" : "Active" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[10px] text-gray-400 font-medium uppercase">{item.label}</p>
                      <p className="text-xs text-gray-800 font-medium mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Performance</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Courses", value: selectedFaculty.courses.length },
                      { label: "Students", value: selectedFaculty.students },
                      { label: "Avg CGPA", value: selectedFaculty.avgCGPA },
                      { label: "Publications", value: selectedFaculty.publications },
                    ].map((s) => (
                      <div key={s.label} className="bg-gray-50 p-2.5 text-center">
                        <p className="text-lg font-bold text-gray-800">{s.value}</p>
                        <p className="text-[10px] text-gray-400">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Assigned Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFaculty.courses.map((c) => (
                      <span key={c} className="px-3 py-1 text-xs font-medium bg-[#1a7a7a]/10 text-[#1a7a7a] rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Avg Class Attendance</h4>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-[#1a7a7a] h-2.5 rounded-full transition-all"
                      style={{ width: selectedFaculty.avgAttendance }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{selectedFaculty.avgAttendance} average across all courses</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </HodLayout>
  );
};

export default HodFacultyManagement;
