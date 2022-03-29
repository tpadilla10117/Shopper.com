/* Import productService to make async HTTP requests to trigger dispatches: */

/* Redux Slice for products requested from fakestoreapi.com: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import productService from '../services/productService';

/* GET Thunk (middleware to make API Call): */
    export const getProducts = createAsyncThunk("products", async () => {
        try { 
            const data = await productService.productRequest();
            console.log("From getProducts Thunk: ", data)
           
            return { items: data };
            
        } catch (error) {
            console.error(error)
        }
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
            [getProducts.fulfilled]: (state, action) => {
                state.items = action.payload.items;
            }
        },
    /* ExtraReducer responds to the actions of the Thunk -> builder object used to define additional case reducers to run in response to actions outside of slice */
        extraReducers(builder) {
            builder
                .addCase(getProducts.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.items = [...state.items.concat(action.payload.items)]
                })
        }
    });


/* Selectors - how to pull info from Global store slice: */

    export const selectItems = (state) => state.products.items;

    export default productSlice.reducer;