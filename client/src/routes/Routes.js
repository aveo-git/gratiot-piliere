import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import OrderCart from '../containers/order/OrderCart';
import OrderConfirmation from '../containers/order/OrderConfirmation';
import { _CART } from '../misc/links';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
    return <RoutesDOM>
        <Route path='/' element={<Dashboard/>}>
            <Route path='cart' element={<OrderCart/>}/>
            <Route path='cart/billResume' element={<OrderConfirmation/>} />
        </Route>
    </RoutesDOM>
}

export default Routes
