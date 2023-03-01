import { actionForModal } from "../redux/actions/modals"

export const checkLocation = (pathname) => {
    let action = {}
    switch(pathname) {
        case '/cart':
            action = {type: 'ORDER', status: 'open'}
            break;
        case '/cart/billResume':
            action = {type: 'BILL', status: 'open'}
            break;
        default:
            break;
    }


    return dispatch => {
        dispatch(actionForModal(action))
    }
}