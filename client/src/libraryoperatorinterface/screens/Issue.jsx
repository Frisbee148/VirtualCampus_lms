import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { CheckCircle, AlertCircle, ChevronRight } from "lucide-react";

const LibraryOperatorIssue = () => {
  const navigate = useNavigate();
  const [userQuery, setUserQuery] = useState("");
  const [bookQuery, setBookQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [step, setStep] = useState(1);

  const mockUsers = [
    { id: "STU001", name: "John Doe", email: "john@lnmiit.ac.in", issued: 2, max: 5, active: true },
    { id: "STU002", name: "Jane Smith", email: "jane@lnmiit.ac.in", issued: 4, max: 5, active: true },
    { id: "STU003", name: "Mike Johnson", email: "mike@lnmiit.ac.in", issued: 5, max: 5, active: true },
  ];

  const mockBooks = [
    { id: "BK001", title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: 3, total: 5 },
    { id: "BK002", title: "1984", author: "George Orwell", available: 0, total: 4 },
    { id: "BK003", title: "To Kill a Mockingbird", author: "Harper Lee", available: 2, total: 3 },
    { id: "BK004", title: "The Hobbit", author: "J.R.R. Tolkien", available: 1, total: 2 },
  ];

  const filteredUsers = userQuery
    ? mockUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(userQuery.toLowerCase()) ||
          u.id.toLowerCase().includes(userQuery.toLowerCase())
      )
    : [];

  const filteredBooks = bookQuery
    ? mockBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(bookQuery.toLowerCase()) ||
          b.id.toLowerCase().includes(bookQuery.toLowerCase())
      )
    : [];

  const canIssue = selectedUser && selectedBook && selectedBook.available > 0 && selectedUser.issued < selectedUser.max;

  return (
    <LibraryOperatorLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Issue Book</h1>
            <p className="text-sm text-gray-500 mt-1">Issue a book to a user</p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-[#9f1239]" : "bg-gray-200"}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-[#9f1239]" : "bg-gray-200"}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 3 ? "bg-[#9f1239]" : "bg-gray-200"}`} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Search User
            </h2>
            <div className="relative">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => {
                  setUserQuery(e.target.value);
                  setStep(1);
                }}
                placeholder="Search by name or ID..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9f1239]/20 focus:border-[#9f1239]"
                autoFocus
              />
            </div>
            {userQuery && filteredUsers.length > 0 && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {filteredUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setUserQuery("");
                      setStep(2);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-maroon-300 hover:bg-zinc-50 transition-all"
                  >
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.id} • {user.email}</p>
                    <p className="text-xs mt-1">
                      <span className={user.issued >= user.max ? "text-red-500" : "text-gray-500"}>
                        {user.issued}/{user.max} books
                      </span>
                      {user.active ? (
                        <span className="ml-2 text-[#9f1239]">Active</span>
                      ) : (
                        <span className="ml-2 text-red-500">Inactive</span>
                      )}
                    </p>
                  </button>
                ))}
              </div>
            )}
            {selectedUser && (
              <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-[#9f1239]" />
                  <span className="font-medium text-gray-900">{selectedUser.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{selectedUser.id}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Search Book
            </h2>
            <div className="relative">
              <input
                type="text"
                value={bookQuery}
                onChange={(e) => {
                  setBookQuery(e.target.value);
                  setStep(2);
                }}
                placeholder="Search by title or ISBN..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500/20 focus:border-zinc-500"
              />
            </div>
            {bookQuery && filteredBooks.length > 0 && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {filteredBooks.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => {
                      setSelectedBook(book);
                      setBookQuery("");
                      setStep(3);
                    }}
                    disabled={book.available === 0}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      book.available === 0
                        ? "border-gray-100 opacity-50 cursor-not-allowed"
                        : "border-gray-100 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-xs text-gray-500">{book.author}</p>
                    <p className="text-xs mt-1">
                      {book.available > 0 ? (
                        <span className="text-[#9f1239]">{book.available} available</span>
                      ) : (
                        <span className="text-red-500">Not available</span>
                      )}
                    </p>
                  </button>
                ))}
              </div>
            )}
            {selectedBook && (
              <div className="mt-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-zinc-500" />
                  <span className="font-medium text-gray-900">{selectedBook.title}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{selectedBook.author}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Issue Summary</h2>
          {selectedUser && selectedBook ? (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">User</span>
                <span className="font-medium text-gray-900">{selectedUser.name} ({selectedUser.id})</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Book</span>
                <span className="font-medium text-gray-900">{selectedBook.title}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium text-gray-900">14 days from now</span>
              </div>
              {!canIssue && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {selectedBook.available === 0
                    ? "Book is not available"
                    : "User has reached maximum book limit"}
                </div>
              )}
              <button
                onClick={() => alert("Book issued successfully!")}
                disabled={!canIssue}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  canIssue
                    ? "bg-[#9f1239] text-white hover:bg-rose-900"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Issue Book
              </button>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">Select a user and book to continue</p>
          )}
        </div>
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorIssue;