import React, { useState } from "react";
import HodLayout from "../HodLayout";
import { Check, X, ChevronDown, Clock } from "lucide-react";

const initialRequests = [
  { id: 1, type: "Leave", from: "Prof. Suresh Iyer", detail: "Medical leave — 5 days (Apr 14–18)", submitted: "2d ago", status: "pending", urgent: true, reason: "Scheduled surgery recovery" },
  { id: 2, type: "Budget", from: "Dr. Farah Khan", detail: "Lab equipment — Rs. 45,000", submitted: "3d ago", status: "pending", urgent: false, reason: "Replacement of faulty oscilloscopes in Lab 3" },
  { id: 3, type: "Leave", from: "Dr. Neha Gupta", detail: "Conference travel — 3 days (Apr 22–24)", submitted: "4d ago", status: "pending", urgent: false, reason: "Paper presentation at IEEE ICSE 2026" },
  { id: 4, type: "Infrastructure", from: "Prof. Amit Verma", detail: "Additional lab PCs — 10 units", submitted: "5d ago", status: "pending", urgent: false, reason: "Current lab capacity insufficient for CS601 batch size" },
  { id: 5, type: "Course", from: "Dr. Priya Sharma", detail: "Extra tutorial slot — CS303", submitted: "5d ago", status: "pending", urgent: false, reason: "Students struggling with design patterns module" },
  { id: 6, type: "Leave", from: "Dr. Vikram Reddy", detail: "Casual leave — 1 day (Apr 10)", submitted: "1w ago", status: "approved", urgent: false, reason: "Personal" },
  { id: 7, type: "Budget", from: "Dr. Ananya Desai", detail: "Books for library — Rs. 12,000", submitted: "1w ago", status: "approved", urgent: false, reason: "New textbooks for CS104 syllabus update" },
  { id: 8, type: "Leave", from: "Prof. Amit Verma", detail: "Sick leave — 2 days (Apr 5–6)", submitted: "2w ago", status: "rejected", urgent: false, reason: "Conflicted with exam duty schedule" },
];

const typeOptions = ["All", "Leave", "Budget", "Infrastructure", "Course"];
const statusOptions = ["All", "pending", "approved", "rejected"];

const statusColors = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const HodApprovals = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeOpen, setTypeOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filtered = requests.filter((r) => {
    const matchesType = typeFilter === "All" || r.type === typeFilter;
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: action });
    }
  };

  return (
    <HodLayout>
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Approvals & Requests</h2>
            <p className="text-sm text-gray-400">{pendingCount} pending approval{pendingCount !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative">
            <button
              onClick={() => { setTypeOpen(!typeOpen); setStatusOpen(false); }}
              className="px-3 py-2 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Type: {typeFilter} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {typeOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[150px]">
                {typeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setTypeFilter(opt); setTypeOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${typeFilter === opt ? "bg-gray-100 font-medium" : ""}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => { setStatusOpen(!statusOpen); setTypeOpen(false); }}
              className="px-3 py-2 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Status: {statusFilter} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {statusOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[150px]">
                {statusOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setStatusFilter(opt); setStatusOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 capitalize ${statusFilter === opt ? "bg-gray-100 font-medium" : ""}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="divide-y divide-gray-50">
            {filtered.map((r) => (
              <div
                key={r.id}
                onClick={() => setSelectedRequest(r)}
                className={`px-4 py-3 sm:py-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors ${
                  r.urgent && r.status === "pending" ? "border-l-2 border-l-red-400" : ""
                }`}
              >
                <div className="p-2 rounded-lg bg-gray-50 flex-shrink-0">
                  <Clock size={16} className="text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{r.type}</span>
                        {r.urgent && r.status === "pending" && (
                          <span className="text-[10px] font-medium text-red-500">Urgent</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-800 mt-1">{r.detail}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">from {r.from} · {r.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full capitalize ${statusColors[r.status]}`}>
                        {r.status}
                      </span>
                      {r.status === "pending" && (
                        <div className="hidden sm:flex gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(r.id, "approved"); }}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Approve"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleAction(r.id, "rejected"); }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Reject"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                No requests match filters.
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedRequest && (
          <>
            <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedRequest(null)} />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-md bg-white rounded-lg shadow-2xl z-50">
              <div className="flex items-start justify-between p-4 sm:p-5 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{selectedRequest.type}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full capitalize ${statusColors[selectedRequest.status]}`}>
                      {selectedRequest.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">{selectedRequest.detail}</h3>
                </div>
                <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">From</p>
                    <p className="text-xs text-gray-800 font-medium mt-0.5">{selectedRequest.from}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">Submitted</p>
                    <p className="text-xs text-gray-800 font-medium mt-0.5">{selectedRequest.submitted}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mb-1">Reason / Justification</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{selectedRequest.reason}</p>
                </div>

                {selectedRequest.status === "pending" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleAction(selectedRequest.id, "approved")}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(selectedRequest.id, "rejected")}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded transition-colors flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </HodLayout>
  );
};

export default HodApprovals;
