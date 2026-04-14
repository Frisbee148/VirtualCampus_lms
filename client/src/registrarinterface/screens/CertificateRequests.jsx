import React, { useState } from "react";
import RegistrarLayout from "../RegistrarLayout";
import { Search, Clock, CheckCircle, Download, FileText } from "lucide-react";

const requestsData = [
  {
    id: "CRT-001",
    student: "Aarav Sharma",
    studentId: "20BCSE001",
    type: "Degree Certificate",
    program: "B.Tech CSE",
    date: "Apr 8, 2026",
    status: "pending",
    priority: "normal",
  },
  {
    id: "CRT-002",
    student: "Priya Patel",
    studentId: "20BECE015",
    type: "Provisional Certificate",
    program: "B.Tech ECE",
    date: "Apr 8, 2026",
    status: "pending",
    priority: "urgent",
  },
  {
    id: "CRT-003",
    student: "Sunita Devi",
    studentId: "19BMEC008",
    type: "Migration Certificate",
    program: "B.Tech ME",
    date: "Apr 7, 2026",
    status: "processing",
    priority: "normal",
  },
  {
    id: "CRT-004",
    student: "Neha Gupta",
    studentId: "18BCSE099",
    type: "Degree Certificate",
    program: "B.Tech CSE",
    date: "Apr 7, 2026",
    status: "processing",
    priority: "normal",
  },
  {
    id: "CRT-005",
    student: "Rohit Verma",
    studentId: "21BCSE042",
    type: "Bonafide Certificate",
    program: "B.Tech CSE",
    date: "Apr 6, 2026",
    status: "completed",
    priority: "normal",
  },
  {
    id: "CRT-006",
    student: "Karan Singh",
    studentId: "22MMBA003",
    type: "Character Certificate",
    program: "MBA",
    date: "Apr 6, 2026",
    status: "completed",
    priority: "normal",
  },
  {
    id: "CRT-007",
    student: "Deepika Rao",
    studentId: "20BCEL022",
    type: "Transcript",
    program: "B.Tech CE",
    date: "Apr 5, 2026",
    status: "completed",
    priority: "normal",
  },
  {
    id: "CRT-008",
    student: "Aakash Jha",
    studentId: "21MPHY001",
    type: "Bonafide Certificate",
    program: "M.Sc Physics",
    date: "Apr 5, 2026",
    status: "pending",
    priority: "normal",
  },
];

const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-600",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    bg: "bg-zinc-100",
    text: "text-zinc-600",
    icon: FileText,
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: CheckCircle,
  },
};

const CertificateRequests = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = requestsData.filter((r) => {
    const matchSearch =
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <RegistrarLayout>
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Certificate Requests
            </h2>
            <p className="text-sm text-gray-400">
              Manage degree, provisional, and migration certificate requests
            </p>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full sm:w-56 transition-colors"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex min-w-max items-center gap-1 bg-gray-100 rounded-lg p-1">
            {["all", "pending", "processing", "completed"].map((f) => (
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

        {/* Request Cards */}
        <div className="space-y-3">
          {filtered.map((req) => {
            const sc = statusConfig[req.status];
            const StatusIcon = sc.icon;

            return (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-800">
                        {req.type}
                      </h3>
                      {req.priority === "urgent" && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-500">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {req.student} · {req.studentId} · {req.program}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-gray-400">
                        Req ID: {req.id}
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{req.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap self-start sm:self-center">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${sc.bg} ${sc.text}`}
                    >
                      <StatusIcon size={12} />
                      {sc.label}
                    </span>
                    {req.status === "pending" && (
                      <button className="px-3 py-1 text-xs font-medium bg-[#4E545C] text-white rounded-lg hover:bg-[#828a91] transition-colors whitespace-nowrap">
                        Process
                      </button>
                    )}
                    {req.status === "completed" && (
                      <button
                        className="p-1.5 text-gray-300 hover:text-[#4E545C] transition-colors"
                        title="Download"
                      >
                        <Download size={15} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No requests match this filter.
          </div>
        )}
      </div>
    </RegistrarLayout>
  );
};

export default CertificateRequests;
