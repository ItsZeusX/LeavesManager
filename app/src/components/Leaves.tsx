import { useContext, useEffect, useState } from "react";
import storeContext from "../contexts/Store";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
const Leaves = () => {
  const { leaves, setRefreshEffect } = useContext(storeContext);

  const handleDeleteLeave = (_id: string) => {
    fetch("/api/employees/leaves/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    }).then(() => {
      setRefreshEffect((prev: boolean) => !prev);
    });
  };
  return (
    <div className="flex flex-col gap-4 font-Inter border p-6   rounded-lg font-poppins h-full overflow-auto   ">
      <h1 className="text-xl font-light text-zinc-600 ">MES CONGÉS</h1>
      <Table removeWrapper className="font-poppins" isCompact>
        <TableHeader>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>SOUS-TYPE</TableColumn>
          <TableColumn>DATE DE DÉBUT</TableColumn>
          <TableColumn>DATE DE FIN</TableColumn>
          <TableColumn>DURÉE</TableColumn>
          <TableColumn>STATUT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No leaves to display."}>
          {leaves?.map((leave: any) => {
            let subtype = leave.duration == 1 ? "Une Journée" : "Plusieurs";
            if (leave.morning) {
              subtype = "Matin";
            } else if (leave.afternoon) {
              subtype = "Après-midi";
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
                      ? "Payé"
                      : leave.type === "sick"
                      ? "Maladie"
                      : "Sans solde"}
                  </Chip>
                </TableCell>
                <TableCell> {subtype}</TableCell>
                <TableCell> {formatDate(new Date(leave.start_date))}</TableCell>
                <TableCell> {formatDate(new Date(leave.end_date))}</TableCell>
                <TableCell>
                  {leave.duration > 1 && leave.duration}{" "}
                  {leave.duration === 0.5
                    ? "Demi-journée"
                    : leave.duration === 1
                    ? "Une Journée"
                    : "Jours"}
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
                      ? "Approuvé"
                      : leave.status === "pending"
                      ? "En Attente"
                      : "Rejeté"}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Tooltip color="danger" content="Supprimer">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={() => handleDeleteLeave(leave._id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
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

function countNonWeekendDays(
  startDate: Date,
  endDate: Date,
  isHalfDay: boolean
) {
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
export default Leaves;
