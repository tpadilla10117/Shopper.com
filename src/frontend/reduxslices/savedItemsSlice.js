/* Redux slice for savedItems: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import savedItemsService  from '../services/savedItemsService.js';

    export const retrieveUsersSavedItems = createAsyncThunk(
        "savedItems",
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

/* Actions for UI components: */
    const savedItemsSlice = createSlice({
        name: "userSavedItems",
        initialState,
        reducers: {
            //actions:
           
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
    
    export const selectUsersSavedItems = (state) => state.userSavedItems.savedItems;

    export default savedItemsSlice.reducer;