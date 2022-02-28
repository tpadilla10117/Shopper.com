/* The redux slice for authentication messages (success, errors, etc.) :*/
    import { createSlice } from "@reduxjs/toolkit";

/* Initial State of the slice: */
    const initialState = {};

/* I create actions to dispatch to the global store: */
    const authMessageSlice = createSlice({
        name: "message",
        initialState,
        reducers: {
            setMessage: (state, action) => {
                return { message: action.payload };
            },
            clearMessage: () => {
                return { message: "" };
            },
        },

    });

/* Export my actions to be used in UI components:  */
    export const { setMessage, clearMessage } = authMessageSlice.actions;

/* TODO: Selectors */

export default authMessageSlice.reducer;