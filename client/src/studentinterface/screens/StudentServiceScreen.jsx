import React, { useState, useEffect } from "react";
import StudentLayout from "../StudentLayout";
import { useSession } from "../../context/SessionContext";
import { fetchService } from "../../auth/studentApi";

const badgeClassByValue = {
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Submitted: "bg-blue-50 text-[#4E545C] border-blue-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  Closed: "bg-slate-100 text-slate-700 border-slate-200",
  Open: "bg-violet-50 text-violet-700 border-violet-200",
  Released: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Downloaded: "bg-blue-50 text-[#4E545C] border-blue-200",
  Paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Unpaid: "bg-amber-50 text-amber-700 border-amber-200",
  Waived: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Present: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Absent: "bg-rose-50 text-rose-700 border-rose-200",
  Late: "bg-amber-50 text-amber-700 border-amber-200",
};

const getBadgeClass = (value) => {
  return (
    badgeClassByValue[value] || "bg-gray-100 text-gray-700 border-gray-200"
  );
};

const StudentServiceScreen = ({ serviceKey, activeTab }) => {
  const { selectedSession } = useSession();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const isStudentHistory = serviceKey === "studentHistory";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchService(serviceKey)
      .then((data) => {
        if (!cancelled) setConfig(data);
      })
      .catch(() => {
        if (!cancelled) setConfig(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [serviceKey]);

  if (loading) {
    return (
      <StudentLayout activeTab={activeTab}>
        <div className="max-w-6xl">
          <div className="h-8 w-48 bg-gray-100 mb-4 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-50 border border-gray-100 animate-pulse" />)}
          </div>
          <div className="h-48 bg-gray-50 border border-gray-100 animate-pulse" />
        </div>
      </StudentLayout>
    );
  }

  if (!config) {
    return (
      <StudentLayout activeTab={activeTab}>
        <div className="max-w-5xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Student Service
          </h1>
          <p className="text-sm text-gray-500">
            No data is configured for this option yet.
          </p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab={activeTab}>
      <div className="max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {config.title}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">
          {config.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-8">
          {(config.stats || []).map((item, i) => (
            <div
              key={item.label || i}
              className="bg-white border border-gray-100 shadow-sm p-3 sm:p-4"
            >
              <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-base sm:text-xl font-bold text-gray-900 mt-1">
                {item.value}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        {isStudentHistory ? (
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Course List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {(config.columns || []).map((col) => (
                      <th
                        key={col.key}
                        className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(config.rows || []).map((row, index) => (
                    <tr
                      key={`${row[(config.columns || [])[0]?.key]}-${index}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {(config.columns || []).map((col) => (
                        <td
                          key={col.key}
                          className="py-3.5 px-5 text-sm text-gray-700 whitespace-nowrap"
                        >
                          <span
                            className={
                              col.key === "courseName"
                                ? "font-medium text-gray-900"
                                : "text-gray-700"
                            }
                          >
                            {row[col.key]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                Current Entries
              </h2>
              <button className="px-3 py-1.5 bg-[#4E545C] text-white text-[11px] sm:text-xs font-medium hover:bg-[#828a91] transition-colors cursor-pointer">
                New Request
              </button>
            </div>

            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {(config.columns || []).map((col) => (
                      <th
                        key={col.key}
                        className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(config.rows || []).map((row, index) => (
                    <tr
                      key={`${row[(config.columns || [])[0]?.key]}-${index}`}
                      className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors"
                    >
                      {(config.columns || []).map((col) => {
                        const value = row[col.key];
                        const isBadge =
                          col.key === "status" || col.key === "attendance";

                        return (
                          <td
                            key={col.key}
                            className="py-3.5 px-5 text-sm text-gray-700 whitespace-nowrap"
                          >
                            {isBadge ? (
                              <span
                                className={`inline-block px-2 py-0.5 text-xs font-semibold border ${getBadgeClass(value)}`}
                              >
                                {value}
                              </span>
                            ) : (
                              <span className="text-gray-700">{value}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="sm:hidden p-3 space-y-3">
              {(config.rows || []).map((row, index) => (
                <div
                  key={`${row[(config.columns || [])[0]?.key]}-${index}`}
                  className="border border-gray-100 p-3"
                >
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    {row[(config.columns || [])[0]?.key]}
                  </p>
                  <div className="space-y-1.5">
                    {(config.columns || []).slice(1).map((col) => {
                      const value = row[col.key];
                      const isBadge =
                        col.key === "status" || col.key === "attendance";

                      return (
                        <div
                          key={col.key}
                          className="flex items-center justify-between gap-2"
                        >
                          <span className="text-[11px] text-gray-400 uppercase tracking-wide">
                            {col.label}
                          </span>
                          {isBadge ? (
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] font-semibold border ${getBadgeClass(value)}`}
                            >
                              {value}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-700 text-right">
                              {value}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentServiceScreen;
