export const createDate = (dateString, timeObject) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
