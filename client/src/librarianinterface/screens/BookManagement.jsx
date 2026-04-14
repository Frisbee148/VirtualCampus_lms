import React, { useState } from "react";
import LibrarianLayout from "../LibrarianLayout";
import { Plus, X, ChevronRight } from "lucide-react";

const booksData = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest & Stein", isbn: "978-0262033848", category: "Computer Science", totalCopies: 8, available: 3, status: "available" },
  { id: 2, title: "Database System Concepts", author: "Silberschatz, Korth & Sudarshan", isbn: "978-0078022159", category: "Computer Science", totalCopies: 6, available: 0, status: "issued" },
  { id: 3, title: "Computer Networks", author: "Andrew S. Tanenbaum", isbn: "978-0132126953", category: "Computer Science", totalCopies: 5, available: 2, status: "available" },
  { id: 4, title: "Operating System Concepts", author: "Silberschatz, Galvin & Gagne", isbn: "978-1118063330", category: "Computer Science", totalCopies: 7, available: 1, status: "available" },
  { id: 5, title: "Discrete Mathematics", author: "Kenneth H. Rosen", isbn: "978-0073383095", category: "Mathematics", totalCopies: 10, available: 4, status: "available" },
  { id: 6, title: "Linear Algebra", author: "Gilbert Strang", isbn: "978-0980232776", category: "Mathematics", totalCopies: 6, available: 0, status: "issued" },
  { id: 7, title: "Digital Logic Design", author: "Morris Mano", isbn: "978-0132774208", category: "Electronics", totalCopies: 5, available: 3, status: "available" },
  { id: 8, title: "Data Structures Using C", author: "Reema Thareja", isbn: "978-0198099307", category: "Computer Science", totalCopies: 8, available: 0, status: "issued" },
  { id: 9, title: "Probability & Statistics", author: "Jay Devore", isbn: "978-1305251809", category: "Mathematics", totalCopies: 4, available: 2, status: "available" },
  { id: 10, title: "Compiler Design", author: "Aho, Lam, Sethi & Ullman", isbn: "978-0321486813", category: "Computer Science", totalCopies: 5, available: 1, status: "available" },
  { id: 11, title: "Signals and Systems", author: "Oppenheim & Willsky", isbn: "978-0138147570", category: "Electronics", totalCopies: 4, available: 2, status: "available" },
  { id: 12, title: "Engineering Mechanics", author: "R.C. Hibbeler", isbn: "978-0133915426", category: "Mechanical", totalCopies: 3, available: 1, status: "available" },
];

const borrowHistory = {
  1: [
    { user: "Aarav Sharma", issuedOn: "Apr 1, 2026", returnedOn: null, dueDate: "Apr 15, 2026" },
    { user: "Priya Patel", issuedOn: "Mar 20, 2026", returnedOn: "Apr 3, 2026", dueDate: "Apr 3, 2026" },
    { user: "Rohan Gupta", issuedOn: "Mar 5, 2026", returnedOn: "Mar 19, 2026", dueDate: "Mar 19, 2026" },
  ],
};

const statusColors = {
  available: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Available" },
  issued: { bg: "bg-amber-50", text: "text-amber-600", label: "All Issued" },
  reserved: { bg: "bg-zinc-100", text: "text-zinc-600", label: "Reserved" },
};

const BookManagement = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", isbn: "", category: "Computer Science", totalCopies: "1" });

  const categories = ["all", ...new Set(booksData.map((b) => b.category))];

  const filtered = booksData.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search);
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchCategory = categoryFilter === "all" || b.category === categoryFilter;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <LibrarianLayout>
      <div className="max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Book Management
            </h2>
            <p className="text-sm text-gray-400">
              {booksData.length} titles in library catalog
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#4E545C] text-white rounded-lg hover:bg-rose-900 transition-colors"
          >
            Add Book
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search by title, author, ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] w-full transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] transition-colors w-full sm:w-auto"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="issued">All Issued</option>
            <option value="reserved">Reserved</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-[#4E545C] transition-colors w-full sm:w-auto"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Categories" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3">Title</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Category</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3">Availability</th>
                  <th className="px-3 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((book) => {
                  const sc = statusColors[book.status];
                  return (
                    <tr key={book.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{book.title}</p>
                          <p className="text-xs text-gray-400 truncate">{book.author}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-xs text-gray-600">{book.category}</span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <span className="text-sm text-gray-700 font-medium">{book.available}</span>
                        <span className="text-xs text-gray-400"> / {book.totalCopies}</span>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="text-xs font-medium text-[#d97706] hover:text-rose-900 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((book) => {
              const sc = statusColors[book.status];
              return (
                <div key={book.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{book.title}</p>
                      <p className="text-xs text-gray-400 truncate">{book.author}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                      {sc.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{book.category}</span>
                    <span className="text-gray-500">
                      {book.available}/{book.totalCopies} available
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBook(book)}
                    className="text-xs font-medium text-[#d97706] hover:text-rose-900 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm mb-2">No books found.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-sm text-[#d97706] hover:underline font-medium"
              >
                Add a new book
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBook(null)}>
          <div className="bg-white rounded-xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Book Details</h3>
              <button onClick={() => setSelectedBook(null)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Title</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedBook.title}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Author</p>
                  <p className="text-sm text-gray-800">{selectedBook.author}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">ISBN</p>
                  <p className="text-sm text-gray-800">{selectedBook.isbn}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Category</p>
                  <p className="text-sm text-gray-800">{selectedBook.category}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Total Copies</p>
                  <p className="text-sm text-gray-800">{selectedBook.totalCopies}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1">Available</p>
                  <p className="text-sm text-gray-800 font-medium">{selectedBook.available}</p>
                </div>
              </div>

              {/* Borrow History */}
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Borrow History</p>
                {borrowHistory[selectedBook.id] ? (
                  <div className="space-y-2">
                    {borrowHistory[selectedBook.id].map((h, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-sm text-gray-700">{h.user}</p>
                          <p className="text-xs text-gray-400">Issued: {h.issuedOn}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${h.returnedOn ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                          {h.returnedOn ? `Returned ${h.returnedOn}` : `Due ${h.dueDate}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No borrow history available.</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 p-5 border-t border-gray-100">
              <button className="px-4 py-2 text-sm font-medium bg-[#4E545C] text-white rounded-lg hover:bg-rose-900 transition-colors">
                Edit Book
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Add New Book</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Author</label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">ISBN</label>
                <input
                  type="text"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Category</label>
                  <select
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                  >
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Physics</option>
                    <option>General</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    value={newBook.totalCopies}
                    onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#4E545C] transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-[#4E545C] text-white rounded-lg hover:bg-rose-900 transition-colors">
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </LibrarianLayout>
  );
};

export default BookManagement;
