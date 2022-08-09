import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import ordersService from '../services/ordersService';

/* GET Thunk: */
export const getOrders = createAsyncThunk("orders", async () => {
    try {
        const orderData = await ordersService.ordersRequest();
        console.log("From the getOrders Thunk: ", orderData);

        return { orderItems: orderData };

    } catch (error) {
        console.error(error);
    }
})

const initialState = {
    orderItems: [],
};

/* Slice & Actions: */

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
       /*  [getOrders.fulfilled]: (state, action) => {
            state.orderItems = action.payload.orderItems
        } */
    },
    extraReducers(builder) {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.orderItems = [...state.orderItems.concat(action.payload.orderItems)]
        })
    }
});



/* Selectors: */

export const selectOrders = (state) => state.orders.orderItems;

export default ordersSlice.reducer;