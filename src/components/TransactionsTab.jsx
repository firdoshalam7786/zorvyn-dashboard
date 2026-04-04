import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Filtering from "./Filtering";

function TransactionsTab() {
  const { transaction = [], role, filters } = useContext(AppContext);

// Apply filters
const filteredData = transaction.filter((item) => {
  const matchSearch =
    item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    item.category.toLowerCase().includes(filters.search.toLowerCase());

  const matchType =
    filters.type === "all" || item.type === filters.type;

  const matchCategory =
    filters.category === "all" || item.category === filters.category;

  return matchSearch && matchType && matchCategory;
});

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5">
      
      {/* Heading */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <span className="text-sm text-gray-500">
          Total: {transaction.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          
          {/* Table Head */}
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-2">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No transaction found
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td>{item.title}</td>

                  <td>{item.category}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td
                    className={`font-medium ${
                      item.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    ₹ {item.amount.toLocaleString()}
                  </td>

                  {/* Actions (Admin only) */}
                  {role === "admin" && (
                    <td className="flex gap-2">
                      <button className="text-blue-500 hover:underline text-xs">
                        Edit
                      </button>
                      <button className="text-red-500 hover:underline text-xs">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default TransactionsTab;