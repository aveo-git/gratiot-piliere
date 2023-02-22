import { createSlice } from '@reduxjs/toolkit';

export const modalOrderSlice = createSlice({
    name: 'modalOrder',
    initialState: { 
        modal: { 
            open: false, 
            closeModal: true,
        }
    },
    reducers: {
        openModalOrder: (state, action) => {
            state.modal.open = true
            state.modal.closeModal = action.payload.closeModal
        },
        closeModalOrder: (state) => {
            state.modal.open = false
        }
    }
})

export const { openModalOrder, closeModalOrder } = modalOrderSlice.actions