import React, { useState } from "react";
import StaffLayout from "../StaffLayout";
import {
  Plus,
  Send,
  Clock,
  Edit3,
  Trash2,
  X,
  Users,
  GraduationCap,
} from "lucide-react";

const announcements = [
  { id: 1, title: "Mid-semester exam schedule published", audience: "All Users", status: "sent", date: "Apr 10, 2026", author: "Anita Sharma" },
  { id: 2, title: "Library timings extended during exams", audience: "All Users", status: "sent", date: "Apr 8, 2026", author: "Anita Sharma" },
  { id: 3, title: "CS301 — Extra tutorial session Saturday", audience: "CS301 Data Structures", status: "sent", date: "Apr 7, 2026", author: "Anita Sharma" },
  { id: 4, title: "Summer internship registration deadline", audience: "All Users", status: "draft", date: "Apr 12, 2026", author: "Anita Sharma" },
  { id: 5, title: "Hostel maintenance notice — Block C", audience: "All Users", status: "draft", date: "Apr 12, 2026", author: "Anita Sharma" },
  { id: 6, title: "Faculty development workshop — April 20", audience: "All Users", status: "sent", date: "Apr 5, 2026", author: "Anita Sharma" },
  { id: 7, title: "EE201 — Lab rescheduled to Thursday", audience: "EE201 Digital Electronics", status: "sent", date: "Apr 4, 2026", author: "Anita Sharma" },
];

const statusColors = {
  sent: "bg-emerald-50 text-emerald-700",
  draft: "bg-gray-100 text-gray-500",
};

const StaffAnnouncements = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "", audience: "all" });
  const [tab, setTab] = useState("all"); // all | sent | draft

  const filtered = tab === "all" ? announcements : announcements.filter((a) => a.status === tab);

  return (
    <StaffLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Announcements</h2>
            <p className="text-sm text-gray-400">{announcements.length} total · {announcements.filter((a) => a.status === "draft").length} drafts</p>
          </div>
          <button
            onClick={() => { setFormData({ title: "", body: "", audience: "all" }); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-[#0f1117] text-white text-xs font-medium hover:bg-[#1a1d27] transition-colors"
          >
            <Plus size={14} /> New Announcement
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-4">
          {[
            { key: "all", label: "All" },
            { key: "sent", label: "Sent" },
            { key: "draft", label: "Drafts" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                tab === t.key ? "bg-[#0f1117] text-white" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Announcements list */}
        <div className="bg-white border border-gray-100 shadow-sm">
          <div className="divide-y divide-gray-50">
            {filtered.map((a) => (
              <div key={a.id} className="px-4 sm:px-5 py-4 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${statusColors[a.status]}`}>
                        {a.status === "sent" ? "Sent" : "Draft"}
                      </span>
                      <span className="text-[10px] text-gray-300">{a.date}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-800">{a.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      {a.audience === "All Users" ? (
                        <span className="flex items-center gap-1 text-[10px] text-gray-400">
                          <Users size={10} /> All Users
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-blue-500">
                          <GraduationCap size={10} /> {a.audience}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-300">by {a.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {a.status === "draft" && (
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Send">
                        <Send size={13} />
                      </button>
                    )}
                    <button className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors" title="Edit">
                      <Edit3 size={13} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-gray-400">No announcements found</p>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-white w-full max-w-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800">New Announcement</h3>
                <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-black transition-colors">
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Announcement title"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Target Audience</label>
                  <select
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    <option value="all">All Users</option>
                    <option value="cs301">CS301 Data Structures</option>
                    <option value="cs405">CS405 Machine Learning</option>
                    <option value="ee201">EE201 Digital Electronics</option>
                    <option value="me205">ME205 Thermodynamics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-medium text-gray-500 mb-1.5">Message</label>
                  <textarea
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 text-xs border border-gray-200 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                    placeholder="Write your announcement..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-100">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
                  Save as Draft
                </button>
                <button onClick={() => setShowModal(false)} className="flex items-center gap-1.5 px-4 py-2 text-xs bg-[#0f1117] text-white font-medium hover:bg-[#1a1d27] transition-colors">
                  <Send size={12} /> Send Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StaffLayout>
  );
};

export default StaffAnnouncements;
