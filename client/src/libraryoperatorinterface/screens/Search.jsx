import React, { useState } from "react";
import LibraryOperatorLayout from "../LibraryOperatorLayout";
import { ArrowRight, ChevronRight } from "lucide-react";

const LibraryOperatorSearch = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("books");

  const mockBooks = [
    { id: "BK001", title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: 3, total: 5, status: "available" },
    { id: "BK002", title: "1984", author: "George Orwell", available: 0, total: 4, status: "issued" },
    { id: "BK003", title: "To Kill a Mockingbird", author: "Harper Lee", available: 2, total: 3, status: "available" },
    { id: "BK004", title: "The Hobbit", author: "J.R.R. Tolkien", available: 1, total: 2, status: "available" },
  ];

  const mockUsers = [
    { id: "STU001", name: "John Doe", email: "john@lnmiit.ac.in", issued: 2, max: 5 },
    { id: "STU002", name: "Jane Smith", email: "jane@lnmiit.ac.in", issued: 4, max: 5 },
    { id: "STU003", name: "Mike Johnson", email: "mike@lnmiit.ac.in", issued: 5, max: 5 },
  ];

  const filteredBooks = query
    ? mockBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(query.toLowerCase()) ||
          b.author.toLowerCase().includes(query.toLowerCase()) ||
          b.id.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredUsers = query
    ? mockUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.id.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <LibraryOperatorLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Search</h1>
          <p className="text-sm text-gray-500 mt-1">Quick lookup for books and users</p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books or users..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 text-lg"
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("books")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "books"
                ? "bg-[#4E545C] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "users"
                ? "bg-[#4E545C] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Users
          </button>
        </div>

        {query && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {activeTab === "books" ? (
              <div className="p-4">
                {filteredBooks.length > 0 ? (
                  <div className="space-y-3">
                    {filteredBooks.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-rose-200 hover:bg-rose-50/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{book.title}</p>
                            <p className="text-xs text-gray-500">{book.author} • {book.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            book.status === "available"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-amber-100 text-amber-600"
                          }`}>
                            {book.status === "available" ? `${book.available} available` : "Issued"}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-[#4E545C] transition-colors">
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No books found</p>
                )}
              </div>
            ) : (
              <div className="p-4">
                {filteredUsers.length > 0 ? (
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-rose-200 hover:bg-rose-50/5 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.id} • {user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">
                            {user.issued}/{user.max} books
                          </span>
                          <button className="p-2 text-gray-400 hover:text-[#4E545C] transition-colors">
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No users found</p>
                )}
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="bg-white border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-500">Start typing to search books or users</p>
          </div>
        )}
      </div>
    </LibraryOperatorLayout>
  );
};

export default LibraryOperatorSearch;