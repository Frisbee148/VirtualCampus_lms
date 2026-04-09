import React, { useState } from "react";
import DirectorLayout from "../DirectorLayout";
import {
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const approvalsData = [
  {
    id: 1,
    title: "Annual Tech Fest Budget — ₹12,00,000",
    description:
      "Funding for annual technical festival including guest lectures, competitions, workshops, and logistics.",
    from: "Student Affairs Committee",
    date: "Apr 8, 2026",
    priority: "high",
    status: "pending",
    category: "Budget",
  },
  {
    id: 2,
    title: "New AI/ML Lab Equipment Purchase",
    description:
      "Purchase of 20 GPU workstations and HPC server for the new AI/ML Research Lab in CSE department.",
    from: "CSE Department",
    date: "Apr 7, 2026",
    priority: "high",
    status: "pending",
    category: "Infrastructure",
  },
  {
    id: 3,
    title: "Faculty Conference Travel Grant — 5 Faculty",
    description:
      "Travel and accommodation funding for 5 faculty members attending IEEE ICSE 2026 in Madrid, Spain.",
    from: "HR Department",
    date: "Apr 6, 2026",
    priority: "medium",
    status: "pending",
    category: "Travel",
  },
  {
    id: 4,
    title: "New Elective Course: Quantum Computing",
    description:
      "Proposal to introduce QC 501 as an open elective for 7th semester students across all departments.",
    from: "Physics Department",
    date: "Apr 5, 2026",
    priority: "medium",
    status: "pending",
    category: "Academic",
  },
  {
    id: 5,
    title: "Campus Cafeteria Renovation",
    description:
      "Renovation plan for the main campus cafeteria including kitchen upgrade and seating expansion.",
    from: "Admin Office",
    date: "Apr 4, 2026",
    priority: "low",
    status: "pending",
    category: "Infrastructure",
  },
  {
    id: 6,
    title: "Library Digital Subscription Renewal",
    description:
      "Annual renewal subscription for IEEE Xplore, Springer, and ACM Digital Library.",
    from: "Library",
    date: "Apr 3, 2026",
    priority: "high",
    status: "approved",
    category: "Academic",
  },
  {
    id: 7,
    title: "Campus Wi-Fi Infrastructure Upgrade",
    description:
      "Upgrade from Wi-Fi 5 to Wi-Fi 6E across entire campus. 150 new access points.",
    from: "IT Department",
    date: "Apr 2, 2026",
    priority: "high",
    status: "approved",
    category: "Infrastructure",
  },
  {
    id: 8,
    title: "Student Health Insurance Policy Renewal",
    description:
      "Annual renewal of group health insurance for all enrolled students.",
    from: "Student Welfare",
    date: "Apr 1, 2026",
    priority: "medium",
    status: "rejected",
    category: "Policy",
  },
];

const priorityColors = {
  high: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  medium: { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" },
  low: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
};

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

const DirectorApprovals = () => {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered =
    filter === "all"
      ? approvalsData
      : approvalsData.filter((a) => a.status === filter);
  const pendingCount = approvalsData.filter(
    (a) => a.status === "pending",
  ).length;

  return (
    <DirectorLayout>
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Approvals
            </h2>
            <p className="text-sm text-gray-400">
              {pendingCount} pending approval{pendingCount !== 1 ? "s" : ""}{" "}
              require your attention
            </p>
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

        {/* Approval Cards */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const sc = statusConfig[item.status];
            const pc = priorityColors[item.priority];
            const StatusIcon = sc.icon;
            const isExpanded = expanded === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div
                  className="px-4 sm:px-5 py-3 sm:py-4 cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                >
                  <div className="flex items-start gap-3 sm:gap-4 w-full min-w-0">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${sc.bg}`}>
                      <StatusIcon size={18} className={sc.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 leading-snug break-words">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs text-gray-400 break-words">
                          {item.from}
                        </span>
                        <span className="text-xs text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {item.date}
                        </span>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}
                        >
                          {item.priority}
                        </span>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="pt-0.5 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.status === "pending" && (
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                          Approve
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium bg-white text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                          Reject
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          Request More Info
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No approvals match this filter.
          </div>
        )}
      </div>
    </DirectorLayout>
  );
};

export default DirectorApprovals;
