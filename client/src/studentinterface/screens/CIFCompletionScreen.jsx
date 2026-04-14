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
        </div>
        <CIFCompletionBoard editable={false} roleLabel="Student View" />
      </div>
    </StudentLayout>
  );
};

export default CIFCompletionScreen;
