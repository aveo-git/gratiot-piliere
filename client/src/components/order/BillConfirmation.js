import React from 'react'
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import Text from '../Text';
import BillTotalResume from './BillTotalResume';
import OrderDetail from './OrderDetail';

const useStyles = createUseStyles(theme => ({
    container: {
        border: '1px solid #DFDFDF',
        padding: 25
    },
    orderDetails: {
        padding: '10px 0'
    }
}));

const BillConfirmation = () => {
    const classes = useStyles()
    const { orders } = useSelector(state => state.orders);

    const orderDetails = orders.map((order, index) => (
        <OrderDetail key={index} order={order} />
    ))

    return (
        <div className={classes.container}>
            <Text isUpperCase>Rabenantoandro</Text>
            <Text>Sylvestre Stalone</Text>
            <Text>+261 34 xx xxx xx</Text>
            <Text>sylvestrestalone@email.com</Text>
            <Text>Rue RADAMA 1, BP 101</Text>
            <br />
            
            <Text >Détails du commande :</Text>
            <div className={classes.orderDetails}>
                {orderDetails}
                <BillTotalResume />
            </div>
        </div>
    )
}

export default BillConfirmation
