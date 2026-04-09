import { createContext, useEffect, useState } from "react";
import { data } from "../data/data";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [transaction, setTransaction] = useState(() => {
    const setLocalStorage = localStorage.getItem("finance_data");
    return setLocalStorage ? JSON.parse(setLocalStorage) : data;
  });

  //Roles
  const [role, setRole] = useState("viewer");
  //filter
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  const addTxn = (txn) => {
    setTransaction((prev) => [{ ...txn, id: Date.now().toString() }, ...prev]);
  };

  const editTxn = (updatedTxn) => {
    setTransaction((prev) =>
      prev.map((t) => (t.id === updatedTxn.id ? updatedTxn : t)),
    );
  };

  const deleteTxn = (id) => {
    setTransaction((prev) => prev.filter((t) => t.id !== id));
  };

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("finance_data", JSON.stringify(transaction));
  }, [transaction]);

  //add transaction
  const addTransaction = (newTxn) => {
    setTransaction((prev) => [newTxn, ...prev]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransaction((prev) => prev.filter((t) => t.id !== id));
  };
  return (
    <AppContext.Provider
      value={{
        transaction,
        addTxn,
        editTxn,
        deleteTxn,
        addTransaction,
        deleteTransaction,
        role,
        setRole,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
