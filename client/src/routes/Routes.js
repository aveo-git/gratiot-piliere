import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import Login from '../containers/Login';
import MyProfil from '../containers/MyProfil';
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
            <Route path='my-profil' element={<MyProfil/>} />
        </Route>
        <Route path='our-products' element={<ProductPlanner/>}>
            <Route path=':id' element={<ProductModal/>} />
            <Route path='cart' element={<OrderCart/>}>
                <Route path=':id' element={<OrderConfirmation/>} />
            </Route>
        </Route>
    </RoutesDOM>
}

export default Routes
