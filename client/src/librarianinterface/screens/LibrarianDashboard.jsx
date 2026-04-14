import React from "react";
import { useNavigate } from "react-router-dom";
import LibrarianLayout from "../LibrarianLayout";
import { ChevronRight } from "lucide-react";

const stats = [
  { label: "Total Books", value: "12,480" },
  { label: "Books Issued", value: "1,236" },
  { label: "Overdue Books", value: "47", alert: true },
  { label: "Active Users", value: "3,842" },
];

const recentTransactions = [
  { id: 1, book: "Introduction to Algorithms", user: "Aarav Sharma", action: "Issued", time: "10 min ago", type: "issue" },
  { id: 2, book: "Database System Concepts", user: "Priya Patel", action: "Returned", time: "25 min ago", type: "return" },
  { id: 3, book: "Computer Networks", user: "Rohan Gupta", action: "Renewed", time: "1 hr ago", type: "renew" },
  { id: 4, book: "Operating System Concepts", user: "Sneha Jain", action: "Issued", time: "1 hr ago", type: "issue" },
  { id: 5, book: "Discrete Mathematics", user: "Vikram Reddy", action: "Returned", time: "2 hrs ago", type: "return" },
  { id: 6, book: "Digital Logic Design", user: "Ananya Das", action: "Issued", time: "3 hrs ago", type: "issue" },
];

const overdueAlerts = [
  { id: 1, book: "Data Structures Using C", user: "Rahul Verma", dueDate: "Apr 4, 2026", daysOverdue: 7 },
  { id: 2, book: "Linear Algebra", user: "Meera Iyer", dueDate: "Apr 6, 2026", daysOverdue: 5 },
  { id: 3, book: "Probability & Statistics", user: "Karan Singh", dueDate: "Apr 8, 2026", daysOverdue: 3 },
  { id: 4, book: "Compiler Design", user: "Divya Nair", dueDate: "Apr 9, 2026", daysOverdue: 2 },
];

const actionColors = {
  issue: "bg-zinc-100 text-zinc-600",
  return: "bg-emerald-50 text-emerald-600",
  renew: "bg-zinc-100 text-zinc-600",
};

const LibrarianDashboard = () => {
  const navigate = useNavigate();

  return (
    <LibrarianLayout>
      <div className="max-w-6xl">
        <h1 className="text-xl sm:text-2xl font-light text-gray-800 mb-1">
          Welcome, <span className="font-semibold">Librarian</span>
        </h1>
        <p className="text-sm text-gray-400 mb-5 sm:mb-8">
          Library overview, recent activity & alerts
        </p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="bg-white p-4 sm:p-5 border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{s.label}</p>
                </div>
                <p className={`text-2xl sm:text-3xl font-bold mb-0.5 ${s.alert ? "text-red-600" : "text-gray-900"}`}>
                  {s.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions + Overdue Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-5">
          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                Recent Transactions
              </p>
              <button
                onClick={() => navigate("/librarian/borrow")}
                className="text-xs text-[#242424] hover:underline font-medium"
              >
                Issue / Return
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="px-4 sm:px-5 py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {tx.book}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{tx.user}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${actionColors[tx.type]}`}
                    >
                      {tx.action}
                    </span>
                    <span className="text-xs text-gray-400">{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Alerts */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
              <p className="text-[10px] sm:text-xs font-medium text-gray-400 uppercase tracking-wider">
                Overdue Alerts
              </p>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                {overdueAlerts.length}
              </span>
            </div>
            <div className="divide-y divide-gray-100">
              {overdueAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="px-4 sm:px-5 py-3 hover:bg-gray-50/50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {alert.book}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{alert.user}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-400">
                      Due: {alert.dueDate}
                    </span>
                    <span className="text-[10px] font-medium text-red-600">
                      {alert.daysOverdue}d overdue
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LibrarianLayout>
  );
};

export default LibrarianDashboard;
