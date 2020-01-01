//jshint esversion:6

module.exports = getDate;

function getDate() {
  let today = new Date();
  let day = today.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let date = today.toLocaleDateString("en-US", options);

  return date;
}
