export function filterTransactions(transactions, filters, query) {
  const text = (query || "").toLowerCase();
  const type = filters.type?.toLowerCase();
  const category = filters.category?.toLowerCase();

  return transactions.filter((item) => {
    // Search
    const searchMatch =
      !text ||
      item.title?.toLowerCase().includes(text) ||
      item.category?.toLowerCase().includes(text);

    // Type
    const typeMatch = type === "all" || item.type?.toLowerCase() === type;

    // Category check
    const categoryMatch =
      category === "all" || item.category?.toLowerCase() === category;

    return searchMatch && typeMatch && categoryMatch;
  });
}
