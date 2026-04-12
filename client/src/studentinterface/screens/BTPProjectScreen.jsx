import React from "react";
import StudentLayout from "../StudentLayout";
import BTPProjectBoard from "../../shared/BTPProjectBoard";

const BTPProjectScreen = () => {
  return (
    <StudentLayout activeTab="Performance Review">
      <div className="max-w-6xl">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            BTP Projects
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Request a BTP project, watch the pending status, and follow faculty
            progress after approval.
          </p>
        </div>
        <BTPProjectBoard editable={false} roleLabel="Student View" />
      </div>
    </StudentLayout>
  );
};

export default BTPProjectScreen;
