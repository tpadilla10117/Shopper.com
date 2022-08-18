/* Redux slice for savedItems: */
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import { savedItemsService } from '../services/savedItemsService';

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