import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "~/utils/ApiRoute";

// lấy user từ localstorage
const user = JSON.parse(localStorage.getItem("user")) || null;

export const loginUser = createAsyncThunk("auth/loginUser", 
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", userData);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//asycn thunk fetch user 
export const fetchUser = createAsyncThunk("auth/fetchUser", 
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/user", {
                headers : {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//slice cho auth 
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user, 
        status: "idle", 
        error: null
    },
    reducers : {
        logout : (state) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            state.user = null;
        },
    },
    extraReducers : (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
