/* Import productService to make async HTTP requests to trigger dispatches: */

/* Redux Slice for products requested from fakestoreapi.com: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import productService from '../services/productService';

/* GET Thunk: */
    export const getProducts = createAsyncThunk("products/products", async () => {
        await productService.getProducts();
    });

/* Create Initial State: */
    const initialState = {
        items: [],
    };

/* Create actions for UI components: */
    const productSlice = createSlice({
        name: "products",
        initialState,
        reducers: {
            //actions:

        }
    })

    export default productSlice.reducer;