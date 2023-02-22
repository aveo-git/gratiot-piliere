import React from 'react'
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { padWithLeadingZeros } from '../utils';

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
    const { order } = props
    const classes = useStyles()
    const { currency } = useSelector(state => state.currency)

    return (
        <div className={classes.container}>
            <span className={classes.quantity}>{padWithLeadingZeros(order.quantity)}</span>
            <span className={classes.name}>{order.nom}</span>
            <span className={classes.orderDots}></span>
            <span className={classes.price}>{order.price} {currency.symbol}</span>
        </div>
    )
}

export default OrderDetail
