import React, { useState } from "react";
import AdminOfficerLayout from "../AdminOfficerLayout";
import { Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

const courses = [
  { id: "CS301", name: "Data Structures", dept: "CSE", instructor: "Dr. Amit Verma", enrolled: 62, capacity: 70, status: "active", completion: 78, submissions: 89 },
  { id: "CS405", name: "Machine Learning", dept: "CSE", instructor: "Prof. Neha Gupta", enrolled: 55, capacity: 60, status: "active", completion: 82, submissions: 91 },
  { id: "EE101", name: "Circuit Theory", dept: "EE", instructor: "Dr. Rajesh Kumar", enrolled: 48, capacity: 50, status: "active", completion: 71, submissions: 78 },
  { id: "ME205", name: "Thermodynamics", dept: "ME", instructor: "Prof. Suresh Rao", enrolled: 40, capacity: 55, status: "active", completion: 65, submissions: 72 },
  { id: "EC202", name: "Signals & Systems", dept: "ECE", instructor: "Dr. Priya Sharma", enrolled: 58, capacity: 60, status: "active", completion: 88, submissions: 94 },
  { id: "HS102", name: "Communication Skills", dept: "HSS", instructor: "Dr. Anita Das", enrolled: 45, capacity: 50, status: "active", completion: 95, submissions: 97 },
  { id: "MA201", name: "Linear Algebra", dept: "Math", instructor: "Prof. Vikram Singh", enrolled: 70, capacity: 70, status: "active", completion: 80, submissions: 85 },
  { id: "CE301", name: "Structural Analysis", dept: "CE", instructor: null, enrolled: 32, capacity: 50, status: "active", completion: 42, submissions: 55 },
  { id: "PH101", name: "Physics Lab", dept: "Physics", instructor: "Dr. Meera Patel", enrolled: 60, capacity: 65, status: "active", completion: 90, submissions: 92 },
  { id: "CS201", name: "Operating Systems", dept: "CSE", instructor: null, enrolled: 0, capacity: 60, status: "inactive", completion: 0, submissions: 0 },
  { id: "EE305", name: "Power Electronics", dept: "EE", instructor: "Prof. Deepak Joshi", enrolled: 35, capacity: 45, status: "active", completion: 68, submissions: 74 },
  { id: "ME301", name: "Fluid Mechanics", dept: "ME", instructor: null, enrolled: 28, capacity: 50, status: "active", completion: 38, submissions: 48 },
];

const departments = ["All", "CSE", "ECE", "ME", "EE", "CE", "HSS", "Math", "Physics"];
const statuses = ["All", "active", "inactive"];

const AOCourseOversight = () => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const filtered = courses
    .filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (deptFilter !== "All" && c.dept !== deptFilter) return false;
      if (statusFilter !== "All" && c.status !== statusFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      if (typeof av === "number") return sortAsc ? av - bv : bv - av;
      return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const handleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const completionColor = (val) => {
    if (val >= 80) return "text-emerald-600 bg-emerald-50";
    if (val >= 60) return "text-amber-600 bg-amber-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <AdminOfficerLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Course <span className="font-semibold">Oversight</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Read-only monitoring of academic offerings
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
          <div className="bg-white p-3 border border-gray-100">
            <p className="text-2xl font-bold text-gray-800">{courses.length}</p>
            <p className="text-[10px] text-gray-400">Total Courses</p>
          </div>
          <div className="bg-white p-3 border border-gray-100">
            <p className="text-2xl font-bold text-emerald-600">{courses.filter((c) => c.status === "active").length}</p>
            <p className="text-[10px] text-gray-400">Active</p>
          </div>
          <div className="bg-white p-3 border border-gray-100">
            <p className="text-2xl font-bold text-red-600">{courses.filter((c) => !c.instructor).length}</p>
            <p className="text-[10px] text-gray-400">No Instructor</p>
          </div>
          <div className="bg-white p-3 border border-gray-100">
            <p className="text-2xl font-bold text-amber-600">{courses.filter((c) => c.completion < 50 && c.status === "active").length}</p>
            <p className="text-[10px] text-gray-400">Low Completion</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-gray-200 bg-white focus:outline-none focus:border-gray-400"
            />
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-400"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d === "All" ? "All Depts" : d}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-gray-200 bg-white px-3 py-2 text-gray-600 focus:outline-none focus:border-gray-400"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Table — Desktop */}
        <div className="bg-white border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium cursor-pointer select-none" onClick={() => handleSort("id")}>
                    <span className="flex items-center gap-1">Code <SortIcon field="id" /></span>
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium cursor-pointer select-none" onClick={() => handleSort("name")}>
                    <span className="flex items-center gap-1">Course <SortIcon field="name" /></span>
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Dept</th>
                  <th className="text-left px-4 py-2.5 font-medium">Instructor</th>
                  <th className="text-left px-4 py-2.5 font-medium cursor-pointer select-none" onClick={() => handleSort("enrolled")}>
                    <span className="flex items-center gap-1">Enrolled <SortIcon field="enrolled" /></span>
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium cursor-pointer select-none" onClick={() => handleSort("completion")}>
                    <span className="flex items-center gap-1">Completion <SortIcon field="completion" /></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <React.Fragment key={c.id}>
                    <tr
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                    >
                      <td className="px-4 py-3 font-mono font-medium text-gray-700">{c.id}</td>
                      <td className="px-4 py-3 text-gray-800">{c.name}</td>
                      <td className="px-4 py-3 text-gray-500">{c.dept}</td>
                      <td className="px-4 py-3">
                        {c.instructor ? (
                          <span className="text-gray-700">{c.instructor}</span>
                        ) : (
                          <span className="text-red-500 font-medium">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.enrolled}/{c.capacity}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 ${
                          c.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium px-2 py-0.5 ${completionColor(c.completion)}`}>
                          {c.completion}%
                        </span>
                      </td>
                    </tr>
                    {expandedId === c.id && (
                      <tr className="bg-gray-50/80">
                        <td colSpan={7} className="px-4 py-3">
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <p className="text-gray-400 mb-1">Enrollment</p>
                              <p className="text-gray-700 font-medium">{c.enrolled} / {c.capacity} ({Math.round((c.enrolled / c.capacity) * 100)}% filled)</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Submission Rate</p>
                              <p className="text-gray-700 font-medium">{c.submissions}%</p>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-1">Completion</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${c.completion >= 80 ? "bg-emerald-500" : c.completion >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                                    style={{ width: `${c.completion}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-600 font-medium">{c.completion}%</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-50">
            {filtered.map((c) => (
              <div key={c.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <p className="text-xs font-medium text-gray-800">{c.id} — {c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {c.dept} · {c.instructor || "Unassigned"}
                    </p>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 flex-shrink-0 ${
                    c.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
                  }`}>
                    {c.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-gray-500">
                  <span>Enrolled: {c.enrolled}/{c.capacity}</span>
                  <span>·</span>
                  <span className={completionColor(c.completion) + " px-1.5 py-0.5 font-medium"}>
                    {c.completion}% complete
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-gray-400">
              No courses match filters
            </div>
          )}
        </div>

        <p className="text-[10px] text-gray-300 mt-3">
          Showing {filtered.length} of {courses.length} courses · Read-only view
        </p>
      </div>
    </AdminOfficerLayout>
  );
};

export default AOCourseOversight;
