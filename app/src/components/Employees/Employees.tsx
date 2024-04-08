import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
      });
  }, []);
  return (
    <div className="border p-10">
      <h1 className="font-black">EMPLOYEES</h1>
      <Table removeWrapper className="font-poppins" isCompact>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>LASTNAME</TableColumn>

          <TableColumn>EMAIL</TableColumn>
          <TableColumn>ROLE</TableColumn>
        </TableHeader>
        <TableBody>
          {employees?.map((employee: any) => {
            return (
              <TableRow>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.lastname}</TableCell>

                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  <Chip
                    variant="flat"
                    className="font-black"
                    color={
                      employee.role === "owner"
                        ? "primary"
                        : employee.role === "manager"
                        ? "danger"
                        : "success"
                    }
                  >
                    {employee.role.toUpperCase()}
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

export default Employees;
