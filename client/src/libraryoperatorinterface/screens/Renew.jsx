import React, { useState } from "react";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { Search, RefreshCw, CheckCircle, AlertTriangle } from "lucide-react";

const LibraryOperatorRenew = () => {
  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [renewed, setRenewed] = useState(false);

  const mockIssuedBooks = [
    { id: "BK001", title: "The Great Gatsby", user: "John Doe", userId: "STU001", dueDate: "2026-04-10", renewals: 1, maxRenewals: 2 },
    { id: "BK003", title: "To Kill a Mockingbird", user: "Jane Smith", userId: "STU002", dueDate: "2026-04-08", renewals: 2, maxRenewals: 2 },
    { id: "BK004", title: "The Hobbit", user: "John Doe", userId: "STU001", dueDate: "2026-04-15", renewals: 0, maxRenewals: 2 },
  ];

  const filteredBooks = query
    ? mockIssuedBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.id.toLowerCase().includes(query.toLowerCase()) ||
          b.user.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const canRenew = selectedBook && selectedBook.renewals < selectedBook.maxRenewals;

  const handleRenew = () => {
    setRenewed(true);
    setTimeout(() => {
      setSelectedBook(null);
      setRenewed(false);
      setQuery("");
    }, 2000);
  };

  return (
    <LibraryOperatorLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Renew Book</h1>
          <p className="text-sm text-gray-500 mt-1">Extend the borrowing period</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Search size={18} className="text-amber-500" />
            Search Book or User
          </h2>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setRenewed(false);
              }}
              placeholder="Search by book title, ID, or user name..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              autoFocus
            />
          </div>
        </div>

        {renewed && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-emerald-500" />
              <span className="font-semibold text-gray-900">Book Renewed Successfully</span>
            </div>
            <p className="text-sm text-gray-600">New due date: 14 days from now</p>
          </div>
        )}

        {query && !renewed && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Issued Books</h2>
            {filteredBooks.length > 0 ? (
              <div className="space-y-3">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => setSelectedBook(book)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedBook?.id === book.id
                        ? "border-amber-300 bg-amber-50"
                        : "border-gray-100 hover:border-amber-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.id}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {book.renewals}/{book.maxRenewals} renewals
                      </span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{book.user} ({book.userId})</p>
                      <p className="text-xs text-gray-500 mt-1">Current due: {book.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No books found</p>
            )}
          </div>
        )}

        {selectedBook && !renewed && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Renewal Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Book</span>
                <span className="font-medium text-gray-900">{selectedBook.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">User</span>
                <span className="font-medium text-gray-900">{selectedBook.user} ({selectedBook.userId})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Current Due Date</span>
                <span className="font-medium text-gray-900">{selectedBook.dueDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">New Due Date</span>
                <span className="font-medium text-gray-900">14 days from now</span>
              </div>
              {selectedBook.renewals >= selectedBook.maxRenewals && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
                  <AlertTriangle size={16} />
                  Maximum renewal limit reached
                </div>
              )}
              <button
                onClick={handleRenew}
                disabled={!canRenew}
                className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  canRenew
                    ? "bg-amber-500 text-white hover:bg-amber-600"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <RefreshCw size={18} />
                Renew Book
              </button>
            </div>
          </div>
        )}
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorRenew;