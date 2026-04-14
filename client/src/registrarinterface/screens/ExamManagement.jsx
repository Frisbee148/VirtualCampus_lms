import React, { useState } from "react";
import RegistrarLayout from "../RegistrarLayout";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const examsData = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures & Algorithms",
    date: "Apr 15, 2026",
    time: "09:00 AM",
    venue: "Hall A & B",
    batch: "B.Tech CSE — Sem 3",
    registered: 180,
    status: "scheduled",
  },
  {
    id: 2,
    code: "EC401",
    name: "Digital Signal Processing",
    date: "Apr 16, 2026",
    time: "02:00 PM",
    venue: "Hall C",
    batch: "B.Tech ECE — Sem 4",
    registered: 120,
    status: "scheduled",
  },
  {
    id: 3,
    code: "ME201",
    name: "Engineering Mechanics",
    date: "Apr 17, 2026",
    time: "09:00 AM",
    venue: "Hall D & E",
    batch: "B.Tech ME — Sem 2",
    registered: 150,
    status: "scheduled",
  },
  {
    id: 4,
    code: "CS501",
    name: "Machine Learning",
    date: "Apr 18, 2026",
    time: "02:00 PM",
    venue: "Hall A",
    batch: "B.Tech CSE — Sem 5",
    registered: 95,
    status: "hall-ticket-pending",
  },
  {
    id: 5,
    code: "MBA301",
    name: "Financial Management",
    date: "Apr 19, 2026",
    time: "09:00 AM",
    venue: "MBA Block",
    batch: "MBA — Sem 3",
    registered: 60,
    status: "scheduled",
  },
  {
    id: 6,
    code: "PH101",
    name: "Physics I",
    date: "Apr 14, 2026",
    time: "09:00 AM",
    venue: "Hall F",
    batch: "B.Tech All — Sem 1",
    registered: 400,
    status: "completed",
  },
  {
    id: 7,
    code: "MA102",
    name: "Linear Algebra",
    date: "Apr 13, 2026",
    time: "02:00 PM",
    venue: "Hall A,B,C",
    batch: "B.Tech All — Sem 1",
    registered: 400,
    status: "results-published",
  },
  {
    id: 8,
    code: "CS701",
    name: "Advanced AI",
    date: "Apr 20, 2026",
    time: "10:00 AM",
    venue: "TBD",
    batch: "M.Tech AI — Sem 1",
    registered: 35,
    status: "hall-ticket-pending",
  },
];

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: CheckCircle,
  },
  "hall-ticket-pending": {
    label: "Hall Tickets Pending",
    bg: "bg-amber-50",
    text: "text-amber-600",
    icon: AlertCircle,
  },
  completed: {
    label: "Completed",
    bg: "bg-zinc-100",
    text: "text-zinc-600",
    icon: CheckCircle,
  },
  "results-published": {
    label: "Results Published",
    bg: "bg-purple-50",
    text: "text-purple-600",
    icon: CheckCircle,
  },
};

const ExamManagement = () => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? examsData : examsData.filter((e) => e.status === filter);

  return (
    <RegistrarLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Exam Management
            </h2>
            <p className="text-sm text-gray-400">
              Schedule exams, manage hall tickets, and publish results
            </p>
          </div>
          <button className="px-4 py-2 text-sm font-medium bg-[#242424] text-white rounded-lg hover:bg-[#434343] transition-colors w-full sm:w-auto">
            + Schedule Exam
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-1 bg-gray-100 rounded-lg p-1">
            {[
              "all",
              "scheduled",
              "hall-ticket-pending",
              "completed",
              "results-published",
            ].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md capitalize transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {f === "all" ? "All" : f.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Exam Cards */}
        <div className="space-y-3">
          {filtered.map((exam) => {
            const sc = statusConfig[exam.status];
            const StatusIcon = sc.icon;
            return (
              <div
                key={exam.id}
                className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[#242424]/10 flex flex-col items-center justify-center">
                    <span className="text-[#242424] font-bold text-sm">
                      {exam.code}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {exam.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{exam.batch}</p>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                      <span className="flex items-center gap-1 text-xs text-gray-500 min-w-0 break-words">
                        <Calendar size={12} /> {exam.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 min-w-0 break-words">
                        <Clock size={12} /> {exam.time}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 min-w-0 break-words">
                        <MapPin size={12} /> {exam.venue}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 min-w-0 break-words">
                        <Users size={12} /> {exam.registered} registered
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${sc.bg} ${sc.text}`}
                    >
                      <StatusIcon size={12} />
                      {sc.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No exams match this filter.
          </div>
        )}
      </div>
    </RegistrarLayout>
  );
};

export default ExamManagement;
