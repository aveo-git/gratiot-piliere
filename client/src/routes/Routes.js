import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import Login from '../containers/Login';
import OrderCart from '../containers/order/OrderCart';
import OrderConfirmation from '../containers/order/OrderConfirmation';
import Signin from '../containers/Signin';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
    return <RoutesDOM>
        <Route path='/' element={<Dashboard/>}>
            <Route path='signin' element={<Signin/>} />
            <Route exact path='login' element={<Login/>} />
            <Route path='cart' element={<OrderCart/>}/>
            <Route path='cart/billResume' element={<OrderConfirmation/>} />
        </Route>
    </RoutesDOM>
}

export default Routes
