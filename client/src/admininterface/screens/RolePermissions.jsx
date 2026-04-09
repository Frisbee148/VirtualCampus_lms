import React, { useState } from "react";
import AdminLayout from "../AdminLayout";

const rolesData = [
  {
    id: 1,
    name: "Director",
    color: "#6c2bd9",
    users: 1,
    permissions: {
      Dashboard: true,
      "View All Departments": true,
      "Manage Faculty": true,
      "Approve Budgets": true,
      "View Analytics": true,
      "Manage Policies": true,
      "System Settings": false,
      "Manage Users": false,
      "Audit Logs": false,
    },
  },
  {
    id: 2,
    name: "Registrar",
    color: "#059669",
    users: 1,
    permissions: {
      Dashboard: true,
      "Manage Admissions": true,
      "Student Records": true,
      "Exam Management": true,
      "Issue Certificates": true,
      "View Analytics": true,
      "System Settings": false,
      "Manage Users": false,
      "Approve Budgets": false,
    },
  },
  {
    id: 3,
    name: "Admin",
    color: "#d97706",
    users: 2,
    permissions: {
      Dashboard: true,
      "Manage Users": true,
      "Roles & Permissions": true,
      "System Settings": true,
      "Audit Logs": true,
      "View Analytics": true,
      "Manage Admissions": false,
      "Student Records": false,
      "Approve Budgets": false,
    },
  },
  {
    id: 4,
    name: "Faculty",
    color: "#2563eb",
    users: 186,
    permissions: {
      Dashboard: true,
      "My Courses": true,
      "Mark Attendance": true,
      "Upload Marks": true,
      "View Students": true,
      "View Timetable": true,
      "Manage Users": false,
      "System Settings": false,
      "Approve Budgets": false,
    },
  },
  {
    id: 5,
    name: "HOD",
    color: "#4f46e5",
    users: 12,
    permissions: {
      Dashboard: true,
      "Department Overview": true,
      "Faculty Performance": true,
      "Course Management": true,
      "View Analytics": true,
      "Approve Leave": true,
      "System Settings": false,
      "Manage Users": false,
      "Manage Admissions": false,
    },
  },
  {
    id: 6,
    name: "Student",
    color: "#0891b2",
    users: 3248,
    permissions: {
      Dashboard: true,
      "View Courses": true,
      "View Attendance": true,
      "View Grades": true,
      "View Timetable": true,
      Community: true,
      "Manage Users": false,
      "System Settings": false,
      "View Analytics": false,
    },
  },
  {
    id: 7,
    name: "Guardian",
    color: "#be185d",
    users: 2800,
    permissions: {
      Dashboard: true,
      "View Ward Performance": true,
      "View Attendance": true,
      "View Grades": true,
      "Fee Status": true,
      "View Timetable": true,
      "Manage Users": false,
      "System Settings": false,
      Community: false,
    },
  },
  {
    id: 8,
    name: "Staff",
    color: "#64748b",
    users: 45,
    permissions: {
      Dashboard: true,
      "View Notices": true,
      "View Calendar": true,
      "View Timetable": true,
      "Submit Reports": true,
      "View Directory": true,
      "Manage Users": false,
      "System Settings": false,
      "View Analytics": false,
    },
  },
];

const RolePermissions = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Roles & Permissions
            </h2>
            <p className="text-sm text-gray-400">
              Manage access control for all user roles
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium bg-[#d97706] text-white rounded-lg hover:bg-[#b45309] transition-colors w-full sm:w-auto">
            Create Role
          </button>
        </div>

        {/* Role Cards */}
        <div className="space-y-3">
          {rolesData.map((role) => {
            const isExpanded = expanded === role.id;
            const permEntries = Object.entries(role.permissions);
            const granted = permEntries.filter(([, v]) => v).length;

            return (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div
                  className="px-4 sm:px-5 py-4 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 sm:gap-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : role.id)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {role.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {role.users} user{role.users !== 1 ? "s" : ""} · {granted}
                      /{permEntries.length} permissions
                    </p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <div className="hidden sm:flex items-center gap-1">
                      <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(granted / permEntries.length) * 100}%`,
                            backgroundColor: role.color,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {Math.round((granted / permEntries.length) * 100)}%
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {isExpanded ? "Hide" : "Show"}
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {permEntries.map(([perm, granted]) => (
                        <div
                          key={perm}
                          className="flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50"
                        >
                          <span
                            className={`text-sm ${granted ? "text-gray-700" : "text-gray-400"}`}
                          >
                            {perm}
                          </span>
                          <span
                            className={`text-xs font-medium uppercase tracking-wide ${granted ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {granted ? "Allowed" : "Denied"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default RolePermissions;
