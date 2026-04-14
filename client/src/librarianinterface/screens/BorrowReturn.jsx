import React, { useState } from "react";
import LibrarianLayout from "../LibrarianLayout";
import { CheckCircle, AlertCircle, ChevronRight } from "lucide-react";

const allUsers = [
  { id: 1, name: "Aarav Sharma", email: "aarav.20b@lnmiit.ac.in", role: "Student", booksIssued: 3, maxBooks: 5, status: "active", finesDue: 0 },
  { id: 2, name: "Priya Patel", email: "priya.20b@lnmiit.ac.in", role: "Student", booksIssued: 2, maxBooks: 5, status: "active", finesDue: 50 },
  { id: 3, name: "Sneha Jain", email: "sneha.21b@lnmiit.ac.in", role: "Student", booksIssued: 4, maxBooks: 5, status: "active", finesDue: 150 },
  { id: 4, name: "Rahul Verma", email: "rahul.20b@lnmiit.ac.in", role: "Student", booksIssued: 2, maxBooks: 5, status: "blocked", finesDue: 350 },
  { id: 5, name: "Dr. Anand Mishra", email: "anand.m@lnmiit.ac.in", role: "Faculty", booksIssued: 5, maxBooks: 10, status: "active", finesDue: 0 },
];

const allBooks = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen et al.", available: 3, total: 8 },
  { id: 2, title: "Database System Concepts", author: "Silberschatz et al.", available: 0, total: 6 },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", available: 2, total: 5 },
  { id: 4, title: "Operating System Concepts", author: "Silberschatz et al.", available: 1, total: 7 },
  { id: 5, title: "Discrete Mathematics", author: "Kenneth H. Rosen", available: 4, total: 10 },
  { id: 6, title: "Digital Logic Design", author: "Morris Mano", available: 3, total: 5 },
];

const issuedBooks = [
  { id: 1, userId: 1, bookId: 1, title: "Introduction to Algorithms", user: "Aarav Sharma", issuedOn: "Apr 1, 2026", dueDate: "Apr 15, 2026" },
  { id: 2, userId: 1, bookId: 3, title: "Computer Networks", user: "Aarav Sharma", issuedOn: "Mar 28, 2026", dueDate: "Apr 11, 2026" },
  { id: 3, userId: 2, bookId: 4, title: "Operating System Concepts", user: "Priya Patel", issuedOn: "Apr 2, 2026", dueDate: "Apr 16, 2026" },
  { id: 4, userId: 3, bookId: 5, title: "Discrete Mathematics", user: "Sneha Jain", issuedOn: "Mar 25, 2026", dueDate: "Apr 8, 2026" },
];

