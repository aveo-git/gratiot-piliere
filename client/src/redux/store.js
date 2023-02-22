import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './actions/currency';
import { modalOrderSlice } from './actions/modals';
import { ordersSlice } from './actions/order';

export const store = configureStore({
    reducer: {
        orders: ordersSlice.reducer,
        modalOrder: modalOrderSlice.reducer,
        currency: currencySlice.reducer
    }
})