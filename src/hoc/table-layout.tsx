import { Card, TableContainer, TablePagination } from "@mui/material";
import React from "react";
interface TableLayoutProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange?: any;
    onRowsPerPageChange?: any;
    children?: React.ReactNode;
}
export default function TableLayout(props: TableLayoutProps) {
    const {
        count = 0,
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0,
      } = props;
    return <Card>
        <TableContainer sx={{ maxHeight: 440 }}>
            {props.children}
        </TableContainer>
        <TablePagination
            component="div"
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
        />
    </Card>
}