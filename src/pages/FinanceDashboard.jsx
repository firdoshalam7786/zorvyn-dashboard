import { useContext, useState } from "react";
import Cards from "../components/Cards";
import TransactionsTab from "../components/TransactionsTab";
import Filtering from "../components/Filtering";
import ChartBalance from "../components/ChartBalance";
import SpendingPie from "../components/SpendingPie";
import Insights from "../components/Insights";
import TransactionForm from "../components/TransactionForm";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";

function FinanceDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { addTxn, editTxn } = useContext(AppContext);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const tabs = [
    "Dashboard",
    "Transactions",
    "Insights",
    "Settings",
    "Help",
    "Report",
  ];

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Header setShowModal={setShowModal} />
      {/* Header */}
      <div className="bg-gray-100 px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-700">
              Good morning, <span className="text-gray-500">John Doe</span>
            </h1>
            <p className="text-sm text-gray-500">
              Here is your financial report
            </p>
          </div>

          {/* Tight Tabs */}
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

      {/* Content */}
      <div className="px-6 flex flex-col gap-6">
        {/* Dashboard Tab */}
        {activeTab === "Dashboard" && (
          <>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              <Cards />
            </div>

            <div className="grid gap-5 grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <ChartBalance />
              </div>

              <div className="xl:col-span-1">
                <SpendingPie />
              </div>
            </div>

            <div className="grid gap-5 grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <Filtering />
                <TransactionsTab
                  setEditData={setEditData}
                  setShowModal={setShowModal}
                />
              </div>

              <Insights />
            </div>
          </>
        )}

        {/* Transaction Tab */}
        {activeTab === "Transactions" && (
          <div>
            <Filtering />
            <TransactionsTab
              setEditData={setEditData}
              setShowModal={setShowModal}
            />
          </div>
        )}

        {/* Insight Tab */}
        {activeTab === "Insights" && <Insights />}

        {/* Setting Tab */}
        {activeTab === "Settings" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            Settings Coming Soon...
          </div>
        )}

        {/* Help Tab */}
        {activeTab === "Help" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            Help Section Coming Soon...
          </div>
        )}

        {/* Report Tab */}
        {activeTab === "Report" && (
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            Reports Coming Soon...
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <TransactionForm
          onClose={() => {
            setShowModal(false);
            setEditData(null);
          }}
          onSubmit={(data) => {
            if (editData) {
              editTxn({ ...data, id: editData.id });
            } else {
              addTxn(data);
            }
            setShowModal(false);
          }}
          initialData={editData}
        />
      )}
    </div>
  );
}

export default FinanceDashboard;
