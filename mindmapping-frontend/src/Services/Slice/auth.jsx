import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../AuthServices/auth.service";

const access_token = JSON.parse(localStorage.getItem("access_token"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ firstname, lastname, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.register(firstname, lastname, email, password);
            console.log(response.data)
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
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

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return { access_token: data };
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

export const logout = createAsyncThunk("", async () => {
    await AuthService.logout();
});

const initialState = access_token
    ? { isLoggedIn: true, access_token }
    : { isLoggedIn: false, access_token: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.access_token = null;
            state.user = null;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.access_token = null;
            state.user = null;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.access_token = null;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.access_token = null;
            state.user = null;
        },
    },
});

const { reducer } = authSlice;
export default reducer;