const moment = require("moment");

function datesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = moment.utc(startDate);

  while (currentDate <= endDate) {
    dates.push(moment.utc(currentDate));
    currentDate.add(1, "days");
  }

  return dates;
}

module.exports = datesBetween;
