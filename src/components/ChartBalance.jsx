import { useContext, useState, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function ChartBalance() {
  const { transaction = [] } = useContext(AppContext);
  const [mode, setMode] = useState("monthly");

  // Data grouping
  const chartData = useMemo(() => {
    const grouped = {};

    transaction.forEach((txn) => {
      const date = new Date(txn.date);

      let key;

      if (mode === "daily") {
        key = date.toLocaleDateString();
      } else {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      if (!grouped[key]) {
        grouped[key] = { income: 0, expense: 0 };
      }

      if (txn.type === "income") {
        grouped[key].income += txn.amount;
      } else {
        grouped[key].expense += txn.amount;
      }
    });

    const labels = Object.keys(grouped);

    const incomeData = labels.map((key) => grouped[key].income);
    const expenseData = labels.map((key) => grouped[key].expense);

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          borderColor: "#16a34a",
          backgroundColor: "#16a34a33",
          tension: 0.4,
        },
        {
          label: "Expense",
          data: expenseData,
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
          tension: 0.4,
        },
      ],
    };
  }, [transaction, mode]);
  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Balance Trend</h3>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm bg-gray-100 px-2 py-1 rounded-md"
        >
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Chart */}
      <div>
      <Line data={chartData} options={options} />
    </div>
    </div>
  );
}

export default ChartBalance;