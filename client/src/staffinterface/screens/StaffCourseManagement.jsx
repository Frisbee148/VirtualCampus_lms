import React, { useState } from "react";
import StaffLayout from "../StaffLayout";
import {
  Search,
  Plus,
  Filter,
  Edit3,
  Archive,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const allCourses = [
  { id: 1, name: "Data Structures", code: "CS301", term: "Spring 2026", status: "active", instructor: "Prof. Amit Verma", sections: 2, enrolled: 85 },
  { id: 2, name: "Machine Learning", code: "CS405", term: "Spring 2026", status: "active", instructor: "Dr. Meera Patel", sections: 1, enrolled: 42 },
  { id: 3, name: "Thermodynamics", code: "ME205", term: "Spring 2026", status: "active", instructor: "Dr. Ramesh Iyer", sections: 2, enrolled: 68 },
  { id: 4, name: "Digital Electronics", code: "EE201", term: "Spring 2026", status: "active", instructor: "Dr. Kavita Singh", sections: 1, enrolled: 55 },
  { id: 5, name: "Communication Skills", code: "HS102", term: "Fall 2025", status: "archived", instructor: "Dr. Smita Roy", sections: 3, enrolled: 0 },
  { id: 6, name: "Linear Algebra", code: "MA201", term: "Spring 2026", status: "active", instructor: null, sections: 2, enrolled: 72 },
  { id: 7, name: "Computer Networks", code: "CS303", term: "Spring 2026", status: "active", instructor: "Prof. Suresh Iyer", sections: 1, enrolled: 38 },
  { id: 8, name: "Operating Systems", code: "CS302", term: "Spring 2026", status: "active", instructor: null, sections: 2, enrolled: 64 },
  { id: 9, name: "Signals & Systems", code: "EE301", term: "Spring 2026", status: "active", instructor: "Dr. Kavita Singh", sections: 1, enrolled: 45 },
  { id: 10, name: "Fluid Mechanics", code: "ME301", term: "Fall 2025", status: "archived", instructor: "Dr. Ramesh Iyer", sections: 1, enrolled: 0 },
];

const STATUS_FILTER = ["all", "active", "archived"];
const PAGE_SIZE = 8;

const statusColors = {
  active: "bg-emerald-50 text-emerald-700",
  archived: "bg-gray-100 text-gray-500",
};

const StaffCourseManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // create | edit | assign
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({ name: "", code: "", term: "Spring 2026", instructor: "" });

  const filtered = allCourses.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.code.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openCreate = () => {
    setSelectedCourse(null);
    setModalType("create");
    setFormData({ name: "", code: "", term: "Spring 2026", instructor: "" });
    setShowModal(true);
  };

  const openEdit = (course) => {
    setSelectedCourse(course);
    setModalType("edit");
    setFormData({ name: course.name, code: course.code, term: course.term, instructor: course.instructor || "" });
    setShowModal(true);
  };

  const openAssign = (course) => {
    setSelectedCourse(course);
    setModalType("assign");
    setFormData({ ...formData, instructor: course.instructor || "" });
    setShowModal(true);
  };

  return (
    <StaffLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Course Management</h2>
            <p className="text-sm text-gray-400">{filtered.length} courses</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-4 py-2 bg-[#18181b] text-white text-xs font-medium hover:bg-[#1a1d27] transition-colors"
          >
            Create Course
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 text-xs border border-gray-200 bg-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-400"
            >
              {STATUS_FILTER.map((s) => (
                <option key={s} value={s}>{s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">Code</th>
                  <th className="text-left px-4 py-2.5 font-medium">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium">Term</th>
                  <th className="text-left px-4 py-2.5 font-medium">Instructor</th>
                  <th className="text-left px-4 py-2.5 font-medium">Sections</th>
                  <th className="text-left px-4 py-2.5 font-medium">Enrolled</th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-gray-800">{c.code}</td>
                    <td className="px-4 py-3 text-gray-700">{c.name}</td>
                    <td className="px-4 py-3 text-gray-500">{c.term}</td>
                    <td className="px-4 py-3">
                      {c.instructor ? (
                        <span className="text-gray-700">{c.instructor}</span>
                      ) : (
                        <span className="text-red-400 text-[10px] font-medium">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.sections}</td>
                    <td className="px-4 py-3 text-gray-600">{c.enrolled}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[c.status]}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors" title="Edit">
                          <Edit3 size={13} />
                        </button>
                        {!c.instructor && (
                          <button onClick={() => openAssign(c)} className="p-1.5 text-gray-400 hover:text-zinc-800 hover:bg-gray-100 transition-colors" title="Assign Instructor">
                            <UserPlus size={13} />
                          </button>
                        )}
                        {c.status === "active" && (
                          <button className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Archive">
                            <Archive size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-50">
            {paginated.map((c) => (
              <div key={c.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.code} — {c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{c.instructor || "Unassigned"} · {c.sections} sections · {c.enrolled} enrolled</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-gray-400">{c.term}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[c.status]}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-black">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {paginated.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-400">No courses found</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft size={14} />
              </button>
              <span className="text-[10px] text-gray-500 px-2">Page {page} of {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {modalType === "create" ? "Create Course" : modalType === "assign" ? "Assign Instructor" : "Edit Course"}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-black transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                {modalType === "assign" ? (
                  <div>
                    <p className="text-xs text-gray-500 mb-3">Assigning instructor for <strong>{selectedCourse?.code}</strong> — {selectedCourse?.name}</p>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Instructor Name</label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="Search or enter instructor name"
                    />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Course Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                          placeholder="e.g. Data Structures"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Course Code</label>
                        <input
                          type="text"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                          placeholder="e.g. CS301"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Term</label>
                        <select
                          value={formData.term}
                          onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                        >
                          <option>Spring 2026</option>
                          <option>Fall 2026</option>
                          <option>Summer 2026</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Instructor</label>
                        <input
                          type="text"
                          value={formData.instructor}
                          onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs bg-[#18181b] text-white font-medium hover:bg-[#1a1d27] transition-colors">
                  {modalType === "create" ? "Create" : modalType === "assign" ? "Assign" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffCourseManagement;
