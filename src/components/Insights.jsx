import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { MdInsertChart, MdLightbulb, MdPayment } from "react-icons/md";

function Insights() {
  const { transaction = [] } = useContext(AppContext);

  const insights = useMemo(() => {
    let categoryMap = {};
    let currentMonth = new Date().getMonth();
    let lastMonth = currentMonth - 1;

    let currentExpense = 0;
    let lastExpense = 0;

    transaction.forEach((txn) => {
      const date = new Date(txn.date);
      const month = date.getMonth();

      // Expense only
      if (txn.type === "expense") {
        currentExpense += month === currentMonth ? txn.amount : 0;
        lastExpense += month === lastMonth ? txn.amount : 0;

        // Category grouping
        if (!categoryMap[txn.category]) {
          categoryMap[txn.category] = 0;
        }
        categoryMap[txn.category] += txn.amount;
      }
    });

    // Highest category
    let topCategory = "N/A";
    let maxValue = 0;

    Object.entries(categoryMap).forEach(([cat, value]) => {
      if (value > maxValue) {
        maxValue = value;
        topCategory = cat;
      }
    });

    // Monthly % change
    let percentChange = 0;

    if (lastExpense > 0) {
      percentChange = ((currentExpense - lastExpense) / lastExpense) * 100;
    }

    return {
      topCategory,
      maxValue,
      percentChange: percentChange.toFixed(1),
    };
  }, [transaction]);

  return (
  <div className="flex flex-col gap-4 h-full">
    
    {/* Spending */}
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between min-h-[120px] hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Top Spending Category</p>
        <span className="text-red-500"><MdPayment/></span>
      </div>

      <h3 className="text-lg font-semibold mt-2">
        {insights.topCategory}
      </h3>

      <p className="text-sm text-red-500 mt-1">
        ₹ {insights.maxValue.toLocaleString()}
      </p>
    </div>

    {/* Monthly Comparison */}
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between min-h-[120px] hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Monthly Comparison</p>
        <span><MdInsertChart/></span>
      </div>

      <h3
        className={`text-lg font-semibold mt-2 ${
          insights.percentChange >= 0
            ? "text-green-600"
            : "text-red-500"
        }`}
      >
        {insights.percentChange}%
      </h3>

      <p className="text-xs text-gray-400 mt-1">
        vs last month
      </p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between min-h-[120px] hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Tip</p>
        <span><MdLightbulb/></span>
      </div>

      <p className="text-sm mt-2 leading-relaxed">
        Try reducing <b>{insights.topCategory}</b> expenses to save more.
      </p>
    </div>

  </div>
);
}

export default Insights;
