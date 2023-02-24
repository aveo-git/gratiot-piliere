import { configureStore } from '@reduxjs/toolkit';
import { currencySlice } from './actions/currency';
import { modalBillSlice, modalOrderSlice } from './actions/modals';
import { ordersSlice } from './actions/order';

export const store = configureStore({
    reducer: {
        orders: ordersSlice.reducer,
        modalOrder: modalOrderSlice.reducer,
        modalBill: modalBillSlice.reducer,
        currency: currencySlice.reducer
    }
})