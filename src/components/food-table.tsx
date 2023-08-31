import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelection } from "@/hooks/use-selection";
import TableLayout from "@/hoc/table-layout";
import { applyPagination } from "@/hooks/use-pagination";
import { Avatar, Box, Button, Chip, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Foods, addFood, getfoods, removeFood } from "@/redux/reducer/food-slice";
import axios from "axios";
import FoodPopup from "./food-popup";

interface AppProps {
}
export default function FoodTable (props: AppProps) {
    const baseUrl = 'https://localhost:7283/api/food';
    const dispatch = useDispatch();
    const data = useSelector(getfoods);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowPerPage] = useState(5);
    useEffect(() => {
        axios.get(baseUrl).then(response => {
            console.log(response.data);
            response.data.map((row: Foods) => {
                dispatch(addFood(row));
            })
        }).catch((error) => console.log(error.message)).finally(() => console.log('finish'));;
    }, []);
    // set data using hook Memo for cache result
    const useFoods = (page: number, rowsPerPage: number) => {
        return useMemo(
          () => {
            return applyPagination(data, page, rowsPerPage);
          },
          [page, rowsPerPage, data]
        );
    };
    const useFoodIds = (Foods: any) => {
        return useMemo(
          () => {
            return Foods.map((row: any) => row.Id);
          },
          []
        );
    };
    const foods = useFoods(page, rowsPerPage);
    const FoodsIds = useFoodIds(foods);
    const FoodSelection = useSelection(FoodsIds);
    const handlePageChange = useCallback(
        (event: any, value: number) => {
            setPage(value);
        },
        []
    );
    const handleRowsPerPageChange = useCallback(
        (event: any) => {
          setRowPerPage(event.target.value);
        },
        []
    );
    const handleDelete = (id: string) => {
        axios.delete(baseUrl + '/' + id).then(resp => {
            console.log(resp);
        }).catch(error => { console.log(error) }).finally(() => {
            dispatch(removeFood(id));
        })
    }
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleAdd = () => {
        setOpen(true);
        setSelectFood(undefined);
    }
    const [selectFood, setSelectFood] = useState<Foods>();
    const handleEdit = (row: Foods) => {
        setSelectFood(row);
        setOpen(true);
    }
    return (
        <React.Fragment>
            <Box sx={{ border: '1px solid #B1B2B2', borderRadius: 2.5 }}>
                <TableLayout count={data.length} page={page} rowsPerPage={rowsPerPage} onPageChange={handlePageChange} onRowsPerPageChange={handleRowsPerPageChange}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{ textAlign: 'center' }}>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    OrderDate 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    Region 
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    City
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    Category
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    Product
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    Quantity
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    UnitPrice
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                    TotalPrice
                                </TableCell>
                                <TableCell sx={{ textAlign: 'left',
                                    borderBottom: '1px solid #B1B2B2 !important' }}>
                                        <Button onClick={handleAdd}>Add</Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((Foods: any, index: number) => {
                                const isSelected = FoodSelection.selected.includes(Foods.id);
                                return <TableRow key={index} hover selected={isSelected}>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.orderDate}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.region}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.city}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.category}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.product}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.quantity}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {Foods.unitPrice}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Typography variant="body1">
                                            {(Foods.quantity * Foods.unitPrice).toFixed(2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: (theme) => Foods.isdelete ? theme.palette.grey[400] : '' }}>
                                        <Button onClick={() => handleDelete(Foods.id)}>delete</Button>
                                        <Button onClick={() => handleEdit(Foods)}>edit</Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableLayout>
                <FoodPopup open={open} handleClose={handleClose} food={selectFood} />
            </Box>
        </React.Fragment>
    )
}