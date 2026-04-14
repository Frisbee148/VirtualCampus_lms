import React from "react";
import { useNavigate } from "react-router-dom";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { ChevronRight } from "lucide-react";

const LibraryOperatorDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: "issue",
      label: "Issue Book",
      path: "/library-operator/issue",
    },
    {
      id: "return",
      label: "Return Book",
      path: "/library-operator/return",
    },
    {
      id: "renew",
      label: "Renew Book",
      path: "/library-operator/renew",
    },
    {
      id: "search",
      label: "Search Books",
      path: "/library-operator/search",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            return (
              <button
                key={action.id}
                onClick={() => navigate(action.path)}
                className="group flex items-center justify-between p-5 bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
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
          <div className="bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
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

          <div className="bg-white border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
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