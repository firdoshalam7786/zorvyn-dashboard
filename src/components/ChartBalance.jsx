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

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

function ChartBalance() {
  const { transaction = [] } = useContext(AppContext);
  const [mode, setMode] = useState("monthly");

  // Data
  const chartData = useMemo(() => {
    const grouped = {};

    transaction.forEach((txn) => {
      const date = new Date(txn.date);

      let key =
        mode === "daily"
          ? date.toLocaleDateString()
          : `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!grouped[key]) {
        grouped[key] = { income: 0, expense: 0 };
      }

      if (txn.type === "income") {
        grouped[key].income += txn.amount;
      } else {
        grouped[key].expense += txn.amount;
      }
    });

    // smooth rendering
    const labels = Object.keys(grouped).sort();

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: labels.map((k) => grouped[k].income),
          borderColor: "#16a34a",
          backgroundColor: "#16a34a33",
          tension: 0.3,
          pointRadius: 2,
        },
        {
          label: "Expense",
          data: labels.map((k) => grouped[k].expense),
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
          tension: 0.3,
          pointRadius: 2,
        },
      ],
    };
  }, [transaction, mode]);

  //Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, 

    animation: {
      duration: 500,
    },

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

    elements: {
      point: {
        radius: 2,
      },
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-lg">Balance Trend</h3>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-sm bg-gray-100 px-3 py-1 rounded-md"
        >
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
        <Line data={chartData} options={options} redraw={false} />
      </div>
    </div>
  );
}

export default ChartBalance;
