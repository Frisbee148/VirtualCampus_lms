import React from 'react';
import StudentLayout from '../StudentLayout';
import { Download } from 'lucide-react';

const DownloadsScreen = () => {
  const documents = [
    { name: 'Semester 3 Syllabus.pdf', size: '2.4 MB', date: 'Oct 15, 2024' },
    { name: 'Assignment Guidelines.docx', size: '540 KB', date: 'Oct 12, 2024' },
    { name: 'Lab Manual - DSA.pdf', size: '5.1 MB', date: 'Oct 8, 2024' },
  ];

  return (
    <StudentLayout activeTab="Downloads">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Downloads</h1>
        <p className="text-sm text-gray-400 mb-8">Course materials and documents</p>

        <div className="bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[55%]">Document Name</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[20%]">Size</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[15%]">Date</th>
                <th className="py-3.5 px-5 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-medium text-gray-900">{d.name}</td>
                  <td className="py-4 px-5 text-sm text-gray-500">{d.size}</td>
                  <td className="py-4 px-5 text-sm text-gray-400">{d.date}</td>
                  <td className="py-4 px-5 text-center">
                    <button className="px-3 py-1.5 text-xs font-semibold text-black border border-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  );
};

export default DownloadsScreen;
