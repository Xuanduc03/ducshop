import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoryReducer,
        product: productReducer,
        cart: cartReducer
    },
});

export default store;
