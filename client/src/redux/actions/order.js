import { createSlice } from '@reduxjs/toolkit';
import { getStringdate, minifyId, toDateFormatString, toDateString, toMoment } from '../../components/utils';
import { actionForModal } from './modals';

import { v4 as uuidv4 } from 'uuid'
import moment from 'moment';

const initialState = {
    orders: {
        id: '',
        ref: '',
        shippingAddress: '',
        date: '',
        data: [
            {
                id: '01agaura',
                nom: 'Brut Rose',
                description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
                quantity: 1,
                price: 33.99,
                image: 'null'
            },
            {
                id: '02agaura',
                nom: 'Millesime 2015',
                description: 'Ce Rosé est constitué de 83% de vin blanc',
                quantity: 2,
                price: 31.45,
                image: 'null'
            },
            {
                id: '03agaura',
                nom: 'Brut tradition',
                description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
                quantity: 1,
                price: 10,
                image: 'null'
            }
        ]
    }
}

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
            state.orders.data.push(tempState)
        },
        increment: (state, action) => {
            state.orders.data.map(item => {
                if(item.id === action.payload) {
                    item.quantity++
                }
                return null
            })
        },
        decrement: (state, action) => {
            state.orders.data.map(item => {
                if(item.id === action.payload) {
                    item.quantity--
                }
                return null
            })
            state.orders.data = state.orders.data.filter(item => item.quantity > 0)
        },
        update: (state, action) => {
            state.orders = action.payload
        },
        resetAllOrder: (state) => {
            state.orders.id = null
            state.orders.data = [];
        }
    }
})

export const { resetAllOrder, increment, update, decrement, addOrder } = ordersSlice.actions;

export const prepareOrders = (orders) => {
    return (dispatch, getState) => {
        const ordersTemp = {};
        ordersTemp.id = minifyId(uuidv4())
        ordersTemp.ref = 'COM-' + toDateFormatString(moment()) + '-' + ordersTemp.id
        ordersTemp.data = orders.data
        ordersTemp.date = getStringdate(toMoment())

        if(!orders.id) {
            dispatch(update(ordersTemp))
        } else {
            // Date validation commande must be change
            dispatch(update({...orders, date: getStringdate(toMoment())}))
        }
        
        dispatch(actionForModal({type: 'BILL', status: 'open'}))
    }
}

export const paymentOrder = (orders) => {
    return (dispatch) => {
        dispatch(actionForModal({type: 'PAID', status: 'open'}))
    }
}