import React, { useState } from "react";
import RegistrarLayout from "../RegistrarLayout";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react";

const applicationsData = [
  {
    id: "ADM-2026-001",
    name: "Ravi Kumar",
    program: "B.Tech CSE",
    jeeRank: 1250,
    date: "Apr 8, 2026",
    status: "pending",
    documents: 5,
    verified: 3,
  },
  {
    id: "ADM-2026-002",
    name: "Ananya Singh",
    program: "B.Tech ECE",
    jeeRank: 2100,
    date: "Apr 8, 2026",
    status: "pending",
    documents: 5,
    verified: 5,
  },
  {
    id: "ADM-2026-003",
    name: "Mohammed Faizan",
    program: "M.Tech AI/ML",
    gateScore: 720,
    date: "Apr 7, 2026",
    status: "pending",
    documents: 6,
    verified: 4,
  },
  {
    id: "ADM-2026-004",
    name: "Priya Deshmukh",
    program: "MBA",
    catPercentile: 98.2,
    date: "Apr 7, 2026",
    status: "pending",
    documents: 6,
    verified: 6,
  },
  {
    id: "ADM-2026-005",
    name: "Arjun Reddy",
    program: "B.Tech ME",
    jeeRank: 3400,
    date: "Apr 6, 2026",
    status: "approved",
    documents: 5,
    verified: 5,
  },
  {
    id: "ADM-2026-006",
    name: "Sneha Iyer",
    program: "M.Sc Physics",
    gateScore: 650,
    date: "Apr 6, 2026",
    status: "approved",
    documents: 5,
    verified: 5,
  },
  {
    id: "ADM-2026-007",
    name: "Vikash Yadav",
    program: "B.Tech CE",
    jeeRank: 8500,
    date: "Apr 5, 2026",
    status: "rejected",
    documents: 5,
    verified: 2,
  },
  {
    id: "ADM-2026-008",
    name: "Kavya Nair",
    program: "Ph.D CSE",
    date: "Apr 5, 2026",
    status: "pending",
    documents: 8,
    verified: 6,
  },
];

const statusConfig = {
  pending: {
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50",
    label: "Pending",
  },
  approved: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    label: "Approved",
  },
  rejected: {
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
    label: "Rejected",
  },
};

const Admissions = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = applicationsData.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <RegistrarLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Admissions
            </h2>
            <p className="text-sm text-gray-400">
              Manage admission applications and approvals
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#059669] w-full sm:w-56 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex min-w-max items-center gap-1 bg-gray-100 rounded-lg p-1">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md capitalize transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                    Application ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Applicant
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Program
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden lg:table-cell">
                    Documents
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Status
                  </th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((app) => {
                  const sc = statusConfig[app.status];
                  const StatusIcon = sc.icon;
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-mono text-[#059669] font-medium">
                          {app.id}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <p className="text-sm font-medium text-gray-800">
                          {app.name}
                        </p>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                          {app.program}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell text-sm text-gray-500">
                        {app.date}
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <FileText size={13} className="text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {app.verified}/{app.documents}
                          </span>
                          {app.verified === app.documents && (
                            <CheckCircle
                              size={13}
                              className="text-emerald-500"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.color}`}
                        >
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          className="p-1.5 text-gray-300 hover:text-[#059669] transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((app) => {
              const sc = statusConfig[app.status];
              return (
                <div key={app.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {app.name}
                      </p>
                      <p className="text-xs text-gray-400">{app.id}</p>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-1 rounded-full ${sc.bg} ${sc.color}`}
                    >
                      {sc.label}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">{app.program}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{app.date}</span>
                    <span>
                      Docs {app.verified}/{app.documents}
                    </span>
                    <button
                      className="p-1.5 text-gray-300 hover:text-[#059669] transition-colors"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No applications found.
            </div>
          )}
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default Admissions;
