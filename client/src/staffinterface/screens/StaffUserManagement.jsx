import React, { useState } from "react";
import StaffLayout from "../StaffLayout";
import {
  Plus,
  Edit3,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

const allUsers = [
  { id: 1, name: "Rahul Verma", email: "rahul.v@lnmiit.ac.in", role: "student", status: "active", dept: "CSE", enrolled: 5 },
  { id: 2, name: "Dr. Meera Patel", email: "meera.p@lnmiit.ac.in", role: "teacher", status: "active", dept: "CSE", enrolled: 3 },
  { id: 3, name: "Sunil Kumar", email: "sunil.k@lnmiit.ac.in", role: "student", status: "inactive", dept: "ECE", enrolled: 0 },
  { id: 4, name: "Prof. Amit Verma", email: "amit.v@lnmiit.ac.in", role: "teacher", status: "active", dept: "CSE", enrolled: 4 },
  { id: 5, name: "Priya Sharma", email: "priya.s@lnmiit.ac.in", role: "student", status: "active", dept: "ME", enrolled: 6 },
  { id: 6, name: "Ankit Jain", email: "ankit.j@lnmiit.ac.in", role: "student", status: "active", dept: "CSE", enrolled: 5 },
  { id: 7, name: "Dr. Kavita Singh", email: "kavita.s@lnmiit.ac.in", role: "teacher", status: "active", dept: "ECE", enrolled: 2 },
  { id: 8, name: "Ravi Tiwari", email: "ravi.t@lnmiit.ac.in", role: "student", status: "inactive", dept: "ME", enrolled: 0 },
  { id: 9, name: "Sneha Agarwal", email: "sneha.a@lnmiit.ac.in", role: "admin", status: "active", dept: "Admin", enrolled: 0 },
  { id: 10, name: "Mohit Gupta", email: "mohit.g@lnmiit.ac.in", role: "student", status: "active", dept: "CSE", enrolled: 5 },
  { id: 11, name: "Dr. Ramesh Iyer", email: "ramesh.i@lnmiit.ac.in", role: "teacher", status: "active", dept: "ME", enrolled: 3 },
  { id: 12, name: "Neha Reddy", email: "neha.r@lnmiit.ac.in", role: "student", status: "active", dept: "ECE", enrolled: 6 },
];

const ROLES_FILTER = ["all", "student", "teacher", "admin"];
const STATUS_FILTER = ["all", "active", "inactive"];
const PAGE_SIZE = 8;

const roleColors = {
  student: "bg-zinc-100 text-zinc-700",
  teacher: "bg-zinc-100 text-zinc-600",
  admin: "bg-gray-100 text-gray-700",
};

const statusColors = {
  active: "bg-emerald-50 text-emerald-700",
  inactive: "bg-red-50 text-red-600",
};

const StaffUserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "student", dept: "" });

  const filtered = allUsers.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "student", dept: "" });
    setShowModal(true);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, dept: user.dept });
    setShowModal(true);
  };

  return (
    <StaffLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">User Management</h2>
            <p className="text-sm text-gray-400">{filtered.length} users found</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#000000] text-white text-xs font-medium hover:bg-[#1a1d27] transition-colors"
          >
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search users..."
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
              {ROLES_FILTER.map((r) => (
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
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-500">
                  <th className="text-left px-4 py-2.5 font-medium">Name</th>
                  <th className="text-left px-4 py-2.5 font-medium">Email</th>
                  <th className="text-left px-4 py-2.5 font-medium">Role</th>
                  <th className="text-left px-4 py-2.5 font-medium">Department</th>
                  <th className="text-left px-4 py-2.5 font-medium">Status</th>
                  <th className="text-left px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${roleColors[u.role]}`}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.dept}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[u.status]}`}>
                        {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors" title="Edit">
                          <Edit3 size={13} />
                        </button>
                        {u.status === "active" ? (
                          <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Deactivate">
                            <UserX size={13} />
                          </button>
                        ) : (
                          <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Activate">
                            <UserCheck size={13} />
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
            {paginated.map((u) => (
              <div key={u.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{u.email}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${roleColors[u.role]}`}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[u.status]}`}>
                        {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => openEdit(u)} className="p-1.5 text-gray-400 hover:text-black">
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {paginated.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-400">No users found</p>
              <p className="text-[10px] text-gray-300 mt-1">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[10px] text-gray-500 px-2">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">
                  {selectedUser ? "Edit User" : "Add New User"}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-black transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="user@lnmiit.ac.in"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Department</label>
                    <input
                      type="text"
                      value={formData.dept}
                      onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                      placeholder="e.g. CSE"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs bg-[#000000] text-white font-medium hover:bg-[#1a1d27] transition-colors"
                >
                  {selectedUser ? "Save Changes" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffUserManagement;
