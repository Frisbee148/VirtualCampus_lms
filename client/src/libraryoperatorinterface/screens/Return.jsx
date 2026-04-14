import React, { useState } from "react";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { CheckCircle, AlertTriangle, ChevronRight } from "lucide-react";

const LibraryOperatorReturn = () => {
  const [bookQuery, setBookQuery] = useState("");
  const [returnedBook, setReturnedBook] = useState(null);

  const mockIssuedBooks = [
    { id: "BK001", title: "The Great Gatsby", user: "John Doe", userId: "STU001", dueDate: "2026-04-10", returned: false },
    { id: "BK003", title: "To Kill a Mockingbird", user: "Jane Smith", userId: "STU002", dueDate: "2026-04-08", returned: false, overdue: true },
    { id: "BK004", title: "The Hobbit", user: "John Doe", userId: "STU001", dueDate: "2026-04-15", returned: false },
  ];

  const filteredBooks = bookQuery
    ? mockIssuedBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
          b.id.toLowerCase().includes(bookQuery.toLowerCase())
      )
    : [];

  const handleReturn = (book) => {
    setReturnedBook(book);
    setBookQuery("");
  };

  return (
    <LibraryOperatorLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Return Book</h1>
          <p className="text-sm text-gray-500 mt-1">Process a book return</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Scan / Search Book
          </h2>
          <div className="relative">
            <input
              type="text"
              value={bookQuery}
              onChange={(e) => {
                setBookQuery(e.target.value);
                setReturnedBook(null);
              }}
              placeholder="Enter book ID or title..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500"
              autoFocus
            />
          </div>
        </div>

        {returnedBook && (
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={20} className="text-[#4E545C]" />
              <span className="font-semibold text-gray-900">Book Returned Successfully</span>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-gray-500">Book:</span> {returnedBook.title}</p>
              <p><span className="text-gray-500">Returned by:</span> {returnedBook.user}</p>
              {returnedBook.overdue && (
                <p className="text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  This book was returned {Math.abs(new Date() - new Date(returnedBook.dueDate)) / (1000 * 60 * 60 * 24)} days late
                </p>
              )}
            </div>
          </div>
        )}

        {bookQuery && !returnedBook && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Issued Books</h2>
            {filteredBooks.length > 0 ? (
              <div className="space-y-3">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 rounded-lg border border-gray-100 hover:border-zinc-200 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.id}</p>
                      </div>
                      {book.overdue && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">Overdue</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <p className="text-sm text-gray-600">{book.user}</p>
                        <p className="text-xs text-gray-500">Due: {book.dueDate}</p>
                      </div>
                      <button
                        onClick={() => handleReturn(book)}
                        className="px-4 py-2 bg-zinc-800 text-white text-sm rounded-lg hover:bg-[#4E545C] transition-colors"
                      >
                        Confirm Return
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No books found</p>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Returns</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">Clean Code</span>
              <span className="text-xs text-zinc-500">Returned today</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-sm text-gray-600">Design Patterns</span>
              <span className="text-xs text-zinc-500">Returned yesterday</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Refactoring</span>
              <span className="text-xs text-zinc-500">Returned 2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorReturn;