import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer,
        product: productReducer
    },
});

export default store;
