import React, { useState } from "react";
import HodLayout from "../HodLayout";
import { ChevronDown, MessageSquare, X } from "lucide-react";

const RISK_TYPES = ["All", "Attendance", "CGPA", "Inactivity"];
const COURSE_FILTER = ["All Courses", "CS102", "CS103", "CS201", "CS301", "CS401", "CS405", "CS501"];

const initialStudents = [
  { id: 1, name: "Aarav Sharma", reason: "Attendance below 60%", type: "Attendance", course: "CS301", faculty: "Dr. Farah Khan", reviewed: false },
  { id: 2, name: "Priya Patel", reason: "CGPA dropped below 5.0", type: "CGPA", course: "CS201", faculty: "Prof. Amit Verma", reviewed: false },
  { id: 3, name: "Rohan Gupta", reason: "No activity for 14 days", type: "Inactivity", course: "CS405", faculty: "Dr. Farah Khan", reviewed: false },
  { id: 4, name: "Sneha Reddy", reason: "Attendance below 50%", type: "Attendance", course: "CS103", faculty: "Dr. Priya Sharma", reviewed: false },
  { id: 5, name: "Karan Singh", reason: "CGPA dropped below 5.0", type: "CGPA", course: "CS301", faculty: "Dr. Farah Khan", reviewed: true },
  { id: 6, name: "Meera Iyer", reason: "Attendance below 65%", type: "Attendance", course: "CS501", faculty: "Dr. Rajesh Kumar", reviewed: false },
  { id: 7, name: "Vikram Nair", reason: "No activity for 21 days", type: "Inactivity", course: "CS401", faculty: "Prof. Suresh Iyer", reviewed: false },
  { id: 8, name: "Anita Deshmukh", reason: "CGPA dropped below 4.5", type: "CGPA", course: "CS102", faculty: "Dr. Neha Gupta", reviewed: false },
  { id: 9, name: "Rahul Verma", reason: "Attendance below 55%", type: "Attendance", course: "CS201", faculty: "Prof. Amit Verma", reviewed: true },
  { id: 10, name: "Divya Menon", reason: "Attendance below 60%", type: "Attendance", course: "CS303", faculty: "Dr. Priya Sharma", reviewed: false },
];

const HodAtRisk = () => {
  const [filterType, setFilterType] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [typeOpen, setTypeOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [messageTarget, setMessageTarget] = useState(null);
  const [messageText, setMessageText] = useState("");

  const filtered = students.filter((s) => {
    const matchesType = filterType === "All" || s.type === filterType;
    const matchesCourse = courseFilter === "All Courses" || s.course === courseFilter;
    return matchesType && matchesCourse;
  });

  const toggleReviewed = (id) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, reviewed: !s.reviewed } : s)));
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("");
      setMessageTarget(null);
    }
  };

  return (
    <HodLayout>
      <div className="max-w-5xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">At Risk Students</h2>
        <p className="text-sm text-gray-400 mb-4">Department-wide view · {filtered.length} students flagged</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative">
            <button
              onClick={() => { setTypeOpen(!typeOpen); setCourseOpen(false); }}
              className="px-3 py-2 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              Risk: {filterType} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {typeOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[140px]">
                {RISK_TYPES.map((t) => (
                  <button key={t} onClick={() => { setFilterType(t); setTypeOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filterType === t ? "bg-gray-100 font-medium" : ""}`}
                  >{t}</button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => { setCourseOpen(!courseOpen); setTypeOpen(false); }}
              className="px-3 py-2 text-sm border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              {courseFilter} <ChevronDown size={14} className="text-gray-400" />
            </button>
            {courseOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-30 min-w-[140px] max-h-48 overflow-y-auto">
                {COURSE_FILTER.map((c) => (
                  <button key={c} onClick={() => { setCourseFilter(c); setCourseOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${courseFilter === c ? "bg-gray-100 font-medium" : ""}`}
                  >{c}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="text-left px-4 py-3 font-medium">Student</th>
                <th className="text-left px-4 py-3 font-medium">Course</th>
                <th className="text-left px-4 py-3 font-medium">Faculty</th>
                <th className="text-left px-4 py-3 font-medium">Risk Type</th>
                <th className="text-left px-4 py-3 font-medium">Reason</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-4 py-3 text-[#242424] font-medium">{s.course}</td>
                  <td className="px-4 py-3 text-gray-600">{s.faculty}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                      s.type === "Attendance" ? "bg-amber-50 text-amber-700" :
                      s.type === "CGPA" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"
                    }`}>{s.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{s.reason}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setMessageTarget(s); setMessageText(""); }}
                        className="p-1.5 text-[#242424] hover:bg-[#242424]/10 rounded transition-colors"
                        title="Message faculty"
                      >
                        <MessageSquare size={14} />
                      </button>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={s.reviewed}
                          onChange={() => toggleReviewed(s.id)}
                          className="w-3.5 h-3.5 accent-[#242424] cursor-pointer"
                        />
                        <span className="text-[10px] text-gray-400">{s.reviewed ? "Reviewed" : "Pending"}</span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No at-risk students match filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2">
          {filtered.map((s) => (
            <div key={s.id} className="bg-white border border-gray-100 p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <p className="text-[10px] text-gray-400">{s.course} · {s.faculty}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full flex-shrink-0 ${
                  s.type === "Attendance" ? "bg-amber-50 text-amber-700" :
                  s.type === "CGPA" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-600"
                }`}>{s.type}</span>
              </div>
              <p className="text-[10px] text-gray-500">{s.reason}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setMessageTarget(s); setMessageText(""); }}
                  className="text-xs text-[#242424] font-medium hover:underline"
                >
                  Message
                </button>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={s.reviewed} onChange={() => toggleReviewed(s.id)} className="w-3.5 h-3.5 accent-[#242424]" />
                  <span className="text-[10px] text-gray-400">{s.reviewed ? "Reviewed" : "Pending"}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Panel */}
      {messageTarget && (
        <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-8 sm:right-8 sm:w-[320px] bg-[#242424] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-white text-sm font-medium truncate pr-2">
              Re: {messageTarget.name} — {messageTarget.faculty}
            </span>
            <button onClick={() => setMessageTarget(null)} className="text-white/60 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="h-28 bg-[#242424]" />
          <div className="bg-white p-3 flex items-center gap-2">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Message to faculty..."
              className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#242424] transition-colors"
            />
            <button onClick={handleSendMessage} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-xs font-medium text-gray-700 transition-colors">
              Send
            </button>
          </div>
        </div>
      )}
    </HodLayout>
  );
};

export default HodAtRisk;
