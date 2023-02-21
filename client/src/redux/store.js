import { configureStore } from '@reduxjs/toolkit';
import { ordersSlice } from './actions/order';

export const store = configureStore({
    reducer: {
        orders: ordersSlice.reducer
    }
})