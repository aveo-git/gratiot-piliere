import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import OrderCart from '../containers/order/OrderCart';
import ProductModal from '../containers/product/ProductModal';
import Dashboard from '../pages/Dashboard';
import ProductPlanner from '../pages/ProductPlanner';

const Routes = () => {
    return <RoutesDOM>
        <Route path='/' element={<Dashboard/>}>
            <Route path='signin' element={<Signup/>} />
            <Route path='login' element={<Login/>} />
            <Route path='my-profil' element={<PrivateRoute comp='myProfil'/>}>
                <Route path='general' element={<PrivateRoute comp='general' />} />
                <Route path='security' element={<PrivateRoute comp='security' />} />
                <Route path='choise-shipping' element={<PrivateRoute comp='shippingLocation' />} />
                <Route path='bills' element={<PrivateRoute comp='bills' />}>
                    <Route path=':id' element={<PrivateRoute comp='billDetails' />} />
                </Route>
                <Route path='history' element={<PrivateRoute comp='history' />} />
            </Route>
        </Route>
        <Route path='our-products' element={<ProductPlanner/>}>
            <Route path=':id' element={<ProductModal/>} />
            <Route path='cart' element={<OrderCart/>}>
                <Route path='login' element={<Login/>} />
                <Route path='confirmation' element={<PrivateRoute comp='orderConfirmation'/>} />
                <Route path='paid-success/:id' element={<PrivateRoute comp='orderPaid'/>} />
                <Route path='paid-cancel/:id' element={<PrivateRoute comp='orderCanceled'/>} />
            </Route>
            <Route path='profil' element={<PrivateRoute comp='myProfil'/>}>
                <Route path='general' element={<PrivateRoute comp='general'/>} />
                <Route path='security' element={<PrivateRoute comp='security' />} />
                <Route path='choise-shipping' element={<PrivateRoute comp='shippingLocation' />} />
                <Route path='bills' element={<PrivateRoute comp='bills' />}>
                    <Route path=':id' element={<PrivateRoute comp='billDetails' />} />
                </Route>
                <Route path='history' element={<PrivateRoute comp='history' />} />
            </Route>
        </Route>
    </RoutesDOM>
}

export default Routes
