import React from 'react';
import StudentLayout from '../StudentLayout';

const FeeStatus = () => {
  const feeBreakdown = [
    { item: 'Tuition Fee', amount: '1,50,000' },
    { item: 'Development Fee', amount: '25,000' },
    { item: 'Lab Charges', amount: '15,000' },
    { item: 'Library & Internet', amount: '10,000' },
  ];

  return (
    <StudentLayout activeTab="Fee status">
      <div className="max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Fee Status</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Semester 3 - 2024-25</p>

        <div className="inline-block px-3 sm:px-5 py-1.5 sm:py-2 bg-[#4E545C] text-white text-xs sm:text-sm font-semibold mb-5 sm:mb-8">
          Semester 3
        </div>

        <div className="bg-white border border-gray-200 overflow-hidden mb-4 sm:mb-6">
          <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Fee Structure</h2>
          </div>
          <table className="w-full">
            <tbody>
              {feeBreakdown.map((f, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-medium text-gray-700">{f.item}</td>
                  <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-bold text-gray-900 text-right">{f.amount}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-bold text-gray-900">Total</td>
                <td className="py-3 sm:py-4 px-3 sm:px-5 text-xs sm:text-sm font-bold text-gray-900 text-right">2,00,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-emerald-50 border border-emerald-200 p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-wider">Fee Status</p>
            <p className="text-base sm:text-lg font-bold text-emerald-700 mt-1">Paid</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 p-3 sm:p-5">
            <p className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending</p>
            <p className="text-base sm:text-lg font-bold text-amber-700 mt-1">0</p>
          </div>
        </div>

        <button className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#4E545C] text-white text-xs sm:text-sm font-semibold hover:bg-[#828a91] transition-colors cursor-pointer">
          Pay Now
        </button>
      </div>
    </StudentLayout>
  );
};

export default FeeStatus;
