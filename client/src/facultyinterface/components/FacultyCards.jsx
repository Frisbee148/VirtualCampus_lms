import React from 'react';

const faculties = [
  { id: 1, name: 'Dr. Sharma', department: 'CSE', initials: 'DS' },
  { id: 2, name: 'Dr. Gupta', department: 'ECE', initials: 'DG' },
  { id: 3, name: 'Dr. Verma', department: 'CSE', initials: 'DV' },
];

const FacultyCards = () => {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 underline mb-4">Subject faculties</h3>
      <div className="flex flex-wrap gap-4">
        {faculties.map((faculty) => (
          <div
            key={faculty.id}
            className="bg-[#4E545C] text-white px-4 sm:px-8 py-3 text-xs sm:text-sm font-medium hover:bg-[#828a91] transition-colors cursor-pointer min-w-[120px] sm:min-w-[160px] text-center"
          >
            Faculty card
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyCards;
