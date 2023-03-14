import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import Login from '../containers/Login';
import OrderCart from '../containers/order/OrderCart';
import OrderConfirmation from '../containers/order/OrderConfirmation';
import ProductModal from '../containers/product/ProductModal';
import Signin from '../containers/Signin';
import Dashboard from '../pages/Dashboard';
import ProductPlanner from '../pages/ProductPlanner';

const Routes = () => {
    return <RoutesDOM>
        <Route path='/' element={<Dashboard/>}>
            <Route path='signin' element={<Signin/>} />
            <Route path='login' element={<Login/>} />
            <Route path='cart' element={<OrderCart/>}/>
            <Route path='cart/billResume' element={<OrderConfirmation/>} />
        </Route>
        <Route exact path='our-products' element={<ProductPlanner/>}>
            <Route path=':id' element={<ProductModal/>} />
        </Route>
    </RoutesDOM>
}

export default Routes
