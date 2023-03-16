import React from 'react'
import { createUseStyles } from 'react-jss';
import { CURRENCY, padWithLeadingZeros } from '../../misc/utils';

const useStyles = createUseStyles(theme => ({
    container: {
        marginBottom: 5
    },
    quantity: {
        display: 'inline-block',
        width: 28
    },
    price: {
        float: 'right'
    },
    orderDots: {
        display: 'inline-block',
        backgroundColor: 'red',
    }
}));

const OrderDetail = props => {
    const { product } = props
    const classes = useStyles()
    const currency = CURRENCY

    return (
        <div className={classes.container}>
            <span className={classes.name}>{product.title}</span>
            <span className={classes.orderDots}></span>
            <span className={classes.price}>{product.price} {currency.symbol} x {padWithLeadingZeros(1)}</span>
        </div>
    )
}

export default OrderDetail
