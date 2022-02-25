/* The redux slice for a modal: */
    import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice: */
    const initialState =  {
        modalVisibility: false,
    }

/* We create actions that have an action we dispatch to the global store: */
    export const modalSlice = createSlice({
        name: 'modal',
        initialState,
        reducers: {
            //Actions:
            handleModalVisibility: (state) => {
                state.modalVisibility = !state.modalVisibility
                console.log(`The value of ${state.modalVisibility}`)
            }
        }
    });

/* Export your actions to be used in components: */
    export const { handleModalVisibility } = modalSlice.actions;