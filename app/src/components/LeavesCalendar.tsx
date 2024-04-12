import React, { useContext, useEffect } from "react";
import moment, { Moment } from "moment";
import storeContext from "../contexts/Store";
import classNames from "classnames";
import { Tooltip } from "@nextui-org/react";

const LeavesCalendar = () => {
  const [dates, setDates] = React.useState<Moment[]>([]);
  const { refreshEffect } = useContext(storeContext);
  const { leaves } = useContext(storeContext);
  moment.locale("fr", {
    months:
      "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Août_Septembre_Octobre_Novembre_Décembre".split(
        "_"
      ),
    monthsShort:
      "Jan._Févr._Mars_Avr._Mai_Juin_Juil._Août_Sept._Oct._Nov._Déc.".split(
        "_"
      ),
  });
  useEffect(() => {
    fetch("/api/employees/leaves/dates")
      .then((response) => response.json())
      .then((data: any) => {
        let lastDate = moment.utc(data[data.length - 1]);
        setDates(datesBetween(moment.utc(), lastDate));
      });
  }, [refreshEffect]);

  return (
    <div className="border p-8 h-full rounded-xl overflow-auto overflow-y-hidden">
      <table>
        <tr>
          {dates.map((date, index) => {
            let month = date.format("MMMM");
            let count = dates.filter((d) => d.format("MMMM") == month).length;
            if (
              index == 0 ||
              date.format("MMMM") != dates[index - 1].format("MMMM")
            ) {
              return (
                <td
                  colSpan={count}
                  key={index}
                  className={classNames(
                    "border h-10 text-center text-zinc-800 font-semibold",
                    {
                      "bg-blue-50": index % 2 == 0,
                      "bg-lime-50": index % 2 == 1,
                    }
                  )}
                >
                  {date.format("MMMM")}
                </td>
              );
            }
          })}
        </tr>
        <tr>
          {dates.map((date, index) => {
            return (
              <td key={index} className="border h-10 text-center">
                {date.format("DD")}
              </td>
            );
          })}
        </tr>
        <tr>
          {dates.map((date, index) => {
            let leave = leaves.find((leave: any) =>
              moment
                .utc(date)
                .startOf("day")
                .isBetween(leave.start_date, leave.end_date, undefined, "[]")
            );
            return leave ? (
              <td
                key={index}
                className={classNames(
                  "p-2 px-4 min-w-14 border h-10 text-center",
                  {
                    "bg-green-50": leave.type == "vacation",
                    "bg-orange-50": leave.type == "sick",
                    "bg-red-50": leave.type == "unpaid",
                  }
                )}
              >
                <Tooltip
                  content={
                    leave.type == "vacation"
                      ? "Congé payé"
                      : leave.type == "sick"
                      ? "Congé maladie"
                      : "Congé sans solde"
                  }
                >
                  <div
                    className={classNames("w-4 h-4   rounded-full ", {
                      "bg-green-300": leave.type == "vacation",
                      "bg-orange-300": leave.type == "sick",
                      "bg-red-300": leave.type == "unpaid",
                    })}
                  ></div>
                </Tooltip>
              </td>
            ) : (
              <td
                key={index}
                className="p-2 px-4 min-w-14  border h-10 text-center"
              ></td>
            );
          })}
        </tr>
      </table>
    </div>
  );
};

function datesBetween(startDate: any, endDate: any) {
  console.log({
    startDate: startDate,
    endDate: endDate,
  });
  const dates = [];
  let currentDate = moment.utc(startDate).startOf("day");
  let end_date = moment.utc(endDate).startOf("day");
  while (currentDate <= end_date) {
    dates.push(moment.utc(currentDate).startOf("day"));
    currentDate.add(1, "days");
  }

  return dates;
}

export default LeavesCalendar;
