/* The redux slice for nav: */
    import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice: */
    const initialState = {
        isOpen: false,
    }

/* I create actions that have an action to dispatch to the global store: */
    export const navSlice = createSlice({
        name: "nav",
        initialState,
        reducers: {
            //Actions:
            navToggler: (state) => {
                state.isOpen = !state.isOpen
            }

        }
    });

/* Export your actions to be used in components: */
    export const { navToggler } = navSlice.actions;

/* Selectors - This is how we pull info. from the Global Store slice: */
    export const navStatus = (state) => state.nav.isOpen;

    export default navSlice.reducer;