import React, { useState } from "react";
import RegistrarLayout from "../RegistrarLayout";
import { Search, Download, Eye } from "lucide-react";

const studentsData = [
  {
    id: "20BCSE001",
    name: "Aarav Sharma",
    program: "B.Tech CSE",
    semester: 8,
    cgpa: 9.12,
    status: "active",
    batch: "2020-24",
    email: "aarav.20b@lnmiit.ac.in",
  },
  {
    id: "20BECE015",
    name: "Priya Patel",
    program: "B.Tech ECE",
    semester: 8,
    cgpa: 8.85,
    status: "active",
    batch: "2020-24",
    email: "priya.20b@lnmiit.ac.in",
  },
  {
    id: "21BCSE042",
    name: "Rohit Verma",
    program: "B.Tech CSE",
    semester: 6,
    cgpa: 7.65,
    status: "active",
    batch: "2021-25",
    email: "rohit.21b@lnmiit.ac.in",
  },
  {
    id: "19BMEC008",
    name: "Sunita Devi",
    program: "B.Tech ME",
    semester: 10,
    cgpa: 8.2,
    status: "graduated",
    batch: "2019-23",
    email: "sunita.19b@lnmiit.ac.in",
  },
  {
    id: "22MMBA003",
    name: "Karan Singh",
    program: "MBA",
    semester: 4,
    cgpa: 8.45,
    status: "active",
    batch: "2022-24",
    email: "karan.22m@lnmiit.ac.in",
  },
  {
    id: "20BCEL022",
    name: "Deepika Rao",
    program: "B.Tech CE",
    semester: 8,
    cgpa: 7.92,
    status: "active",
    batch: "2020-24",
    email: "deepika.20b@lnmiit.ac.in",
  },
  {
    id: "21MPHY001",
    name: "Aakash Jha",
    program: "M.Sc Physics",
    semester: 4,
    cgpa: 9.35,
    status: "active",
    batch: "2021-23",
    email: "aakash.21m@lnmiit.ac.in",
  },
  {
    id: "18BCSE099",
    name: "Neha Gupta",
    program: "B.Tech CSE",
    semester: 10,
    cgpa: 9.52,
    status: "graduated",
    batch: "2018-22",
    email: "neha.18b@lnmiit.ac.in",
  },
  {
    id: "23BCSE010",
    name: "Amit Ranawat",
    program: "B.Tech CSE",
    semester: 2,
    cgpa: 8.1,
    status: "active",
    batch: "2023-27",
    email: "amit.23b@lnmiit.ac.in",
  },
  {
    id: "22BECE031",
    name: "Pooja Meena",
    program: "B.Tech ECE",
    semester: 4,
    cgpa: 7.45,
    status: "on-probation",
    batch: "2022-26",
    email: "pooja.22b@lnmiit.ac.in",
  },
];

const statusColors = {
  active: { bg: "bg-emerald-50", text: "text-emerald-600" },
  graduated: { bg: "bg-zinc-100", text: "text-zinc-600" },
  "on-probation": { bg: "bg-amber-50", text: "text-amber-600" },
  withdrawn: { bg: "bg-red-50", text: "text-red-600" },
};

const StudentRecords = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = studentsData.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <RegistrarLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Student Records
            </h2>
            <p className="text-sm text-gray-400">
              Search and manage student academic records
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#242424] w-full sm:w-56 transition-colors"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#242424] transition-colors w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
              <option value="on-probation">On Probation</option>
            </select>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                    Student ID
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Name
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Program
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden md:table-cell">
                    Batch
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden md:table-cell">
                    Sem
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden lg:table-cell">
                    CGPA
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Status
                  </th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((s) => {
                  const sc = statusColors[s.status] || statusColors.active;
                  return (
                    <tr
                      key={s.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-mono text-[#242424] font-medium">
                          {s.id}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {s.name}
                          </p>
                          <p className="text-xs text-gray-400">{s.email}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-sm text-gray-600">
                          {s.program}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell text-sm text-gray-500">
                        {s.batch}
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell text-sm text-gray-500">
                        {s.semester}
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell text-sm font-medium text-gray-700">
                        {s.cgpa}
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${sc.bg} ${sc.text}`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            className="p-1.5 text-gray-300 hover:text-[#242424] transition-colors"
                            title="View Record"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            className="p-1.5 text-gray-300 hover:text-[#242424] transition-colors"
                            title="Download Transcript"
                          >
                            <Download size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((s) => {
              const sc = statusColors[s.status] || statusColors.active;
              return (
                <div key={s.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {s.email}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-1 rounded-full capitalize ${sc.bg} ${sc.text}`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#242424] font-medium">
                    {s.id}
                  </p>
                  <p className="text-xs text-gray-500">{s.program}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Sem {s.semester}</span>
                    <span>Batch {s.batch}</span>
                    <span className="font-medium text-gray-700">
                      CGPA {s.cgpa}
                    </span>
                  </div>

                  <div className="flex justify-end gap-1">
                    <button
                      className="p-1.5 text-gray-300 hover:text-[#242424] transition-colors"
                      title="View Record"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      className="p-1.5 text-gray-300 hover:text-[#242424] transition-colors"
                      title="Download Transcript"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No records found.
            </div>
          )}
        </div>
      </div>
    </RegistrarLayout>
  );
};

export default StudentRecords;
