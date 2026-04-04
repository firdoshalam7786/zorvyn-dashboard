import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

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
      percentChange =
        ((currentExpense - lastExpense) / lastExpense) * 100;
    }

    return {
      topCategory,
      maxValue,
      percentChange: percentChange.toFixed(1),
    };
  }, [transaction]);

  return (
    <div className="flex flex-col gap-4">
      
      {/* Highest Spending */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <p className="text-sm text-gray-500">Top Spending</p>
        <h3 className="text-lg font-semibold">
          {insights.topCategory}
        </h3>
        <p className="text-sm text-red-500">
          ₹ {insights.maxValue.toLocaleString()}
        </p>
      </div>

      {/* Monthly Comparison */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <p className="text-sm text-gray-500">Monthly Change</p>
        <h3
          className={`text-lg font-semibold ${
            insights.percentChange >= 0
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {insights.percentChange}%
        </h3>
        <p className="text-xs text-gray-400">
          vs last month
        </p>
      </div>

      {/* Tip */}
      <div className="bg-white p-4 rounded-xl shadow-sm border">
        <p className="text-sm text-gray-500">Tip</p>
        <p className="text-sm">
          Try reducing <b>{insights.topCategory}</b> expenses to save more.
        </p>
      </div>

    </div>
  );
}

export default Insights;