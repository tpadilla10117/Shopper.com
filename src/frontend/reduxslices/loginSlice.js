/* The redux slice for Login.js: */  
    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
        username: '',
        password: '',
        token: '',
    };

/* TODO: need to make login actions in the slice: */
    export const loginSlice = createSlice({
        name: 'login',
        initialState,
        reducers: {
            //Actions:

        }
    });


//Selectors - How we pull info from the Global Store slice:
    export const selectUsername = (state) => state.login.username;

    export const selectPassword = (state) => state.login.password;

    export const selectToken = (state) => state.login.token;

    export default loginSlice.reducer;

