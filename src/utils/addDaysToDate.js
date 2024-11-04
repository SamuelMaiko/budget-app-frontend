export function addDaysToDate(dateString, daysToAdd) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + daysToAdd); // Adds the number of days
  return date.toISOString().split("T")[0]; // Extracts the date in YYYY-MM-DD format
}
