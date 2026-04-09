import { useState, useEffect } from "react";

function TransactionForm({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  //Edit
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        amount: initialData.amount || "",
        type: initialData.type || "expense",
        category: initialData.category || "",
        date: initialData.date ? initialData.date.split("T")[0] : "",
      });
    } else {
      // reset form
      setForm({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-md flex flex-col gap-4 shadow-lg"
      >
        {/* Title */}
        <h2 className="font-semibold text-lg sm:text-xl">
          {initialData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Inputs */}
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="amount"
          placeholder="Amount"
          value={form.amount || ""}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-300 p-2.5 rounded-md text-sm outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto text-gray-500 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
