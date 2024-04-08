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
      {/* <table>
        <tr>
          {dates?.map((date, index) => {
            console.log(new Date(date).getDate());

            return (
              <td key={index} className="p-2 px-10 border h-10 text-center">
                {new Date(date).getDate()}
              </td>
            );
          })}
        </tr>
        <tr>
          {dates?.map((date, index) =>
            leaveDates.find(
              (d) =>
                new Date(d).getUTCDate() === new Date(date).getUTCDate() &&
                new Date(d).getUTCMonth() === new Date(date).getUTCMonth()
            ) ? (
              <td key={index} className="p-2 px-10 border h-10 text-center ">
                <div className="w-4 h-4 rounded-full bg-green-300"></div>
              </td>
            ) : (
              <td
                key={index}
                className="p-2 px-10 border h-10 text-center"
              ></td>
            )
          )}
        </tr>
      </table> */}
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
