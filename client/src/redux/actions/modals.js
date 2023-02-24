import { createSlice } from '@reduxjs/toolkit';

export const modalOrderSlice = createSlice({
    name: 'modalOrder',
    initialState: { 
        modal: { 
            open: false, 
            isClosed: true,
        }
    },
    reducers: {
        openModalOrder: (state) => {
            state.modal.open = true
        },
        closeModalOrder: (state) => {
            state.modal.open = false
        }
    }
})

export const { openModalOrder, closeModalOrder } = modalOrderSlice.actions

export const modalBillSlice = createSlice({
    name: 'modalBill',
    initialState: { 
        modal: { 
            open: false, 
            isClosed: true,
        }
    },
    reducers: {
        openModalBill: (state) => {
            state.modal.open = true
        },
        closeModalBill: (state) => {
            state.modal.open = false
        }
    }
})

export const { openModalBill, closeModalBill } = modalBillSlice.actions

export const closeAllModals = () => {
    return (dispatch) => {
        dispatch(closeModalOrder())
        dispatch(closeModalBill())
    }
}