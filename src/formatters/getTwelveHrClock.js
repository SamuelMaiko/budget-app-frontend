export const getTwelveHrClock = (datetime) => {
  const date = new Date(datetime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const now = new Date();

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString();

  // Check if the date is yesterday
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  // Format hours to 12-hour clock
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes to always be two digits
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let timeString = `${hours}:${minutes} ${ampm}`;

  // Append 'today' or 'yesterday' if applicable
  if (isToday) {
    timeString = `Today ${timeString}`;
  } else if (isYesterday) {
    timeString = `Yesterday ${timeString}`;
  }

  return timeString;
};
