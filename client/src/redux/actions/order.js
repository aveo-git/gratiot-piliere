import { createSlice } from '@reduxjs/toolkit';
import { ordersInitial } from '../../components/utils';

const initialState = {orders: ordersInitial}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            const tempState = {
                id: action.payload, 
                nom: 'Brut Rose', 
                description: 'Une petite description pas assez longue',
                quantity: 1,
                price: 15,
                image: null
            }
            state.orders.push(tempState)
        },
        increment: (state, action) => {
            state.orders.map(item => {
                if(item.id === action.payload) {
                    item.quantity++
                }
                return null
            })
        },
        decrement: (state, action) => {
            state.orders.map(item => {
                if(item.id === action.payload) {
                    item.quantity--
                }
                return null
            })
            state.orders = state.orders.filter(item => item.quantity > 0)
        },
        resetAllOrder: (state) => {
            state.orders = [];
        }
    }
})

export const { resetAllOrder, increment, decrement, addOrder } = ordersSlice.actions