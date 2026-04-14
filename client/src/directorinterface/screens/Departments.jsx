import React, { useState } from "react";
import DirectorLayout from "../DirectorLayout";
import { Search, ChevronRight } from "lucide-react";

const departmentsData = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Anand Mishra",
    faculty: 32,
    students: 820,
    programs: ["B.Tech", "M.Tech", "Ph.D"],
    color: "#6c2bd9",
  },
  {
    id: 2,
    name: "Electronics & Communication",
    code: "ECE",
    hod: "Dr. Priya Gupta",
    faculty: 28,
    students: 640,
    programs: ["B.Tech", "M.Tech"],
    color: "#242424",
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    code: "ME",
    hod: "Prof. Vikram Singh",
    faculty: 24,
    students: 480,
    programs: ["B.Tech", "M.Tech", "Ph.D"],
    color: "#d97706",
  },
  {
    id: 4,
    name: "Civil Engineering",
    code: "CE",
    hod: "Dr. Sunita Rao",
    faculty: 20,
    students: 380,
    programs: ["B.Tech", "M.Tech"],
    color: "#2563eb",
  },
  {
    id: 5,
    name: "Mathematics & Computing",
    code: "M&C",
    hod: "Dr. Rakesh Kumar",
    faculty: 18,
    students: 290,
    programs: ["B.Tech", "M.Sc"],
    color: "#dc2626",
  },
  {
    id: 6,
    name: "Physics",
    code: "PHY",
    hod: "Dr. Meera Joshi",
    faculty: 14,
    students: 120,
    programs: ["M.Sc", "Ph.D"],
    color: "#0891b2",
  },
  {
    id: 7,
    name: "Chemistry",
    code: "CHEM",
    hod: "Dr. Arun Patel",
    faculty: 12,
    students: 98,
    programs: ["M.Sc", "Ph.D"],
    color: "#be185d",
  },
  {
    id: 8,
    name: "Humanities & Social Sciences",
    code: "HSS",
    hod: "Prof. Kavita Sharma",
    faculty: 16,
    students: 180,
    programs: ["B.A", "M.A"],
    color: "#4f46e5",
  },
  {
    id: 9,
    name: "Management Studies",
    code: "MGMT",
    hod: "Dr. Rajiv Menon",
    faculty: 10,
    students: 140,
    programs: ["MBA"],
    color: "#ea580c",
  },
  {
    id: 10,
    name: "Design",
    code: "DES",
    hod: "Prof. Nidhi Kapoor",
    faculty: 8,
    students: 100,
    programs: ["B.Des", "M.Des"],
    color: "#7c3aed",
  },
];

const Departments = () => {
  const [search, setSearch] = useState("");

  const filtered = departmentsData.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DirectorLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Departments
            </h2>
            <p className="text-sm text-gray-400">
              Manage academic departments and their operations
            </p>
          </div>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 bg-white focus:outline-none focus:border-[#6c2bd9] w-full sm:w-64 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((dept) => (
            <div
              key={dept.id}
              className="bg-white border border-gray-100 p-5 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">
                      {dept.name}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-gray-400 flex-shrink-0">
                      {dept.code}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">HOD: {dept.hod}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span>{dept.faculty} Faculty</span>
                    <span>{dept.students} Students</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {dept.programs.map((p, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight
                  size={14}
                  className="text-gray-300 group-hover:text-[#6c2bd9] transition-colors flex-shrink-0 mt-0.5"
                />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            No departments found matching your search.
          </div>
        )}
      </div>
    </DirectorLayout>
  );
};

export default Departments;
