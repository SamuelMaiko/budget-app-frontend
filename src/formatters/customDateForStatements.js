export const customDateForStatements = (datetime) => {
  const date = new Date(datetime);

  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero to day if necessary
  const month = date.toLocaleString("default", { month: "short" }); // Get short month name (e.g., "Sep")
  const year = date.getFullYear();

  return [day, month, year];
};
