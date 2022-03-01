/* Import AuthService to make async HTTP requests to trigger dispatches: */

/* The redux slice for authentication: */  
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import { setMessage } from './authmessageSlice';
    import authService from '../services/authService';

    const user = JSON.parse(localStorage.getItem("user"));

/* Register Thunk: */
    export const register = createAsyncThunk(
        "auth/register",
        async ({username, email, password, firstname, lastname, isAdmin, imgURL, location, active } , thunkAPI) => {
            try {

            } catch (error) {
                const message = (error.response &&
                    error.response.data &&
                    error.response.data.message ) ||
                error.message ||
                error.toString();
                thunkAPI.dispatch(setMessage(message));
                return thunkAPI.rejectWithValue();
            }
        }
    );

/* Login Thunk: */
        export const login = createAsyncThunk(
            "auth/login",
            async ({username, password}, thunkAPI) => {
                try {
                    const data = await authService.login(username, password);
                    return { user: data };
                } catch (error) {
                    const message = (error.response && 
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();
                    thunkAPI.dispatch(setMessage(message));
                    return thunkAPI.rejectWithValue();
                }
            }
        );

/* Logout Thunk: */
        export const logout = createAsyncThunk("auth/logout", async () => {
            await authService.logout();
        });

/* Create initial state: */
        const initialState = user ? { isLoggedIn: true, user }
        : { isLoggedIn: false, user: null};

/* Create actions for UI components: */
        const authSlice = createSlice({
            name: "auth",
            initialState,
            reducers: {
                //actions:
                [register.fulfilled]: (state, action) => {
                    state.isLoggedIn = true;
                },
                [register.rejected]: (state, action) => {
                    state.isLoggedIn = false;
                },
                [login.fulfilled]: (state, action) => {
                    state.isLoggedIn = true;
                    state.user = action.payload.user;
                  },
                  [login.rejected]: (state, action) => {
                    state.isLoggedIn = false;
                    state.user = null;
                  },
                  [logout.fulfilled]: (state, action) => {
                    state.isLoggedIn = false;
                    state.user = null;
                  },
            },
        });

        export default authSlice.reducer;
