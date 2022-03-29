/* The redux slice for a loading spinner: */

    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        loading: true,
    };

/* Create actions for the slice to dispatch into the store: */ /* TODO: Check this logic */
    export const loadingSlice = createSlice({
        name: "loader",
        initialState,
        reducers: {
            isLoading: (state, action) => {
                state.loading = false;
                console.log("dispatched from LoadingSlice!")
            }
        }
    });

/* Export the actions: */
    export const { isLoading } = loadingSlice.actions;

/* Export the selectors: */
    export const loadingSelector = (state) => state.loader.loading;

    export default loadingSlice.reducer;