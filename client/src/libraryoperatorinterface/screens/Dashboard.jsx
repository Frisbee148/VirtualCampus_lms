import React from "react";
import { useNavigate } from "react-router-dom";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import {
  BookPlus,
  ArrowLeftRight,
  RefreshCw,
  Search,
  Clock,
  AlertTriangle,
} from "lucide-react";

const LibraryOperatorDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "issue",
      icon: BookPlus,
      label: "Issue Book",
      path: "/library-operator/issue",
      color: "bg-emerald-500",
    },
    {
      id: "return",
      icon: ArrowLeftRight,
      label: "Return Book",
      path: "/library-operator/return",
      color: "bg-blue-500",
    },
    {
      id: "renew",
      icon: RefreshCw,
      label: "Renew Book",
      path: "/library-operator/renew",
      color: "bg-amber-500",
    },
    {
      id: "search",
      icon: Search,
      label: "Search",
      path: "/library-operator/search",
      color: "bg-purple-500",
    },
  ];

  const stats = [
    { label: "Books Issued", value: "124" },
    { label: "Returns Today", value: "18" },
    { label: "Overdue", value: "5", alert: true },
    { label: "Pending Reservations", value: "12" },
  ];

  return (
    <LibraryOperatorLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Quick Actions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Select an action to get started
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => navigate(action.path)}
                className="group flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div
                  className={`p-4 ${action.color} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={28} strokeWidth={1.8} />
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Today's Overview
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p
                  className={`text-2xl font-bold ${
                    stat.alert ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-amber-500" />
              <h2 className="text-base font-semibold text-gray-900">
                Overdue Books
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-600">The Great Gatsby</span>
                <span className="text-xs text-red-500 font-medium">3 days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-600">1984</span>
                <span className="text-xs text-red-500 font-medium">5 days</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">To Kill a Mockingbird</span>
                <span className="text-xs text-red-500 font-medium">7 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-blue-500" />
              <h2 className="text-base font-semibold text-gray-900">
                Upcoming Returns
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-600">Harry Potter</span>
                <span className="text-xs text-gray-500">Due tomorrow</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-600">The Hobbit</span>
                <span className="text-xs text-gray-500">Due in 2 days</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Lord of the Rings</span>
                <span className="text-xs text-gray-500">Due in 3 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorDashboard;