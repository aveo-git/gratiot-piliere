import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './actions/currency';
import { modalSlice } from './actions/modals';
import { ordersSlice } from './actions/order';

export const store = configureStore({
    reducer: {
        orders: ordersSlice.reducer,
        modals: modalSlice.reducer,
        currency: currencySlice.reducer
    }
})