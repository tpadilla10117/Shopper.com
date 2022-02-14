/* The redux slice for nav: */
    import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice: */
    const initialState = {
        isOpen: false,
    }

/* We create actions that have an action wee dispatch to the global store: */
    export const navSlice = createSlice({
        name: "nav",
        initialState,
        reducers: {

        }
    })

    export default navSlice.reducer;