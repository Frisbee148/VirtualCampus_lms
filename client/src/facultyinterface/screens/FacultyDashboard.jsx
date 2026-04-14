import React, { useState } from "react";
import FacultyLayout from "../FacultyLayout";
import CourseTabs from "../components/CourseTabs";
import EvaluationTable from "../components/EvaluationTable";
import FacultyCards from "../components/FacultyCards";
import MarksTable from "../components/MarksTable";
import AttendanceTable from "../components/AttendanceTable";
import AssignmentsTable from "../components/AssignmentsTable";
import {
  getCifCourse,
  getStoredFacultyCourseKey,
} from "../../shared/cifCompletionData";

const initialSections = [
  { id: 1, name: "Quiz 1", weightage: 10, classAverage: 8, completed: false },
  { id: 2, name: "Midsem", weightage: 30, classAverage: 25, completed: false },
];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sections, setSections] = useState(initialSections);
  const assignedCourse = getCifCourse(getStoredFacultyCourseKey());

  return (
    <FacultyLayout>
      <div className="max-w-5xl">
        <div className="mb-4">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
            Assigned Course
          </p>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-1">
            {assignedCourse.code} - {assignedCourse.title}
          </h2>
        </div>

        {/* Tabs */}
        <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <EvaluationTable
              sections={sections}
              onSectionsChange={setSections}
            />
            <div className="my-8 border-t-2 border-[#242424]/30"></div>
            <FacultyCards />
          </div>
        )}

        {activeTab === "marks" && <MarksTable sections={sections} />}

        {activeTab === "attendance" && <AttendanceTable />}

        {activeTab === "assignments" && <AssignmentsTable />}
      </div>
    </FacultyLayout>
  );
};

export default FacultyDashboard;
