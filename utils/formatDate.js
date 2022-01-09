export function convertToDate(params) {
  if (!params) return "NA";
  const monthSrting = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date(params);
  let year = date.getFullYear();
  let month = monthSrting[date.getMonth()];
  let dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }

  return `${dt} ${month}, ${year}`;
}
