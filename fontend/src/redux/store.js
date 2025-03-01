import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: {
        categories: categoryReducer,
        cart: cartReducer
    },
});

export default store;
