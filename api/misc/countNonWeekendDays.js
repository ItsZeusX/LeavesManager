const moment = require("moment");
function countNonWeekendDays(startDate, endDate, isHalfDay) {
  if (isHalfDay) {
    return 0.5;
  }
  // Make sure start date is before end date
  if (startDate > endDate) {
    return 0;
  }

  let count = 0;
  let currentDate = moment.utc(startDate);

  // Loop through each day between start and end dates
  while (currentDate <= endDate) {
    // Check if the current day is not Saturday (6) or Sunday (0)
    if (currentDate.day() !== 6 && currentDate.day() !== 0) {
      count++;
    }
    // Move to the next day
    currentDate.add(1, "days");
  }

  return count;
}

module.exports = countNonWeekendDays;
