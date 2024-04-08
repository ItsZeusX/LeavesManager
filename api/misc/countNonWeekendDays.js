function countNonWeekendDays(startDate, endDate, isHalfDay) {
  if (isHalfDay) {
    return 0.5;
  }
  // Make sure start date is before end date
  if (startDate > endDate) {
    return 0;
  }

  let count = 0;
  let currentDate = new Date(startDate);

  // Loop through each day between start and end dates
  while (currentDate < endDate) {
    // Check if the current day is not Saturday (6) or Sunday (0)
    if (currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
      count++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count + 1;
}

module.exports = countNonWeekendDays;
