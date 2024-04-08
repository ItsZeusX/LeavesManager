import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";

const Balance = () => {
  return (
    <Table removeWrapper className="font-poppins" isCompact>
      <TableHeader>
        <TableColumn>BALANCE</TableColumn>
        <TableColumn>USED</TableColumn>
        <TableColumn>AVAILABLE</TableColumn>
        <TableColumn>ALLOWANCE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>
            <Chip color="success" variant="flat">
              Vacation
            </Chip>
          </TableCell>
          <TableCell>0</TableCell>
          <TableCell>18</TableCell>
          <TableCell>18</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>
            <Chip color="warning" variant="flat">
              Sick
            </Chip>
          </TableCell>
          <TableCell>0</TableCell>
          <TableCell>60</TableCell>
          <TableCell>60</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>
            <Chip color="danger" variant="flat">
              Unpaid
            </Chip>
          </TableCell>
          <TableCell>0</TableCell>
          <TableCell>365</TableCell>
          <TableCell>365</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Balance;
