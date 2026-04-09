import "./App.css";
import FinanceDashboard from "./pages/FinanceDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="p-4 md:p-6">
        <FinanceDashboard />
      </main>
    </div>
  );
}

export default App;
