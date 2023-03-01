import { actionForModal } from "../redux/actions/modals"

export const checkLocation = (pathname, dispatch) => {
    let action = {}
    switch(pathname) {
        case '/cart':
            action = {type: 'ORDER', status: 'open'}
            break;
        case '/cart/billresume':
            action = {type: 'BILL', status: 'open'}
            break;
        default:
            break;
    }


    dispatch(actionForModal(action))
}