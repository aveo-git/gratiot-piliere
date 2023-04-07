import React from 'react'
import { createUseStyles } from 'react-jss';

import Text from '../Text';
import BillTotalResume from './BillTotalResume';
import OrderDetail from './OrderDetail';
import { useGetCarts } from '../../api/cart.api';
import moment from 'moment';
import { groupByIdforCart, parseToView } from '../../misc/utils';
import { isUserLogged } from '../../api/user.api';

const useStyles = createUseStyles(theme => ({
    container: {
        border: '1px solid #DFDFDF',
        padding: 25
    },
    orderDetails: {
        padding: '10px 0',
        margin: '10px 0',
        border: '1px solid #DFDFDF',
        borderLeft: 'none',
        borderRight: 'none'
    },
    billDate: {
        fontFamily: 'Inter-Medium'
    },
    bloc: {
        marginBottom: 30
    }
}));

const BillConfirmation = () => {
    const classes = useStyles()
    const { cart } = useGetCarts() || []
    const products = groupByIdforCart(cart)
    const currentUser = parseToView(isUserLogged()) || null;
    const ref = null
    const date = moment().format()

    const orderDetails = products.map((product, index) => (
        <OrderDetail key={index} productCart={product} />
    ))

    return (
        <div className={classes.container}>
            {ref && <div className={classes.bloc}>
                <Text>REF: {ref}</Text>
            </div>}
            <div className={classes.bloc}>
                <Text isUpperCase>{currentUser?.lastName}</Text>
                <Text>{currentUser?.firstName}</Text>
                <Text>{currentUser?.mobile}</Text>
                <Text>{currentUser?.email}</Text>
                <Text>{currentUser?.address}</Text>
            </div>
            <div className={classes.bloc}>
                <Text >Détails de la commande :</Text>
                <div className={classes.orderDetails}>
                    {orderDetails}
                </div>
                <BillTotalResume cart={cart.map(item => item.product)} styles={{ other: classes.billTotal }} />
            </div>
            <div className={classes.bloc}>
                <Text>La livraison de la commande se fait à :</Text>
                {currentUser?.shippingAddress && <Text>{currentUser?.shippingAddress}</Text>}
            </div>
            <Text styles={{ containerText: classes.billDate }}>{date}</Text>
        </div>
    )
}

export default BillConfirmation
