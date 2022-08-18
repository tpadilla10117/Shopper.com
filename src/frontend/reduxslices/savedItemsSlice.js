/* Redux slice for savedItems: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import savedItemsService  from '../services/savedItemsService.js';

    export const retrieveUsersSavedItems = createAsyncThunk(
        "items/retrieveUsersSavedItems",
        async () => {
            try {
                const data = await savedItemsService.userSavedItemsRequest();
                console.log("From retrieveUsersSavedItems Thunk:", data)

                return { savedItems: data };

            } catch(error) {
                console.error(error)
            }
        }
    );

/* Initial State: */
    const initialState = {
        savedItems: [],
    };
console.log('saved items: ', initialState.savedItems)
/* Actions for UI components: */
    const savedItemsSlice = createSlice({
        name: "items",
        initialState,
        reducers: {
            //actions:
            [retrieveUsersSavedItems.fulfilled]: (state, action) => {
                state.savedItems = action.payload.savedItems;
            }
        },
        extraReducers(builder) {
            builder
                .addCase(retrieveUsersSavedItems.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.savedItems = [...state.savedItems.concat(action.payload.savedItems)]
                });
        }
    });

/* Selectors: */
    /* TODO: need to check this THUNK */
    export const selectUsersSavedItems = (state) => state.items;

    export default savedItemsSlice.reducer;