const BorrowReturn = () => {
  const [mode, setMode] = useState("issue");
  const [userSearch, setUserSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedIssued, setSelectedIssued] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filteredUsers = userSearch.length >= 2
    ? allUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(userSearch.toLowerCase())
      )
    : [];

  const filteredBooks = bookSearch.length >= 2
    ? allBooks.filter(
        (b) =>
          b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
          b.author.toLowerCase().includes(bookSearch.toLowerCase())
      )
    : [];

  const userIssuedBooks = selectedUser
    ? issuedBooks.filter((ib) => ib.userId === selectedUser.id)
    : [];

  const handleIssue = () => {
    if (!selectedUser || !selectedBook) return;
    if (selectedUser.status === "blocked") {
      showToast("User is blocked. Cannot issue books.", "error");
      return;
    }
    if (selectedUser.booksIssued >= selectedUser.maxBooks) {
      showToast(`User has reached the maximum limit of ${selectedUser.maxBooks} books.`, "error");
      return;
    }
    if (selectedBook.available <= 0) {
      showToast("This book is not available for issue.", "error");
      return;
    }
    showToast(`"${selectedBook.title}" issued to ${selectedUser.name}`, "success");
    setSelectedBook(null);
    setBookSearch("");
  };

  const handleReturn = () => {
    if (!selectedIssued) return;
    showToast(`"${selectedIssued.title}" returned by ${selectedIssued.user}`, "success");
    setSelectedIssued(null);
  };

  const handleRenew = () => {
    if (!selectedIssued) return;
    showToast(`"${selectedIssued.title}" renewed for ${selectedIssued.user}`, "success");
    setSelectedIssued(null);
  };

  return (
    <LibrarianLayout>
      <div className="max-w-4xl">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">Issue / Return</h2>
        <p className="text-sm text-gray-400 mb-6">Fast book issuing, returning and renewal</p>

        {/* Mode Toggle */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {["issue", "return"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setSelectedUser(null);
                setSelectedBook(null);
                setSelectedIssued(null);
                setUserSearch("");
                setBookSearch("");
              }}
              className={`px-5 py-2 text-sm font-medium rounded-md transition-all ${
                mode === m
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {m === "issue" ? "Issue Book" : "Return Book"}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-5 sm:p-6 space-y-6">
          {/* Step 1: Search User */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
              Step 1 — Search User
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type user name or email..."
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  setSelectedUser(null);
                  setSelectedIssued(null);
                }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full transition-colors"
                autoFocus
              />
            </div>

            {/* User Dropdown */}
            {filteredUsers.length > 0 && !selectedUser && (
              <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
                {filteredUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setSelectedUser(u);
                      setUserSearch(u.name);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600`}>
                        {u.role}
                      </span>
                      {u.status === "blocked" && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">Blocked</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected User Info */}
            {selectedUser && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-800">{selectedUser.name}</p>
                  <p className="text-xs text-gray-400">{selectedUser.email} · {selectedUser.role}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">
                    {selectedUser.booksIssued}/{selectedUser.maxBooks} books
                  </span>
                  {selectedUser.finesDue > 0 && (
                    <span className="text-red-600 font-medium">Rs. {selectedUser.finesDue} due</span>
                  )}
                  <span className={`font-medium ${selectedUser.status === "active" ? "text-emerald-600" : "text-red-600"}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Issue mode = search book, Return mode = select issued book */}
          {selectedUser && (
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                Step 2 — {mode === "issue" ? "Search Book" : "Select Issued Book"}
              </label>

              {mode === "issue" ? (
                <>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Type book title or author..."
                      value={bookSearch}
                      onChange={(e) => {
                        setBookSearch(e.target.value);
                        setSelectedBook(null);
                      }}
                      className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full transition-colors"
                    />
                  </div>

                  {filteredBooks.length > 0 && !selectedBook && (
                    <div className="mt-1 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-lg">
                      {filteredBooks.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => {
                            setSelectedBook(b);
                            setBookSearch(b.title);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">{b.title}</p>
                            <p className="text-xs text-gray-400">{b.author}</p>
                          </div>
                          <span className={`text-xs font-medium ${b.available > 0 ? "text-emerald-600" : "text-red-500"}`}>
                            {b.available > 0 ? `${b.available} available` : "Unavailable"}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedBook && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{selectedBook.title}</p>
                        <p className="text-xs text-gray-400">{selectedBook.author}</p>
                      </div>
                      <span className={`text-xs font-medium ${selectedBook.available > 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {selectedBook.available}/{selectedBook.total} copies available
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">
                  {userIssuedBooks.length > 0 ? (
                    userIssuedBooks.map((ib) => (
                      <button
                        key={ib.id}
                        onClick={() => setSelectedIssued(ib)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedIssued?.id === ib.id
                            ? "border-[#4E545C] bg-rose-50/5"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{ib.title}</p>
                            <p className="text-xs text-gray-400">Issued: {ib.issuedOn}</p>
                          </div>
                          <span className="text-xs text-gray-500">Due: {ib.dueDate}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">
                      No books currently issued to this user.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {selectedUser && (
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              {mode === "issue" ? (
                <button
                  onClick={handleIssue}
                  disabled={!selectedBook}
                  className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    selectedBook
                      ? "bg-[#4E545C] text-white hover:bg-rose-900"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Issue Book
                </button>
              ) : (
                <>
                  <button
                    onClick={handleReturn}
                    disabled={!selectedIssued}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedIssued
                        ? "bg-[#4E545C] text-white hover:bg-rose-900"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Return Book
                  </button>
                  <button
                    onClick={handleRenew}
                    disabled={!selectedIssued}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedIssued
                        ? "bg-[#4E545C] text-white hover:bg-rose-900"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Renew
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
          toast.type === "success"
            ? "bg-emerald-600 text-white"
            : "bg-red-600 text-white"
        }`}>
          {toast.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}
    </LibrarianLayout>
  );
};

export default BorrowReturn;
