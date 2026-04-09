import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Filtering() {
  const { filters, setFilters, transaction } = useContext(AppContext);
  //categories find out
  const categories = ["All", ...new Set(transaction.map((t) => t.category))];

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm mb-4 flex flex-wrap gap-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="border border-gray-300 px-3 py-1 rounded-md text-sm"
      />

      {/* Type Filter */}
      <select
        value={filters.type}
        onChange={(e) => handleChange("type", e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-md text-sm"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* category filter */}
      <select
        value={filters.category}
        onChange={(e) => handleChange("category", e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-md text-sm"
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filtering;
