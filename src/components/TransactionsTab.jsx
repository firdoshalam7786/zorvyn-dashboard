import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import useDebounce from "../hooks/useDebounce";
import { filterTransactions } from "../utils/filterTransactions";

function TransactionsTab({ setEditData, setShowModal }) {
  const { transaction = [], role, filters, deleteTxn } = useContext(AppContext);
  const debouncedSearch = useDebounce(filters.search || "");

  // Debounce search
  const filteredData = useMemo(() => {
    return filterTransactions(transaction, filters, debouncedSearch);
  }, [transaction, filters, debouncedSearch]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 h-[400px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <span className="text-sm text-gray-500">
          Total: {filteredData.length}
        </span>
      </div>

      {/*Desktop Table*/}
      <div className="hidden sm:block overflow-y-auto flex-1">
        <table className="w-full text-sm text-left min-w-[600px]">
          <thead className="border-b border-gray-400 text-gray-500">
            <tr>
              <th className="py-2">Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

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
                  className="border-b border-gray-300 hover:bg-gray-50 transition"
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
                      item.type === "income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ₹ {item.amount.toLocaleString()}
                  </td>

                  {/* Actions */}
                  {role === "admin" && (
                    <td className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditData(item);
                          setShowModal(true);
                        }}
                        className="text-blue-500 text-xs hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTxn(item.id)}
                        className="text-red-500 text-xs hover:underline"
                      >
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

      {/*Mobile Cards */}
      <div className="sm:hidden space-y-3 mt-3 overflow-y-auto flex-1">
        {filteredData.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            No transaction found
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-3 rounded-xl border border-gray-200"
            >
              {/* Top */}
              <div className="flex justify-between items-center">
                <p className="font-medium">{item.title}</p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.type}
                </span>
              </div>

              {/* Category */}
              <p className="text-sm text-gray-500 mt-1">{item.category}</p>

              {/* Bottom */}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </span>

                <span
                  className={`font-semibold ${
                    item.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  ₹ {item.amount.toLocaleString()}
                </span>
              </div>

              {/* Actions */}
              {role === "admin" && (
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => {
                      setEditData(item);
                      setShowModal(true);
                    }}
                    className="text-blue-500 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTxn(item.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionsTab;
