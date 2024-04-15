import { useContext, useEffect, useState } from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import moment from "moment";
import storeContext from "../../contexts/Store";
import { DeleteIcon } from "../../icons/DeleteIcon";
const LeavesToCheck = () => {
  const { setRefreshEffect } = useContext(storeContext);
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isGrouped, setIsGrouped] = useState(true);
  useEffect(() => {
    fetch("/api/manager/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);

  useEffect(() => {
    if (employees.length === 0) return;
    let leaves: any = [];
    employees.forEach((employee: any) => {
      leaves = [...leaves, ...employee.leaves];
    });
    setLeaves(leaves);
  }, [employees]);

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
    <div className="flex flex-col gap-10 font-Inter border p-6   rounded-lg font-poppins h-full overflow-auto   ">
      {/* //? PER EMPLOYEE (GROUPED)*/}
      {isGrouped &&
        employees?.map((employee: any) => {
          let leaves = employee.leaves;
          return (
            <Table removeWrapper className="font-poppins" isCompact>
              <TableHeader>
                <TableColumn maxWidth="10" align="center">
                  EMPLOYE
                </TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>SOUS-TYPE</TableColumn>
                <TableColumn>DATE DE DÉBUT</TableColumn>
                <TableColumn>DATE DE FIN</TableColumn>
                <TableColumn>DURÉE</TableColumn>
                <TableColumn>STATUT</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"No leaves to display."}>
                {leaves?.map((leave: any, index: number) => {
                  let subtype =
                    leave.duration == 1 ? "Une Journée" : "Plusieurs";
                  if (leave.morning) {
                    subtype = "Matin";
                  } else if (leave.afternoon) {
                    subtype = "Après-midi";
                  }

                  return (
                    <TableRow>
                      <TableCell className="w-52">
                        {index === 0 && (
                          <>
                            <div>{`${employee.name} ${employee.lastname}`}</div>
                            <div className="text-xs text-gray-400">
                              {employee.email}
                            </div>
                          </>
                        )}
                      </TableCell>

                      <TableCell className="w-40">
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
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          );
        })}
      {/* //? ALL LEAVES */}

      {!isGrouped && (
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
                      {/* <span
                   className="text-lg text-danger cursor-pointer active:opacity-50"
                   onClick={() => handleDeleteLeave(leave._id)}
                 >
                   <DeleteIcon />
                 </span> */}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LeavesToCheck;