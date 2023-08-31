import { CustomModal } from "@/hoc/modal-layout";
import { Box, Button, Card, CardContent, CardHeader, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ChildrenHandle } from "./datepicker";
import DatePickerValue from './datepicker';
import axios from "axios";
import { useDispatch } from "react-redux";
import { Foods, addFood, editFood } from "@/redux/reducer/food-slice";
import dayjs from "dayjs";
interface AppProps {
    open: boolean,
    handleClose: VoidFunction,
    food?: Foods
}

export default function FoodPopup (props: AppProps) {
    const baseUrl = 'https://localhost:7283/api/food';
    const dispatch = useDispatch();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = {
            orderDate: pickerRef.current?.getChildState().date.format('YYYY-MM-DDThh:mm:ss'),
            region: data.get("region"),
            city: data.get("city"),
            category: data.get("category"),
            product: data.get("product"),
            quantity: data.get('quantity'),
            unitPrice: data.get('unitprice'),
        };
        if (props.food) {
            let nobj = {
                ...obj,
                id: props.food.id
            }
            axios.put(baseUrl, nobj).then(resp => {
                let updateRow:Foods = {
                    id: nobj.id,
                    orderDate: (nobj.orderDate as string),
                    region: (nobj.region as string),
                    city: (nobj.city as string),
                    category: (nobj.category as string),
                    product: (nobj.product as string),
                    quantity: (nobj.quantity as unknown as number),
                    unitPrice: (nobj.unitPrice as unknown as number)
                }
                dispatch(editFood(updateRow));
            }).catch(error => console.log(error)).finally(() => {
                props.handleClose();
            })
        } else {
            axios.post(baseUrl, obj).then(resp => {
                dispatch(addFood(resp.data));
            }).catch(error => console.log(error)).finally(() => {
                props.handleClose();
            })
        }
    };
    const pickerRef = React.useRef<ChildrenHandle>(null);
    useEffect(() => {
        if (props.food) {
            console.log(props.food);
        } else {
            console.log('clear');
        }
    }, [props.food])
    return (
        <React.Fragment>
            <CustomModal open={props.open} handleClose={() => props.handleClose()}>
                <Card sx={{ maxHeight: 500, overflowY: 'scroll' }}>
                    <CardContent>
                        <Grid container component="main" sx={{ height: "100vh", justifyContent: 'center' }}>
                            <Grid item xs={12} md={12} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                    my: 8,
                                    mx: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    }}
                                >
                                    <Typography component="h1" variant="h5">
                                        Food Form
                                    </Typography>
                                    <Box
                                        component="form"
                                        noValidate
                                        onSubmit={handleSubmit}
                                        sx={{ mt: 3 }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    Order Date
                                                </Typography>
                                                <DatePickerValue value={dayjs(props.food ? props.food.orderDate : '')} ref={pickerRef} />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="region-name"
                                                    name="region"
                                                    required
                                                    fullWidth
                                                    id="region"
                                                    label="Region"
                                                    defaultValue={props.food ? props.food.region : ''}
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="city"
                                                    label="City"
                                                    name="city"
                                                    defaultValue={props.food ? props.food.city : ''}
                                                    autoComplete="city-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="category"
                                                    label="Category"
                                                    name="category"
                                                    defaultValue={props.food ? props.food.category : ''}
                                                    autoComplete="category-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="product"
                                                    label="Product"
                                                    name="product"
                                                    defaultValue={props.food ? props.food.product : ''}
                                                    autoComplete="product-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="quantity"
                                                    label="Quantity"
                                                    type="number"
                                                    id="quantity"
                                                    defaultValue={props.food ? props.food.quantity : ''}
                                                    autoComplete="quantity"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="unitprice"
                                                    label="Unit Price"
                                                    type="number"
                                                    id="unitprice"
                                                    defaultValue={props.food ? props.food.unitPrice : ''}
                                                    autoComplete="quantity"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            save
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CustomModal>
        </React.Fragment>
    )
}
