import { IconShoppingCart } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { useGetCarts } from '../api/cart.api'
import Button from './Button'

const useStyles = createUseStyles(theme => ({
    buttonShop: {
        width: 25,
        marginLeft: 15
    },
    icon: {
        marginLeft: 0,
        '& svg': {
            width: 20,
            height: 20
        }
    },
    counter: {
        position: 'absolute',
        width: 22,
        height: 22,
        borderRadius: 50,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: 13,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        left: 60,
        top: '-9px'
    },
}))

const CartButton = props => {
    const { handleCart } = props;
    const classes = useStyles()
    const { cart } = useGetCarts() || []
    const counter = cart.length
    return (
        <>
        <Button variant='primary' icon={<IconShoppingCart/>} styles={{ container: classes.buttonShop, icon: classes.icon }} onClick={handleCart} /> {counter > 0 && <span className={classes.counter}>{counter}</span>}
        </>
    )
}

export default CartButton
