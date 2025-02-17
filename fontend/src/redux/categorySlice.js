import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action lấy thông tin user từ API
export const fetchSubCategories = createAsyncThunk(
    "categories/fetchSubCategories",
    async (parentId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/subcategories/${parentId}`);
        return response.data; // Trả về danh sách danh mục con
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const categorySlice = createSlice({
    name: "categories",
    initialState: {
      subCategories: [],
      selectedCategory: null,
      status: "idle",
      error: null,
    },
    reducers: {
      setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchSubCategories.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchSubCategories.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.subCategories = action.payload;
        })
        .addCase(fetchSubCategories.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    }
  });

export const { setSelectedCategory } = categorySlice.actions;
export default categorySlice.reducer;
