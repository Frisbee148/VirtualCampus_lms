import React, { useState } from "react";
import StaffLayout from "../StaffLayout";
import {
  Plus,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Upload,
  Check,
  X,
} from "lucide-react";

const allEnrollments = [
  { id: 1, user: "Rahul Verma", course: "CS301 Data Structures", role: "student", status: "active" },
  { id: 2, user: "Priya Sharma", course: "CS301 Data Structures", role: "student", status: "active" },
  { id: 3, user: "Ankit Jain", course: "CS405 Machine Learning", role: "student", status: "pending" },
  { id: 4, user: "Mohit Gupta", course: "CS405 Machine Learning", role: "student", status: "pending" },
  { id: 5, user: "Neha Reddy", course: "EE201 Digital Electronics", role: "student", status: "active" },
  { id: 6, user: "Prof. Amit Verma", course: "CS301 Data Structures", role: "teacher", status: "active" },
  { id: 7, user: "Dr. Meera Patel", course: "CS405 Machine Learning", role: "teacher", status: "active" },
  { id: 8, user: "Sunil Kumar", course: "ME205 Thermodynamics", role: "student", status: "rejected" },
  { id: 9, user: "Ravi Tiwari", course: "ME205 Thermodynamics", role: "student", status: "pending" },
  { id: 10, user: "Sneha Agarwal", course: "CS303 Computer Networks", role: "student", status: "active" },
  { id: 11, user: "Mohit Gupta", course: "CS301 Data Structures", role: "student", status: "active" },
  { id: 12, user: "Rahul Verma", course: "MA201 Linear Algebra", role: "student", status: "pending" },
  { id: 13, user: "Priya Sharma", course: "EE201 Digital Electronics", role: "student", status: "active" },
  { id: 14, user: "Neha Reddy", course: "CS303 Computer Networks", role: "student", status: "pending" },
  { id: 15, user: "Ankit Jain", course: "CS302 Operating Systems", role: "student", status: "active" },
];

const ROLE_FILTER = ["all", "student", "teacher"];
const STATUS_FILTER = ["all", "active", "pending", "rejected"];
const PAGE_SIZE = 8;

const roleColors = {
  student: "bg-zinc-100 text-zinc-700",
  teacher: "bg-zinc-100 text-zinc-600",
};

const statusColors = {
  active: "bg-emerald-50 text-emerald-700",
  pending: "bg-amber-50 text-amber-700",
  rejected: "bg-red-50 text-red-600",
};

const StaffEnrollmentManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollForm, setEnrollForm] = useState({ user: "", course: "", role: "student" });

  const filtered = allEnrollments.filter((e) => {
    if (roleFilter !== "all" && e.role !== roleFilter) return false;
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (search && !e.user.toLowerCase().includes(search.toLowerCase()) && !e.course.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSelect = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    const ids = paginated.map((e) => e.id);
    const allSelected = ids.every((id) => selected.includes(id));
    setSelected(allSelected ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])]);
  };

  const pendingCount = allEnrollments.filter((e) => e.status === "pending").length;

  return (
    <StaffLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Enrollment Management</h2>
            <p className="text-sm text-gray-400">
              {filtered.length} enrollments · <span className="text-amber-600 font-medium">{pendingCount} pending</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEnrollModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#18181b] text-white text-xs font-medium hover:bg-[#1a1d27] transition-colors"
            >
              Enroll User
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors" title="Bulk Upload">
              Bulk
            </button>
          </div>
        </div>

        {/* Bulk actions bar */}
        {selected.length > 0 && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2.5 bg-zinc-50 border border-zinc-100">
            <span className="text-xs text-zinc-700 font-medium">{selected.length} selected</span>
            <div className="flex-1" />
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
              <Check size={12} /> Approve
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
              <X size={12} /> Reject
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
              <Trash2 size={12} /> Remove
            </button>
            <button onClick={() => setSelected([])} className="p-1.5 text-gray-400 hover:text-black transition-colors">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search user or course..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 text-xs border border-gray-200 bg-white focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="text-xs border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:border-gray-400"
            >
              {ROLE_FILTER.map((r) => (
                <option key={r} value={r}>{r === "all" ? "All Roles" : r.charAt(0).toUpperCase() + r.slice(1)}</option>
              ))}
            </select>
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
                  <th className="text-left px-4 py-2.5 font-medium w-8">
                    <input
                      type="checkbox"
                      checked={paginated.length > 0 && paginated.every((e) => selected.includes(e.id))}
                      onChange={toggleAll}
                      className="accent-[#0f1117]"
                    />
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">User</th>
                  <th className="text-left px-4 py-2.5 font-medium">Course</th>
                  <th className="text-left px-4 py-2.5 font-medium">Role</th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((e) => (
                  <tr key={e.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${selected.includes(e.id) ? "bg-zinc-50" : ""}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(e.id)}
                        onChange={() => toggleSelect(e.id)}
                        className="accent-[#0f1117]"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">{e.user}</td>
                    <td className="px-4 py-3 text-gray-600">{e.course}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${roleColors[e.role]}`}>
                        {e.role.charAt(0).toUpperCase() + e.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[e.status]}`}>
                        {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {e.status === "pending" && (
                          <>
                            <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Approve">
                              <Check size={13} />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Reject">
                              <X size={13} />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-zinc-800 hover:bg-gray-100 transition-colors" title="Change Role">
                          <RefreshCw size={13} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Remove">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-50">
            {paginated.map((e) => (
              <div key={e.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{e.user}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{e.course}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${roleColors[e.role]}`}>
                        {e.role.charAt(0).toUpperCase() + e.role.slice(1)}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[e.status]}`}>
                        {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  {e.status === "pending" && (
                    <div className="flex gap-1">
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50"><Check size={14} /></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50"><X size={14} /></button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {paginated.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-400">No enrollments yet</p>
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

        {/* Enroll Modal */}
        {showEnrollModal && (
          <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setShowEnrollModal(false)}>
            <div className="bg-white w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">Enroll User</h3>
                <button onClick={() => setShowEnrollModal(false)} className="p-1 text-gray-400 hover:text-black transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">User</label>
                  <input
                    type="text"
                    value={enrollForm.user}
                    onChange={(e) => setEnrollForm({ ...enrollForm, user: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Search user by name..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Course</label>
                  <input
                    type="text"
                    value={enrollForm.course}
                    onChange={(e) => setEnrollForm({ ...enrollForm, course: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Search course by name or code..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Role</label>
                  <select
                    value={enrollForm.role}
                    onChange={(e) => setEnrollForm({ ...enrollForm, role: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
                <button onClick={() => setShowEnrollModal(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button onClick={() => setShowEnrollModal(false)} className="px-4 py-2 text-xs bg-[#18181b] text-white font-medium hover:bg-[#1a1d27] transition-colors">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffEnrollmentManagement;
