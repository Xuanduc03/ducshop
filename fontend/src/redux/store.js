import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from './categorySlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        category: categoryReducer,
        product: productReducer
    },
});

export default store;
