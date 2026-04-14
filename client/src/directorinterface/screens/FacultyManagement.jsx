import React, { useState } from "react";
import DirectorLayout from "../DirectorLayout";
import { Search, Star, MoreVertical } from "lucide-react";

const facultyData = [
  {
    id: 1,
    name: "Dr. Anand Mishra",
    dept: "CSE",
    designation: "Professor & HOD",
    experience: "22 yrs",
    rating: 4.8,
    status: "active",
    email: "anand.m@lnmiit.ac.in",
    phone: "+91 98765 43210",
    publications: 45,
  },
  {
    id: 2,
    name: "Dr. Priya Gupta",
    dept: "ECE",
    designation: "Professor & HOD",
    experience: "18 yrs",
    rating: 4.7,
    status: "active",
    email: "priya.g@lnmiit.ac.in",
    phone: "+91 98765 43211",
    publications: 38,
  },
  {
    id: 3,
    name: "Prof. Vikram Singh",
    dept: "ME",
    designation: "Associate Professor",
    experience: "15 yrs",
    rating: 4.5,
    status: "active",
    email: "vikram.s@lnmiit.ac.in",
    phone: "+91 98765 43212",
    publications: 28,
  },
  {
    id: 4,
    name: "Dr. Sunita Rao",
    dept: "CE",
    designation: "Professor & HOD",
    experience: "20 yrs",
    rating: 4.6,
    status: "active",
    email: "sunita.r@lnmiit.ac.in",
    phone: "+91 98765 43213",
    publications: 35,
  },
  {
    id: 5,
    name: "Dr. Rakesh Kumar",
    dept: "M&C",
    designation: "Associate Professor",
    experience: "12 yrs",
    rating: 4.4,
    status: "on-leave",
    email: "rakesh.k@lnmiit.ac.in",
    phone: "+91 98765 43214",
    publications: 22,
  },
  {
    id: 6,
    name: "Dr. Meera Joshi",
    dept: "PHY",
    designation: "Professor",
    experience: "16 yrs",
    rating: 4.3,
    status: "active",
    email: "meera.j@lnmiit.ac.in",
    phone: "+91 98765 43215",
    publications: 31,
  },
  {
    id: 7,
    name: "Dr. Arun Patel",
    dept: "CHEM",
    designation: "Assistant Professor",
    experience: "8 yrs",
    rating: 4.1,
    status: "active",
    email: "arun.p@lnmiit.ac.in",
    phone: "+91 98765 43216",
    publications: 15,
  },
  {
    id: 8,
    name: "Prof. Kavita Sharma",
    dept: "HSS",
    designation: "Professor",
    experience: "19 yrs",
    rating: 4.5,
    status: "active",
    email: "kavita.s@lnmiit.ac.in",
    phone: "+91 98765 43217",
    publications: 42,
  },
  {
    id: 9,
    name: "Dr. Rajiv Menon",
    dept: "MGMT",
    designation: "Professor & HOD",
    experience: "14 yrs",
    rating: 4.2,
    status: "sabbatical",
    email: "rajiv.m@lnmiit.ac.in",
    phone: "+91 98765 43218",
    publications: 20,
  },
  {
    id: 10,
    name: "Prof. Nidhi Kapoor",
    dept: "DES",
    designation: "Associate Professor",
    experience: "10 yrs",
    rating: 4.6,
    status: "active",
    email: "nidhi.k@lnmiit.ac.in",
    phone: "+91 98765 43219",
    publications: 18,
  },
];

const statusColors = {
  active: { bg: "bg-emerald-50", text: "text-emerald-600" },
  "on-leave": { bg: "bg-amber-50", text: "text-amber-600" },
  sabbatical: { bg: "bg-zinc-100", text: "text-zinc-600" },
};

const FacultyManagement = () => {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");

  const departments = ["all", ...new Set(facultyData.map((f) => f.dept))];

  const filtered = facultyData.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "all" || f.dept === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <DirectorLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Faculty Management
            </h2>
            <p className="text-sm text-gray-400">
              {facultyData.length} faculty members across all departments
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search faculty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full sm:w-52 transition-colors"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] transition-colors w-full sm:w-auto"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === "all" ? "All Depts" : d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">
                    Faculty
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Dept
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden md:table-cell">
                    Designation
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden lg:table-cell">
                    Experience
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden lg:table-cell">
                    Rating
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 hidden xl:table-cell">
                    Publications
                  </th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((f) => {
                  const sc = statusColors[f.status] || statusColors.active;
                  return (
                    <tr
                      key={f.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {f.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {f.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-sm text-gray-600">
                        {f.dept}
                      </td>
                      <td className="px-3 py-3.5 hidden md:table-cell text-sm text-gray-600">
                        {f.designation}
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell text-sm text-gray-500">
                        {f.experience}
                      </td>
                      <td className="px-3 py-3.5 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Star
                            size={13}
                            className="text-amber-400 fill-amber-400"
                          />
                          <span className="text-sm text-gray-700 font-medium">
                            {f.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${sc.bg} ${sc.text}`}
                        >
                          {f.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 hidden xl:table-cell text-sm text-gray-500">
                        {f.publications}
                      </td>
                      <td className="px-3 py-3.5">
                        <button className="p-1 text-gray-300 hover:text-gray-600 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((f) => {
              const sc = statusColors[f.status] || statusColors.active;
              return (
                <div key={f.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {f.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {f.email}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-1 rounded-full capitalize ${sc.bg} ${sc.text}`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    {f.dept} | {f.designation}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{f.experience}</span>
                    <span className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="text-amber-400 fill-amber-400"
                      />
                      <span className="font-medium text-gray-700">
                        {f.rating}
                      </span>
                    </span>
                    <span>{f.publications} pubs</span>
                  </div>

                  <div className="flex justify-end">
                    <button className="p-1 text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No faculty found.
            </div>
          )}
        </div>
      </div>
    </DirectorLayout>
  );
};

export default FacultyManagement;
