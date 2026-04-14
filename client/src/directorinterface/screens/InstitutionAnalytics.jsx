import React, { useState } from "react";
import DirectorLayout from "../DirectorLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const enrollmentTrend = [
  { year: "2018", ug: 2100, pg: 380, phd: 45 },
  { year: "2019", ug: 2250, pg: 410, phd: 52 },
  { year: "2020", ug: 2400, pg: 450, phd: 58 },
  { year: "2021", ug: 2580, pg: 490, phd: 65 },
  { year: "2022", ug: 2700, pg: 520, phd: 72 },
  { year: "2023", ug: 2850, pg: 560, phd: 80 },
  { year: "2024", ug: 2950, pg: 590, phd: 88 },
  { year: "2025", ug: 3050, pg: 620, phd: 95 },
];

const placementData = [
  { year: "2020", placed: 78, avgPackage: 8.2 },
  { year: "2021", placed: 82, avgPackage: 9.1 },
  { year: "2022", placed: 85, avgPackage: 10.5 },
  { year: "2023", placed: 88, avgPackage: 11.8 },
  { year: "2024", placed: 90, avgPackage: 12.4 },
  { year: "2025", placed: 92, avgPackage: 13.2 },
];

const researchOutput = [
  { year: "2020", publications: 120, patents: 5, grants: 8 },
  { year: "2021", publications: 145, patents: 8, grants: 12 },
  { year: "2022", publications: 168, patents: 11, grants: 15 },
  { year: "2023", publications: 192, patents: 14, grants: 18 },
  { year: "2024", publications: 215, patents: 18, grants: 22 },
  { year: "2025", publications: 240, patents: 21, grants: 26 },
];

const revenueData = [
  { year: "2020", tuition: 28, grants: 8, other: 4 },
  { year: "2021", tuition: 31, grants: 10, other: 5 },
  { year: "2022", tuition: 34, grants: 12, other: 5.5 },
  { year: "2023", tuition: 37, grants: 14, other: 6 },
  { year: "2024", tuition: 41, grants: 16, other: 7 },
  { year: "2025", tuition: 44, grants: 18, other: 7.5 },
];

const InstitutionAnalytics = () => {
  const [activeTab, setActiveTab] = useState("enrollment");

  const tabs = [
    { id: "enrollment", label: "Enrollment" },
    { id: "placements", label: "Placements" },
    { id: "research", label: "Research" },
    { id: "revenue", label: "Revenue" },
  ];

  return (
    <DirectorLayout>
      <div className="max-w-6xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
          Institution Analytics
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Comprehensive institutional performance metrics
        </p>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-1 bg-gray-100 rounded-lg p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                  activeTab === t.id
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enrollment */}
        {activeTab === "enrollment" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">UG Students</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">3,050</p>
                <p className="text-xs text-emerald-500 mt-1">
                  ↑ 3.4% vs last year
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">PG Students</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">620</p>
                <p className="text-xs text-emerald-500 mt-1">
                  ↑ 5.1% vs last year
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Ph.D Scholars</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">95</p>
                <p className="text-xs text-emerald-500 mt-1">
                  ↑ 8.0% vs last year
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Enrollment Trend (2018–2025)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={enrollmentTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "13px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area
                    type="monotone"
                    dataKey="ug"
                    name="UG"
                    stroke="#6c2bd9"
                    fill="#6c2bd9"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="pg"
                    name="PG"
                    stroke="#242424"
                    fill="#242424"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="phd"
                    name="Ph.D"
                    stroke="#d97706"
                    fill="#d97706"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Placements */}
        {activeTab === "placements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Placement Rate (2025)</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">92%</p>
                <p className="text-xs text-emerald-500 mt-1">
                  ↑ 2% from last year
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Avg. Package (2025)</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  ₹13.2 LPA
                </p>
                <p className="text-xs text-emerald-500 mt-1">
                  ↑ 6.5% from last year
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Placement Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={placementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "13px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    yAxisId="left"
                    dataKey="placed"
                    name="Placement %"
                    fill="#6c2bd9"
                    radius={[6, 6, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgPackage"
                    name="Avg Package (LPA)"
                    stroke="#242424"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Research */}
        {activeTab === "research" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Publications (2025)</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">240</p>
                <p className="text-xs text-emerald-500 mt-1">↑ 11.6% YoY</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Patents Filed</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">21</p>
                <p className="text-xs text-emerald-500 mt-1">↑ 16.7% YoY</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Research Grants</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">26</p>
                <p className="text-xs text-emerald-500 mt-1">↑ 18.2% YoY</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Research Output Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={researchOutput}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "13px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line
                    type="monotone"
                    dataKey="publications"
                    name="Publications"
                    stroke="#6c2bd9"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="patents"
                    name="Patents"
                    stroke="#d97706"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="grants"
                    name="Grants"
                    stroke="#242424"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Revenue */}
        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Tuition Revenue</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹44 Cr</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Research Grants</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹18 Cr</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-400">Other Income</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">₹7.5 Cr</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Revenue Breakdown (₹ Crore)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      fontSize: "13px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar
                    dataKey="tuition"
                    name="Tuition"
                    fill="#6c2bd9"
                    stackId="a"
                  />
                  <Bar
                    dataKey="grants"
                    name="Grants"
                    fill="#242424"
                    stackId="a"
                  />
                  <Bar
                    dataKey="other"
                    name="Other"
                    fill="#d97706"
                    stackId="a"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </DirectorLayout>
  );
};

export default InstitutionAnalytics;
