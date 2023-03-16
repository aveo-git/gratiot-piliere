import React from 'react'
import { createUseStyles } from 'react-jss';

import Text from '../Text';
import BillTotalResume from './BillTotalResume';
import OrderDetail from './OrderDetail';
import { useGetCarts } from '../../api/cart.api';
import moment from 'moment';

const useStyles = createUseStyles(theme => ({
    container: {
        border: '1px solid #DFDFDF',
        padding: 25
    },
    billTotal: {
        textAlign: 'right'
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
    const products = cart.map(item => item.product)
    const ref = 'REF-test'
    const date = moment().format()

    const orderDetails = products.map((product, index) => (
        <OrderDetail key={index} product={product} />
    ))

    return (
        <div className={classes.container}>
            <div className={classes.bloc}>
                <Text>REF: {ref}</Text>
            </div>
            <div className={classes.bloc}>
                <Text isUpperCase>Rabenantoandro</Text>
                <Text>Sylvestre Stalone</Text>
                <Text>+261 34 xx xxx xx</Text>
                <Text>sylvestrestalone@email.com</Text>
                <Text>Rue RADAMA 1, BP 101</Text>
            </div>
            <div className={classes.bloc}>
                <Text >Détails de la commande :</Text>
                <div className={classes.orderDetails}>
                    {orderDetails}
                </div>
                <BillTotalResume cart={products} styles={{ other: classes.billTotal }} />
            </div>
            <div className={classes.bloc}>
                <Text>La livraison de la commande se fait à :</Text>
                <Text>Rue RADAMA 1, BP 101</Text>
            </div>
            <Text styles={{ containerText: classes.billDate }}>{date}</Text>
        </div>
    )
}

export default BillConfirmation
