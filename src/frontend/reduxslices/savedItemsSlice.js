/* Redux slice for savedItems: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

    import savedItemsService  from '../services/savedItemsService.js';

    export const retrieveUsersSavedItems = createAsyncThunk(
        "items",
        async (user_id) => {
            try {
                const data = await savedItemsService.userSavedItemsRequest(user_id);
                console.log("From retrieveUsersSavedItems Thunk:", data)

                return { savedItems: data };

            } catch(error) {
                console.error(error)
            }
        }
    );

    export const emptyUsersSavedItems = createAsyncThunk(
        "removeItems",
        async () => {
            await savedItemsService.emptyStateArray();
        }
    );

/* Initial State: */
    const initialState = {
        savedItems: [],
    };
    
/* Actions for UI components: */
    const savedItemsSlice = createSlice({
        name: "items",
        initialState,
        reducers: {
            //actions:
        },
        extraReducers: builder => {
            builder
                .addCase(retrieveUsersSavedItems.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.savedItems = [...state.savedItems.concat(action.payload.savedItems)]
                })
                .addCase(emptyUsersSavedItems.fulfilled, (state, action) => {
                    state.status = 'succeeded'
                    state.savedItems = []
                });
        }
    });

/* Selectors: */
    
    export const selectUsersSavedItems = (state) => state.savedItems.savedItems;

    export default savedItemsSlice.reducer;