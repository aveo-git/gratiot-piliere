import { createSlice } from '@reduxjs/toolkit';

export const currencySlice = createSlice({
    name: 'modalOrder',
    initialState: { 
        currency: { 
            name: 'euro', 
            symbol: '€',
        }
    },
    reducers: {
        setCurrency: (state, action) => {
            state.currency.name = action.payload.name
            state.currency.symbol = action.payload.symbol
        }
    }
})

export const { setCurrency } = currencySlice.actions