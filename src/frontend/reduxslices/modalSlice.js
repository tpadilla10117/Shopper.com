/* The redux slice for a modal: */
    import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice: */
    const initialState =  {
        modalVisibility: false,
    }

/* I create actions that have an action I dispatch to the global store: */
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

/* Export my actions to be used in components: */
    export const { handleModalVisibility } = modalSlice.actions;

/* Selectors - How I pull the info. from the Global Store slice: */
    export const selectItems = (state) => state.modal.modalVisibility;

    export default modalSlice.reducer;