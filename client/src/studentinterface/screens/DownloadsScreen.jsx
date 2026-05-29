import React, { useState, useEffect } from 'react';
import StudentLayout from '../StudentLayout';
import { Download } from 'lucide-react';
import { useSession } from '../../context/SessionContext';
import { fetchDownloads } from '../../auth/studentApi';

const DownloadsScreen = () => {
  const { selectedSessionId } = useSession();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchDownloads(selectedSessionId)
      .then((data) => { if (!cancelled) setDocuments(data.documents || []); })
      .catch(() => { if (!cancelled) setDocuments([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [selectedSessionId]);

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <StudentLayout activeTab="Downloads">
        <div className="max-w-5xl">
          <div className="h-8 w-40 bg-gray-100 mb-4 animate-pulse" />
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="h-14 bg-gray-50 border border-gray-100 animate-pulse" />)}
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout activeTab="Downloads">
      <div className="max-w-5xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Downloads</h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-8">Course materials and documents</p>

        {/* Desktop table */}
        <div className="hidden sm:block bg-white border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#4E545C] text-white">
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[55%]">Document Name</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[20%]">Size</th>
                <th className="py-3.5 px-5 text-left text-sm font-semibold w-[15%]">Date</th>
                <th className="py-3.5 px-5 text-center text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d, idx) => (
                <tr key={d.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-5 text-sm font-medium text-gray-900">{d.name}</td>
                  <td className="py-4 px-5 text-sm text-gray-500">{d.file_size}</td>
                  <td className="py-4 px-5 text-sm text-gray-400">{formatDate(d.uploaded_at)}</td>
                  <td className="py-4 px-5 text-center">
                    <button className="px-3 py-1.5 text-xs font-semibold text-black border border-black hover:bg-[#4E545C] hover:text-white transition-all duration-200 cursor-pointer">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card layout */}
        <div className="sm:hidden space-y-3">
          {documents.map((d, idx) => (
            <div key={d.id || idx} className="bg-white border border-gray-200 p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-xs font-semibold text-gray-900 leading-snug flex-1 min-w-0 break-words">{d.name}</h3>
                <button className="flex-shrink-0 p-1.5 text-black border border-black hover:bg-[#4E545C] hover:text-white transition-all duration-200 cursor-pointer">
                  <Download size={14} />
                </button>
              </div>
              <div className="flex gap-3 text-[10px] text-gray-400">
                <span>{d.file_size}</span>
                <span>{formatDate(d.uploaded_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
};

export default DownloadsScreen;
