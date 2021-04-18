import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import React, { FC } from "react";

interface CustomTableProps {
  headings: JSX.Element | JSX.Element[];
  data: JSX.Element | JSX.Element[];
}

const CustomTable: FC<CustomTableProps> = (props: CustomTableProps) => {
  const { headings, data } = props;
  return (
    <TableContainer className="m-4 w-50" component={Paper}>
      <Table aria-label="Similar words">
        <TableHead>{headings}</TableHead>
        <TableBody>{data}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;