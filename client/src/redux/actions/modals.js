import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modals',
    initialState: { 
        modals: {
            order: false, 
            bill: false,
            paid: false,
            profil: false
        }
    },
    reducers: {
        actionForModal: (state, action) => {
            switch(action.payload.type) {
                case 'ORDER':
                    state.modals.order = action.payload.status === 'open' ? true : false
                    break;
                case 'BILL':
                    state.modals.bill = action.payload.status === 'open' ? true : false
                    break;
                case 'PAID':
                    state.modals.paid = action.payload.status === 'open' ? true : false
                    break;
                case 'PROFIL':
                    state.modals.profil = action.payload.status === 'open' ? true : false
                    break;
                    default:
                        state.modals = {order: false, bill: false, paid: false, profil: false}
                        break;
            }
        },
    }
})

export const { actionForModal } = modalSlice.actions

export const openOrCloseModal = (navigate, {type, link, status}) => {
    navigate(link)
    return (dispatch) => {
        dispatch(actionForModal({type, status}))
    }
}

export const closeAllModals = () => {
    return (dispatch) => {
        dispatch(actionForModal({type: 'CLOSE_ALL', status: 'close'}))
    }
}