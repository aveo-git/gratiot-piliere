import React from 'react'
import { isUserLogged } from '../api/user.api';
import { Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import MyProfil from '../containers/profil/MyProfil';
import General from '../containers/profil/General';
import Security from '../containers/profil/Security';
import ShippingLocation from '../containers/profil/ShippingLocation';
import Bills from '../containers/profil/Bills';
import BillDetails from './BillDetails';
import History from '../containers/profil/History';
import OrderConfirmation from '../containers/order/OrderConfirmation';
import OrderPaid from '../containers/order/OrderPaid';
import { useGetCarts } from '../api/cart.api';

const PrivateRoute = props => {
    const { comp } = props;
    const isLogged = isUserLogged();
    const { cart } = useGetCarts() || [];

    if(!isLogged) return <Navigate to="/" />;
    switch(comp) {
        case 'myProfil':
            return <MyProfil/>
        case 'general':
            return <General/>
        case 'security':
            return <Security/>
        case 'shippingLocation':
            return <ShippingLocation/>
        case 'bills':
            return <Bills/>
        case 'billDetails':
            return <BillDetails/>
        case 'history':
            return <History/>
        case 'orderConfirmation':
            if(cart.length > 0) {
                return <OrderConfirmation/>
            } else return <Navigate to="/our-products" />
        case 'orderPaid':
        case 'orderCanceled':
            return <OrderPaid/>
        default:
            return <Dashboard/>
    }
}

export default PrivateRoute
