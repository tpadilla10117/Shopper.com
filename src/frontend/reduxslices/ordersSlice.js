import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import ordersService from '../services/ordersService';

/* GET Thunk: */
export const getOrders = createAsyncThunk("orders", async () => {
    try {
        const orderData = await ordersService.ordersRequest();

        return { orderItems: orderData };

    } catch (error) {
        console.error(error);
    }
});

/* GET Thunk for an Individual User's Orders: */
export const getAUsersOrders = createAsyncThunk("get/usersOrders", async (user_id) => {
    try {
        
        const usersOrderData = await ordersService.individualUsersOrdersRequest(user_id);
        
        return { usersOrderItems: usersOrderData};

    } catch (error) {
        console.error(error);
    }
});

const initialState = {
    orderItems: [],
    usersOrderItems: [],
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
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.orderItems = [...state.orderItems.concat(action.payload.orderItems)]
            })
            .addCase(getAUsersOrders.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.usersOrderItems = [...state.usersOrderItems.concat(action.payload.usersOrderItems)]
            })
    }
});



/* Selectors: */

export const selectOrders = (state) => state.orders.orderItems;

export const selectUsersOrders = (state) => state.orders.usersOrderItems;

export default ordersSlice.reducer;