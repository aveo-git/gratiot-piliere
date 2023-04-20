import React from 'react';
import { createUseStyles } from 'react-jss';

import { isUserLogged } from '../../api/user.api';
import { parseToView, toShortDateString } from '../../misc/utils';
import Text from '../Text';
import BillTotalResume from './BillTotalResume';
import OrderDetail from './OrderDetail';

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
    },
    shippingAddressEmpty: {
        color: '#ff4209'
    }
}));

const BillConfirmation = (props) => {
    const { products } = props;
    const classes = useStyles();
    const currentUser = parseToView(isUserLogged()) || null;
    const ref = null;
    const shippingSetting = JSON.parse(window?.localStorage.getItem('shippingSetting')) || null

    const orderDetails = products?.map((product, index) => (
        <OrderDetail key={index} productCart={product} />
    ));

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
                <BillTotalResume products={products} styles={{ other: classes.billTotal }} />
            </div>
            <div className={classes.bloc}>
                <Text>Lieu de livraison :</Text>
                <Text>{shippingSetting?.shippingAddress}</Text>
            </div>
            <div className={classes.bloc}>
                <Text>Date de livraison :</Text>
                <Text>{`${toShortDateString(shippingSetting?.shippingDate)}, à ${shippingSetting?.shippingDate.split('T')[1]}`}</Text>
            </div>
        </div>
    )
}

export default BillConfirmation
