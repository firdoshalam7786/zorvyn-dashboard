import { useState } from "react";
import Cards from "../components/Cards";
import TransactionsTab from "../components/TransactionsTab";
import Filtering from "../components/Filtering";
import ChartBalance from "../components/ChartBalance";
import SpendingPie from "../components/SpendingPie";

function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const tabs = [
    "Dashboard",
    "Transaction",
    "Insights",
    "Setting",
    "help",
    "report",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 px-6 py-6">
        {/* flex container */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side text*/}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Good morning, Firdosh Alam
            </h1>
            <p className="text-sm text-gray-500">This is your finance report</p>
          </div>

          {/* Right Side */}
          <div className="flex gap-8 text-sm border-b border-gray-300 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 whitespace-nowrap transition ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-600 font-medium"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <Cards />

      {/* Mid Section */}
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-3">
        {/* Statistics Section */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-5 shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-gray-700">Statistics</h3>
            <button className="text-sm bg-gray-100 px-3 py-1 rounded-md">
              Monthly
            </button>
          </div>

        
            <ChartBalance />
       
        </div>

        {/* Expense  */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <h3 className="text-md font-semibold text-gray-700 mb-4">
            All Expenses
          </h3>

          <SpendingPie />
        </div>
      </div>

      {/* TransactionsTab */}
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-3">
        {/* Transactions */}
        <div className="xl:col-span-2">
          <Filtering />
          <TransactionsTab />
        </div>

        {/* Insights */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-2xl p-5 flex flex-col justify-between">
          <h3 className="text-lg font-semibold">Smart Financial Tips</h3>

          <p className="text-sm opacity-90 mt-2">
            Track your spending and save more each month.
          </p>

          <button className="mt-4 bg-white text-green-600 py-1 rounded-md text-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;
