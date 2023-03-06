export const checkLocation = (pathname) => {
    let action = {}
    switch(pathname) {
        case '/cart':
            action = {type: 'ORDER', status: 'open'}
            break;
        case '/cart/billResume':
            const orders = window.localStorage.getItem('orders');
            action = {type: 'BILL', status: 'open'}
            break;
        default:
            break;
    }

}