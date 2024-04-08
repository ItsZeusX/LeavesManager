import React, { useEffect } from "react";

const LeavesCalendar = () => {
  const [dates, setDates] = React.useState<Date[]>([]);
  const [leaveDates, setLeaveDates] = React.useState<Date[]>([]);
  useEffect(() => {
    fetch("/api/employees/leaves/dates")
      .then((response) => response.json())
      .then((data) => {
        setDates(datesBetween(new Date(), new Date(data[data.length - 1])));
        setLeaveDates(data);
      });
  }, []);
  return (
    <div className="border p-10 h-full rounded-xl overflow-auto">
      <table>
        <tr>
          {dates?.map((date, index) => {
            return (
              <td key={index} className="p-2 px-10 border h-10 text-center">
                {new Date(date).getDate()}
              </td>
            );
          })}
        </tr>
        <tr>
          {leaveDates?.map((date, index) =>
            dates.find(
              (d) => new Date(d).getTime() === new Date(date).getTime()
            ) ? (
              <td
                key={index}
                className="p-2 px-10 border h-10 text-center bg-red-200"
              >
                {new Date(date).getDate()}
              </td>
            ) : (
              <td key={index} className="p-2 px-10 border h-10 text-center">
                X
              </td>
            )
          )}
        </tr>
      </table>
    </div>
  );
};

function datesBetween(startDate: Date, endDate: Date) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export default LeavesCalendar;
