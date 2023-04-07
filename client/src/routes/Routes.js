import React from 'react';
import { Route, Routes as RoutesDOM } from "react-router-dom";
import BillDetails from '../components/BillDetails';
import Login from '../containers/Login';
import OrderCart from '../containers/order/OrderCart';
import OrderConfirmation from '../containers/order/OrderConfirmation';
import OrderPaid from '../containers/order/OrderPaid';
import ProductModal from '../containers/product/ProductModal';
import Bills from '../containers/profil/Bills';
import General from '../containers/profil/General';
import History from '../containers/profil/History';
import MyProfil from '../containers/profil/MyProfil';
import Security from '../containers/profil/Security';
import ShippingLocation from '../containers/profil/ShippingLocation';
import Signup from '../containers/Signup';
import Dashboard from '../pages/Dashboard';
import ProductPlanner from '../pages/ProductPlanner';

const Routes = () => {
    return <RoutesDOM>
        <Route path='/' element={<Dashboard/>}>
            <Route path='signin' element={<Signup/>} />
            <Route path='login' element={<Login/>} />
            <Route path='my-profil' element={<MyProfil/>}>
                <Route path='general' element={<General/>} />
                <Route path='security' element={<Security/>} />
                <Route path='choise-shipping' element={<ShippingLocation/>} />
                <Route path='bills' element={<Bills/>}>
                    <Route path=':id' element={<BillDetails/>} />
                </Route>
                <Route path='history' element={<History/>} />
            </Route>
        </Route>
        <Route path='our-products' element={<ProductPlanner/>}>
            <Route path=':id' element={<ProductModal/>} />
            <Route path='cart' element={<OrderCart/>}>
                <Route path='login' element={<Login/>} />
                <Route path='confirmation' element={<OrderConfirmation/>} />
                <Route path='paid' element={<OrderPaid/>} />
            </Route>
            <Route path='profil' element={<MyProfil/>}>
                <Route path='general' element={<General/>} />
                <Route path='security' element={<Security/>} />
                <Route path='choise-shipping' element={<ShippingLocation/>} />
                <Route path='bills' element={<Bills/>}>
                    <Route path=':id' element={<BillDetails/>} />
                </Route>
                <Route path='history' element={<History/>} />
            </Route>
        </Route>
    </RoutesDOM>
}

export default Routes
