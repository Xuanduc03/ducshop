import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SummaryApi from "~/utils/ApiRoute";

// Action lấy thông tin user từ API
export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(SummaryApi.GetUser.url, { withCredentials: true });
        if (response.data.success) {
            return response.data.user;
        } else {
            return rejectWithValue("Failed to fetch user");
        }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error fetching user");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
