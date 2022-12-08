/* Import AuthService to make async HTTP requests to trigger dispatches: */

/* The redux slice for authentication: */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './authmessageSlice.js';
import authService from '../services/authService.js';

const user = JSON.parse(localStorage.getItem('user'));

/* Register Thunk: */
export const register = createAsyncThunk(
	'auth/register',
	async (
		{
			username,
			password,
			firstname,
			lastname,
			location,
			email,
			isAdmin,
			imgURL,
			active,
			created_at,
		},
		thunkAPI
	) => {
		try {
			const data = await authService.register(
				username,
				password,
				firstname,
				lastname,
				location,
				email,
				isAdmin,
				imgURL,
				active,
				created_at
			);
			return { user: data };
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			thunkAPI.dispatch(setMessage(message));
			return thunkAPI.rejectWithValue();
		}
	}
);

/* Login Thunk: */
export const login = createAsyncThunk(
	'auth/login',
	async ({ username, password }, thunkAPI) => {
		try {
			const data = await authService.login(username, password);
			
			return { user: data };
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
				console.log('Username and password from thunk: ', username)
				console.log('Username and password from thunk: ', password)

			/* TODO: Can dispatch my message here via error.toString() on line 69, */
			/* But need to have a custom error somewhere... */

			thunkAPI.dispatch(setMessage("The email address and password you entered doesn't match our records. Please try again"));
			console.log('From the thunk:', error.response)
			console.log('From the thunk:', message)
			console.log('From the thunk:', error.response.data)
			console.log('From the thunk:', error.message)
			console.log('From the thunk, error object:', error)
			
			//Gets returned as a payload for the auth/login/rejected action
			return thunkAPI.rejectWithValue("The email address and password you entered doesn't match our records. Please try again");
		}
	}
);

/* Logout Thunk: */
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

/* Create initial state: */
const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

/* Create actions for UI components: */
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		//actions:
		/* [register.fulfilled]: (state, action) => {
                    state.isLoggedIn = true;
                    state.user = action.payload.user
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
                }, */
				clearErrMessage: () => {
					return { message: '' };
				},
	},
	extraReducers(builder) {
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.status = 'succeeded';
				state.user = action.payload.user;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.status = 'succeeded';
				state.user = action.payload.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoggedIn = false;
				state.status = 'Login Failed';
				state.error = action.payload
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = false;
				state.status = 'succeeded';
				state.user = null;
			});
	},
});

/* User selector:  */
export const userData = state => state.auth.user;

export const loginErrorMessage = state => state.auth.error;

export const { clearErrMessage } = authSlice.actions;

export const testData = state => state.auth;

export const reduxStateObject = state => state;

export default authSlice.reducer;
