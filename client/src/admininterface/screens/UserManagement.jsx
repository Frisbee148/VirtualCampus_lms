import React, { useState } from "react";
import AdminLayout from "../AdminLayout";

const usersData = [
  {
    id: 1,
    name: "Dr. Rahul Sharma",
    email: "director@lnmiit.ac.in",
    role: "Director",
    status: "active",
    lastLogin: "Apr 9, 2026 10:30 AM",
    created: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Dr. Neha Agarwal",
    email: "registrar@lnmiit.ac.in",
    role: "Registrar",
    status: "active",
    lastLogin: "Apr 9, 2026 09:15 AM",
    created: "Mar 10, 2024",
  },
  {
    id: 3,
    name: "System Admin",
    email: "admin@lnmiit.ac.in",
    role: "Admin",
    status: "active",
    lastLogin: "Apr 9, 2026 08:00 AM",
    created: "Jan 1, 2024",
  },
  {
    id: 4,
    name: "Dr. Anand Mishra",
    email: "anand.m@lnmiit.ac.in",
    role: "Faculty",
    status: "active",
    lastLogin: "Apr 8, 2026 04:30 PM",
    created: "Feb 20, 2024",
  },
  {
    id: 5,
    name: "Prof. Vikram Singh",
    email: "vikram.s@lnmiit.ac.in",
    role: "Faculty",
    status: "active",
    lastLogin: "Apr 8, 2026 03:45 PM",
    created: "Feb 20, 2024",
  },
  {
    id: 6,
    name: "Aarav Sharma",
    email: "aarav.20b@lnmiit.ac.in",
    role: "Student",
    status: "active",
    lastLogin: "Apr 9, 2026 11:00 AM",
    created: "Aug 1, 2024",
  },
  {
    id: 7,
    name: "Priya Patel",
    email: "priya.20b@lnmiit.ac.in",
    role: "Student",
    status: "active",
    lastLogin: "Apr 9, 2026 10:45 AM",
    created: "Aug 1, 2024",
  },
  {
    id: 8,
    name: "Ramesh Kumar",
    email: "ramesh.k@lnmiit.ac.in",
    role: "Staff",
    status: "inactive",
    lastLogin: "Mar 15, 2026 02:00 PM",
    created: "Apr 5, 2024",
  },
  {
    id: 9,
    name: "Dr. Meera Joshi",
    email: "meera.j@lnmiit.ac.in",
    role: "HOD",
    status: "active",
    lastLogin: "Apr 8, 2026 05:00 PM",
    created: "Feb 20, 2024",
  },
  {
    id: 10,
    name: "Suresh Patel",
    email: "suresh.p@lnmiit.ac.in",
    role: "Guardian",
    status: "active",
    lastLogin: "Apr 7, 2026 07:00 PM",
    created: "Aug 15, 2024",
  },
];

const roleColors = {
  Director: { bg: "bg-purple-50", text: "text-purple-600" },
  Registrar: { bg: "bg-emerald-50", text: "text-emerald-600" },
  Admin: { bg: "bg-amber-50", text: "text-amber-600" },
  Faculty: { bg: "bg-blue-50", text: "text-blue-600" },
  Student: { bg: "bg-cyan-50", text: "text-cyan-600" },
  Staff: { bg: "bg-gray-100", text: "text-gray-600" },
  HOD: { bg: "bg-indigo-50", text: "text-indigo-600" },
  Guardian: { bg: "bg-pink-50", text: "text-pink-600" },
};

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const roles = ["all", ...new Set(usersData.map((u) => u.role))];

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              User Management
            </h2>
            <p className="text-sm text-gray-400">
              {usersData.length} total users across all roles
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="px-4 py-2 text-sm font-medium bg-[#d97706] text-white rounded-lg hover:bg-[#b45309] transition-colors">
              Add User
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
          <div className="w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#d97706] w-full transition-colors"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#d97706] transition-colors w-full sm:w-auto"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "All Roles" : r}
              </option>
            ))}
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                    User
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Role
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden md:table-cell">
                    Last Login
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden lg:table-cell">
                    Created
                  </th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => {
                  const rc = roleColors[u.role] || roleColors.Staff;
                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {u.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {u.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${rc.bg} ${rc.text}`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`text-xs font-medium capitalize ${u.status === "active" ? "text-emerald-600" : "text-gray-400"}`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell text-xs text-gray-500">
                        {u.lastLogin}
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell text-xs text-gray-500">
                        {u.created}
                      </td>
                      <td className="px-3 py-3.5">
                        <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((u) => {
              const rc = roleColors[u.role] || roleColors.Staff;
              return (
                <div key={u.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {u.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {u.email}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-1 rounded-full ${rc.bg} ${rc.text}`}
                    >
                      {u.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-medium capitalize ${u.status === "active" ? "text-emerald-600" : "text-gray-400"}`}
                    >
                      {u.status}
                    </span>
                    <span className="text-gray-400">{u.lastLogin}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created: {u.created}</span>
                    <button className="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No users found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
