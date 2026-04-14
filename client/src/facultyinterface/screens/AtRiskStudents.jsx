import React, { useState } from "react";
import FacultyLayout from "../FacultyLayout";
import { ChevronDown, Send, Mic, X, MessageSquare } from "lucide-react";

const RISK_TYPES = ["All", "Attendance", "CGPA", "Inactivity"];

const initialStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    reason: "Attendance below 60%",
    type: "Attendance",
    reviewed: false,
  },
  {
    id: 2,
    name: "Priya Patel",
    reason: "CGPA dropped below 5.0",
    type: "CGPA",
    reviewed: false,
  },
  {
    id: 3,
    name: "Rohan Gupta",
    reason: "No activity for 14 days",
    type: "Inactivity",
    reviewed: false,
  },
  {
    id: 4,
    name: "Sneha Reddy",
    reason: "Attendance below 50%",
    type: "Attendance",
    reviewed: false,
  },
];

const AtRiskStudents = () => {
  const [filterType, setFilterType] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [messageTarget, setMessageTarget] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const filtered =
    filterType === "All"
      ? students
      : students.filter((s) => s.type === filterType);

  const toggleReviewed = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, reviewed: !s.reviewed } : s)),
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
      setMessageTarget(null);
    }
  };

  const handleSendFeedback = () => {
    if (feedbackText.trim()) {
      setFeedbackText("");
      setFeedbackTarget(null);
    }
  };

  return (
    <FacultyLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          ABC course
        </h2>

        {/* Filter row */}
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <div className="bg-[#4E545C] text-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium flex items-center">
            Filter by type
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="bg-[#4E545C] text-white px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium flex items-center gap-2"
            >
              Type: {filterType}
              <ChevronDown size={14} className="text-[#90ee90]" />
            </button>
            {filterOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[160px]">
                {RISK_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type);
                      setFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#4E545C]/10 transition-colors ${
                      filterType === type ? "bg-[#4E545C]/20 font-medium" : ""
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[90px] sm:min-w-[140px]">
                  Name
                </th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[70px] sm:min-w-[100px]">
                  Message
                </th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[70px] sm:min-w-[100px]">
                  Feedback
                </th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[80px] sm:min-w-[120px]">
                  Mark as reviewed
                </th>
                <th className="text-left px-2 sm:px-4 py-2 sm:py-3 font-semibold min-w-[100px] sm:min-w-[180px]">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student, idx) => (
                <tr
                  key={student.id}
                  className={idx % 2 === 0 ? "bg-gray-100" : "bg-gray-200/60"}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium text-gray-800">
                    {student.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <button
                      onClick={() => {
                        setMessageTarget(student);
                        setMessageText("");
                      }}
                      className="bg-[#4E545C] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#15696a] transition-colors flex items-center gap-1.5"
                    >
                      Message
                    </button>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <button
                      onClick={() => {
                        setFeedbackTarget(student);
                        setFeedbackText("");
                      }}
                      className="border border-[#4E545C] text-[#4E545C] px-3 py-1.5 text-xs font-medium hover:bg-[#4E545C]/10 transition-colors"
                    >
                      Feedback
                    </button>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={student.reviewed}
                        onChange={() => toggleReviewed(student.id)}
                        className="w-4 h-4 accent-[#4E545C] cursor-pointer"
                      />
                      <span className="text-xs text-gray-500">
                        {student.reviewed ? "Reviewed" : "Pending"}
                      </span>
                    </label>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600">
                    {student.reason}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    No at-risk students for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="bg-white border border-gray-200 p-3 space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {student.reason}
                  </p>
                </div>
                <span className="text-[10px] font-medium px-2 py-1 bg-gray-100 text-gray-600">
                  {student.type}
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={student.reviewed}
                  onChange={() => toggleReviewed(student.id)}
                  className="w-4 h-4 accent-[#4E545C] cursor-pointer"
                />
                <span className="text-xs text-gray-500">
                  {student.reviewed ? "Reviewed" : "Pending"}
                </span>
              </label>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    setMessageTarget(student);
                    setMessageText("");
                  }}
                  className="bg-[#4E545C] text-white px-3 py-1.5 text-xs font-medium hover:bg-[#15696a] transition-colors"
                >
                  Message
                </button>
                <button
                  onClick={() => {
                    setFeedbackTarget(student);
                    setFeedbackText("");
                  }}
                  className="border border-[#4E545C] text-[#4E545C] px-3 py-1.5 text-xs font-medium hover:bg-[#4E545C]/10 transition-colors"
                >
                  Feedback
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-400 bg-white border border-gray-200">
              No at-risk students for this filter.
            </div>
          )}
        </div>
      </div>

      {/* Message Panel */}
      {messageTarget && (
        <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-8 sm:right-8 sm:w-[320px] bg-[#4E545C] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white text-sm font-medium min-w-0 truncate pr-2">
              Message — {messageTarget.name}
            </span>
            <button
              onClick={() => setMessageTarget(null)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="h-40 bg-[#4E545C]" />
          <div className="bg-white p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 min-w-0">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Message"
              className="flex-1 min-w-0 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#4E545C] transition-colors"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleSendMessage}
                className="flex-1 sm:flex-none shrink-0 bg-gray-200 hover:bg-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors"
              >
                send
              </button>
              <button className="flex-1 sm:flex-none shrink-0 bg-gray-200 hover:bg-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors">
                voice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackTarget && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setFeedbackTarget(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md bg-white rounded-lg shadow-2xl z-50 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-2 mb-4">
              <h3 className="text-base font-semibold text-gray-800 min-w-0 break-words">
                Feedback for {feedbackTarget.name}
              </h3>
              <button
                onClick={() => setFeedbackTarget(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Write your feedback..."
              rows={4}
              className="w-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#4E545C] transition-colors resize-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setFeedbackTarget(null)}
                className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                className="bg-[#4E545C] text-white px-5 py-2 text-sm font-medium hover:bg-[#15696a] transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </FacultyLayout>
  );
};

export default AtRiskStudents;
