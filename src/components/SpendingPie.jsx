import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
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
            borderWidth: 2,
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
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 w-full hover:shadow-md transition flex flex-col h-[444px]">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-2">
      <h3 className="font-semibold text-lg">Spending Breakdown</h3>
    </div>

    {/* Chart */}
    <div className="relative w-full h-[240px] flex items-center justify-center">
      
      <Doughnut data={chartData} options={options} />

      {/* Center Text */}
      <div className="absolute text-center">
        <p className="text-xs text-gray-400">Total Expense</p>
        <p className="text-lg font-semibold text-gray-800">
          ₹ {totalExpense.toLocaleString()}
        </p>
      </div>
    </div>

    {/* Legend */}
    <div className="mt-3 flex-1 overflow-y-auto pr-1 m-1 space-y-2">
      {chartData.labels.map((label, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-gray-50 transition"
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor:
                  chartData.datasets[0].backgroundColor[i],
              }}
            ></span>
            <span className="text-gray-600">{label}</span>
          </div>

          {/* Right */}
          <span className="font-medium text-gray-800">
            ₹ {chartData.datasets[0].data[i].toLocaleString()}
          </span>
        </div>
      ))}
    </div>

  </div>
);
}

export default SpendingPie;
