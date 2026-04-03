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
  });

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
    setTransaction((prev) => prev.filter((t) => t.id !== t.id));
  };
  return (
    <AppContext.Provider
      value={{
        transaction,
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
