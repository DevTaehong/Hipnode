export function getFormattedDateMeetUpCard(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const monthText = monthNames[month];

  return {
    day,
    monthText,
  };
}
