import React, { useState } from 'react';
import FacultyLayout from '../FacultyLayout';
import CourseTabs from '../components/CourseTabs';
import EvaluationTable from '../components/EvaluationTable';
import FacultyCards from '../components/FacultyCards';
import MarksTable from '../components/MarksTable';
import AttendanceTable from '../components/AttendanceTable';
import AssignmentsTable from '../components/AssignmentsTable';

const initialSections = [
  { id: 1, name: 'Quiz 1', weightage: 10, classAverage: 8, completed: false },
  { id: 2, name: 'Midsem', weightage: 30, classAverage: 25, completed: false },
];

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sections, setSections] = useState(initialSections);

  return (
    <FacultyLayout>
      <div className="max-w-5xl">
        {/* Course Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">ABC course</h2>

        {/* Tabs */}
        <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <EvaluationTable sections={sections} onSectionsChange={setSections} />
            <div className="my-8 border-t-2 border-[#1a7a7a]/30"></div>
            <FacultyCards />
          </div>
        )}

        {activeTab === 'marks' && (
          <MarksTable sections={sections} />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTable />
        )}

        {activeTab === 'assignments' && (
          <AssignmentsTable />
        )}
      </div>
    </FacultyLayout>
  );
};

export default FacultyDashboard;
