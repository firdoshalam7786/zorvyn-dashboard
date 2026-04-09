import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";

function Cards() {
  const { transaction } = useContext(AppContext);

  // Calculations
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    let income = 0;
    let expense = 0;

    transaction.forEach((tran) => {
      if (tran.type === "income") {
        income += tran.amount;
      } else {
        expense += tran.amount;
      }
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transaction]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2">
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl p-6 min-h-[180px] shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">My Balance</span>
            <MdCurrencyRupee className="text-lg text-gray-600" />
          </div>

          <h2 className="flex items-center gap-1 text-2xl font-semibold mt-3">
            <MdCurrencyRupee className="text-green-600" />
            {balance.toLocaleString()}
          </h2>

          <p className="text-xs text-gray-400 mt-2">Available balance</p>
        </div>

        {/* Income Card */}
        <div className="bg-white rounded-2xl p-6 min-h-[180px] shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Income</span>
            <FiTrendingUp className="text-lg text-green-600" />
          </div>

          <h2 className="flex items-center gap-1 text-2xl font-semibold mt-3 text-green-600">
            <MdCurrencyRupee />
            {totalIncome.toLocaleString()}
          </h2>

          <p className="text-xs text-gray-400 mt-2">Total earnings</p>
        </div>

        {/* Expense Card */}
        <div className="bg-white rounded-2xl p-6 min-h-[180px] shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Expenses</span>
            <FiTrendingDown className="text-lg text-red-500" />
          </div>

          <h2 className="flex items-center gap-1 text-2xl font-semibold mt-3 text-red-500">
            <MdCurrencyRupee />
            {totalExpense.toLocaleString()}
          </h2>

          <p className="text-xs text-gray-400 mt-2">Total spending</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
