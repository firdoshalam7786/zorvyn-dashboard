export function filterTransactions(transactions, filters, query) {
  return transactions.filter((tx) => {
    const searchText = query?.toLowerCase() || "";

    const matchSearch =
      tx.title?.toLowerCase().includes(searchText) ||
      tx.category?.toLowerCase().includes(searchText);

    const matchType = filters.type === "all" || tx.type === filters.type;

    const matchCategory =
      filters.category === "all" || tx.category === filters.category;

    return matchSearch && matchType && matchCategory;
  });
}
