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
import moment from "moment";
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
                <TableCell>
                  {" "}
                  {moment(leave.start_date).format("D MMMM, YYYY")}
                </TableCell>
                <TableCell>
                  {moment(leave.end_date).format("D MMMM, YYYY")}
                </TableCell>
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

export default Leaves;
