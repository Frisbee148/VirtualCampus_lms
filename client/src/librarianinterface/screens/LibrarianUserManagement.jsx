import React, { useState } from "react";
import LibrarianLayout from "../LibrarianLayout";
import { Search, Plus, X } from "lucide-react";

const usersData = [
  { id: 1, name: "Aarav Sharma", email: "aarav.20b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 3, finesDue: 0 },
  { id: 2, name: "Priya Patel", email: "priya.20b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 2, finesDue: 50 },
  { id: 3, name: "Rohan Gupta", email: "rohan.21b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 1, finesDue: 0 },
  { id: 4, name: "Sneha Jain", email: "sneha.21b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 4, finesDue: 150 },
  { id: 5, name: "Dr. Anand Mishra", email: "anand.m@lnmiit.ac.in", role: "Faculty", status: "active", booksIssued: 5, finesDue: 0 },
  { id: 6, name: "Prof. Vikram Singh", email: "vikram.s@lnmiit.ac.in", role: "Faculty", status: "active", booksIssued: 3, finesDue: 0 },
  { id: 7, name: "Vikram Reddy", email: "vikram.22b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 0, finesDue: 0 },
  { id: 8, name: "Rahul Verma", email: "rahul.20b@lnmiit.ac.in", role: "Student", status: "blocked", booksIssued: 2, finesDue: 350 },
  { id: 9, name: "Meera Iyer", email: "meera.21b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 1, finesDue: 100 },
  { id: 10, name: "Karan Singh", email: "karan.22b@lnmiit.ac.in", role: "Student", status: "active", booksIssued: 2, finesDue: 75 },
];

const userBorrowHistory = {
  1: [
    { book: "Introduction to Algorithms", issuedOn: "Apr 1, 2026", dueDate: "Apr 15, 2026", status: "active" },
    { book: "Computer Networks", issuedOn: "Mar 28, 2026", dueDate: "Apr 11, 2026", status: "active" },
    { book: "Discrete Mathematics", issuedOn: "Mar 25, 2026", dueDate: "Apr 8, 2026", status: "active" },
  ],
};

const roleColors = {
  Student: { bg: "bg-zinc-100", text: "text-zinc-700" },
  Faculty: { bg: "bg-zinc-100", text: "text-zinc-600" },
};

const LibrarianUserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Student" });

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <LibrarianLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">User Management</h2>
            <p className="text-sm text-gray-400">{usersData.length} registered library users</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#242424] text-white rounded-lg hover:bg-rose-900 transition-colors"
          >
            Add User
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#242424] w-full transition-colors"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#242424] transition-colors w-full sm:w-auto"
          >
            <option value="all">All Roles</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#242424] transition-colors w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Role</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Books Issued</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Fines Due</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const rc = roleColors[u.role] || roleColors.Student;
                  return (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                          <p className="text-xs text-gray-400 truncate">{u.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${rc.bg} ${rc.text}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className={`text-xs font-medium capitalize ${u.status === "active" ? "text-emerald-600" : "text-red-600"}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-700">{u.booksIssued}</td>
                      <td className="px-3 py-3.5">
                        <span className={`text-sm ${u.finesDue > 0 ? "text-red-600 font-medium" : "text-gray-400"}`}>
                          {u.finesDue > 0 ? `Rs. ${u.finesDue}` : "—"}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="text-xs font-medium text-[#242424] hover:text-rose-900"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((u) => {
              const rc = roleColors[u.role] || roleColors.Student;
              return (
                <div key={u.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{u.name}</p>
                      <p className="text-xs text-gray-400 truncate">{u.email}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${rc.bg} ${rc.text}`}>
                      {u.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-medium capitalize ${u.status === "active" ? "text-emerald-600" : "text-red-600"}`}>
                      {u.status}
                    </span>
                    <span className="text-gray-500">{u.booksIssued} books issued</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={u.finesDue > 0 ? "text-red-600 font-medium" : "text-gray-400"}>
                      {u.finesDue > 0 ? `Fines: Rs. ${u.finesDue}` : "No fines"}
                    </span>
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="text-xs font-medium text-[#242424] hover:text-rose-900"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No users found.</div>
          )}
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">User Details</h3>
              <button onClick={() => setSelectedUser(null)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Name</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Email</p>
                  <p className="text-sm text-gray-800">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Role</p>
                  <p className="text-sm text-gray-800">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Status</p>
                  <span className={`text-sm font-medium capitalize ${selectedUser.status === "active" ? "text-emerald-600" : "text-red-600"}`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Books Issued</p>
                  <p className="text-sm text-gray-800">{selectedUser.booksIssued}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Outstanding Fines</p>
                  <p className={`text-sm font-medium ${selectedUser.finesDue > 0 ? "text-red-600" : "text-gray-800"}`}>
                    {selectedUser.finesDue > 0 ? `Rs. ${selectedUser.finesDue}` : "None"}
                  </p>
                </div>
              </div>

              {/* Borrow History */}
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Current Books</p>
                {userBorrowHistory[selectedUser.id] ? (
                  <div className="space-y-2">
                    {userBorrowHistory[selectedUser.id].map((h, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm text-gray-700">{h.book}</p>
                          <p className="text-xs text-gray-400">Issued: {h.issuedOn}</p>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                          Due {h.dueDate}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No active borrowings.</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 p-5 border-t border-gray-100">
              <button className="px-4 py-2 text-sm font-medium bg-[#242424] text-white rounded-lg hover:bg-rose-900 transition-colors">
                Edit User
              </button>
              <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedUser.status === "active"
                  ? "text-red-600 bg-red-50 hover:bg-red-100"
                  : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
              }`}>
                {selectedUser.status === "active" ? "Block User" : "Unblock User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Add Library User</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#242424] transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#242424] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#242424] transition-colors"
                >
                  <option>Student</option>
                  <option>Faculty</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-[#242424] text-white rounded-lg hover:bg-rose-900 transition-colors">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </LibrarianLayout>
  );
};

export default LibrarianUserManagement;
