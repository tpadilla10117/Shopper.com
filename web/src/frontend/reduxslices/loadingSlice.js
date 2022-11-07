/* The redux slice for a loading spinner: */

    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        loading: false,
    };

/* Create actions for the slice to dispatch into the store: */ 
    export const loadingSlice = createSlice({
        name: "loader",
        initialState,
    /* Object of 'case reducers'.  Key names used for actions : */
        reducers: {
            isLoading: (state, action) => {
                state.loading = action.payload;
                console.log("dispatched from LoadingSlice!")
            }
        }
    });

/* Export the actions: */
    export const { isLoading } = loadingSlice.actions;

/* Export the selectors: */
    export const setLoader = (state) => state.loader.loading;

    export default loadingSlice.reducer;