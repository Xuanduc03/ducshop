import { createSlice } from "@reduxjs/toolkit";

// Action lấy thông tin user từ API
const initialState = {
    selectedCategory: ''
}

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
});

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
