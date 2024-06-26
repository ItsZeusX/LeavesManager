import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import storeContext from "../contexts/Store";

const Balance = () => {
  const [balance, setBalance] = useState<any>(null);
  const { refreshEffect } = useContext(storeContext);
  useEffect(() => {
    fetch("/api/employees/balance")
      .then((res) => res.json())
      .then((data) => setBalance(data));
  }, [refreshEffect]);
  return (
    balance && (
      <Table removeWrapper className="font-poppins" isCompact>
        <TableHeader>
          <TableColumn>SOLDE</TableColumn>
          <TableColumn>UTILISÉ</TableColumn>
          <TableColumn>DISPONIBLE</TableColumn>
          <TableColumn>TOTAL</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <Chip color="success" variant="flat">
                Payé
              </Chip>
            </TableCell>
            <TableCell>{balance?.vacation.used}</TableCell>
            <TableCell>{balance?.vacation.available}</TableCell>
            <TableCell>{balance?.vacation.allowance}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>
              <Chip color="warning" variant="flat">
                Maladie
              </Chip>
            </TableCell>
            <TableCell>{balance?.sick.used}</TableCell>
            <TableCell>{balance?.sick.available}</TableCell>
            <TableCell>{balance?.sick.allowance}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>
              <Chip color="danger" variant="flat">
                Sans solde
              </Chip>
            </TableCell>
            <TableCell>{balance?.unpaid.used}</TableCell>
            <TableCell>{balance?.unpaid.available}</TableCell>
            <TableCell>{balance?.unpaid.allowance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  );
};

export default Balance;
