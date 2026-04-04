import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingPie() {
  const { transaction = [] } = useContext(AppContext);

  // Group expenses by category
  const { chartData, totalExpense } = useMemo(() => {
    const grouped = {};

    let total = 0;

    transaction.forEach((txn) => {
      if (txn.type === "expense") {
        total += txn.amount;

        if (!grouped[txn.category]) {
          grouped[txn.category] = 0;
        }

        grouped[txn.category] += txn.amount;
      }
    });

    const labels = Object.keys(grouped);
    const data = Object.values(grouped);

    return {
      totalExpense: total,
      chartData: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "#22c55e",
              "#3b82f6",
              "#f59e0b",
              "#ef4444",
              "#a855f7",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }, [transaction]);

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
    cutout: "65%", // donut effect
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border">
      
      {/* Header */}
      <h3 className="font-semibold mb-4">Spending Breakdown</h3>

      {/* Chart */}
      <div className="relative h-60 flex items-center justify-center">
        <Doughnut data={chartData} options={options} />

        {/* Center Text */}
        <div className="absolute text-center">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-semibold">
            ₹ {totalExpense.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpendingPie;