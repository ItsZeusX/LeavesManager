function checkDateRangesOverlap(start1, end1, start2, end2) {
  // Parse the input dates
  const startDate1 = new Date(start1);
  const endDate1 = new Date(end1);
  const startDate2 = new Date(start2);
  const endDate2 = new Date(end2);

  // Check if either range is invalid
  if (
    isNaN(startDate1.getTime()) ||
    isNaN(endDate1.getTime()) ||
    isNaN(startDate2.getTime()) ||
    isNaN(endDate2.getTime())
  ) {
    return {
      overlap: false,
      overlappedDays: 0,
      overlappedDates: [],
      weekendDays: [],
      nonWeekendDays: [],
    };
  }

  // Check for overlap
  const overlap = startDate1 <= endDate2 && startDate2 <= endDate1;

  // Calculate overlapped days and dates
  let overlappedDays = 0;
  let overlappedDates = [];
  let weekendDays = [];
  let nonWeekendDays = [];
  if (overlap) {
    const startOverlap = new Date(Math.max(startDate1, startDate2));
    const endOverlap = new Date(Math.min(endDate1, endDate2));
    overlappedDays = (endOverlap - startOverlap) / (1000 * 60 * 60 * 24) + 1;

    // Populate overlappedDates array
    let currentDate = new Date(startOverlap);
    while (currentDate <= endOverlap) {
      overlappedDates.push(new Date(currentDate));
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        weekendDays.push(new Date(currentDate));
      } else {
        nonWeekendDays.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return {
    overlap,
    overlappedDays,
    overlappedDates,
    weekendDays,
    nonWeekendDays,
  };
}

//export
module.exports = checkDateRangesOverlap;
