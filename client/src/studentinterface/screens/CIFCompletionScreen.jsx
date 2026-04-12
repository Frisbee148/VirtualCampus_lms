import React from "react";
import StudentLayout from "../StudentLayout";
import CIFCompletionBoard from "../../shared/CIFCompletionBoard";

const CIFCompletionScreen = () => {
  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-6xl">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            CIF Completion
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Choose a course CIF, view its PDF copy, and track the
            faculty-verified digital checklist.
          </p>
        </div>
        <CIFCompletionBoard editable={false} roleLabel="Student View" />
      </div>
    </StudentLayout>
  );
};

export default CIFCompletionScreen;
