import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";

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
    <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
      
      {/* Balance Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Balance</span>
          <span>💰</span>
        </div>
        <h2 className="text-xl font-semibold mt-2">
          ₹ {balance.toLocaleString()}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Available balance
        </p>
      </div>

      {/* Income card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Income</span>
          <span>📈</span>
        </div>
        <h2 className="text-xl font-semibold mt-2 text-green-600">
          ₹ {totalIncome.toLocaleString()}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Total earnings
        </p>
      </div>

      {/* Expense Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Expenses</span>
          <span>📉</span>
        </div>
        <h2 className="text-xl font-semibold mt-2 text-red-500">
          ₹ {totalExpense.toLocaleString()}
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Total spending
        </p>
      </div>

    </div>
  );
}

export default Cards;