import { useContext, useEffect, useState } from "react";
import storeContext from "../contexts/Store";
import { Chip } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
const Leaves = () => {
  const { refreshEffect } = useContext(storeContext);
  const [leaves, setLeaves] = useState<any>([]);
  useEffect(() => {
    fetch("/api/employees/leaves")
      .then((res) => res.json())
      .then((data) => setLeaves(data))
      .then(() => console.log(leaves));
  }, [refreshEffect]);
  return (
    <div className="flex flex-col gap-4 font-Inter border p-6   rounded-lg font-poppins h-full overflow-auto   ">
      <h2 className="text-2xl font-black">MY LEAVES</h2>
      <Table removeWrapper className="font-poppins" isCompact>
        <TableHeader>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>SUBTYPE</TableColumn>
          <TableColumn>START DATE</TableColumn>
          <TableColumn>END DATE</TableColumn>
          <TableColumn>DURATION</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {leaves?.map((leave: any) => {
            let duration = countNonWeekendDays(
              new Date(leave.start_date),
              new Date(leave.end_date)
            );
            let subtype = duration == 1 ? "One Day" : "Range";
            if (leave.morning) {
              subtype = "Morning";
            } else if (leave.afternoon) {
              subtype = "Afternoon";
            }

            return (
              <TableRow>
                <TableCell>
                  <Chip
                    variant="flat"
                    radius="sm"
                    color={
                      leave.type === "vacation"
                        ? "success"
                        : leave.type === "sick"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {leave.type === "vacation"
                      ? "Vacation"
                      : leave.type === "sick"
                      ? "Sick"
                      : "Unpaid"}
                  </Chip>
                </TableCell>
                <TableCell> {subtype}</TableCell>
                <TableCell> {formatDate(new Date(leave.start_date))}</TableCell>
                <TableCell> {formatDate(new Date(leave.end_date))}</TableCell>
                <TableCell>
                  {duration} {duration === 1 ? "Day" : "Days"}
                </TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    radius="sm"
                    color={
                      leave.status === "approved"
                        ? "success"
                        : leave.status === "pending"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {leave.status === "approved"
                      ? "Approved"
                      : leave.status === "pending"
                      ? "Pending"
                      : "Rejected"}
                  </Chip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

function formatDate(date: Date) {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}

function countNonWeekendDays(startDate: Date, endDate: Date) {
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
export default Leaves;
