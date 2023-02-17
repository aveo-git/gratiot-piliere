import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';
import Price from '../Price';
import Text from '../Text';
import { padWithLeadingZeros } from '../utils';
import ButtonOrderCount from './ButtonOrderCount';

const useStyles = createUseStyles(theme => ({
	container: {
        display: 'flex',
        border: '1px solid #000000',
        padding: 10,
        marginBottom: 20
	},
    img: {
        width: 80,
        height: 80,
        backgroundColor: '#e7e7e7'
    },
    name: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        lineHeight: '16px'
    },
    description: {
        marginTop: 8,
        display: '-webkit-box',
        maxWidth: 203,
        lineClamp: 3,
        boxOrient: 'vertical',
        overflow: 'hidden',
        height: 56,
        lineHeight: '19px'
    },
    content: {
        padding: '0 10px',
        flex: 1
    },
    priceAndCount: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    }
}));

const OrderItem = props => {
    const { order } = props;
    const classes = useStyles()

    const [count, setCount] = useState(order.quantity)

    const _handleMinus = () => {
        if(count <= 0) setCount(0)
        else setCount(count - 1)
    }

    const _handlePlus = () => {
        setCount(count + 1)
    }

    return (
        <div className={classes.container}>
            <div className={classes.img}></div>
            <div className={classes.content}>
                <Text styles={{containerText: classes.name}} isUpperCase>{order.nom}</Text>
                <Text styles={{containerText: classes.description}}>{order.description}</Text>
            </div>
            <div className={classes.priceAndCount}>
                <Price price={order.price+''} />
                <ButtonOrderCount text={padWithLeadingZeros(count)} variant='primary' handleMinus={_handleMinus} handlePlus={_handlePlus} />
            </div>
        </div>
    )
}

export default OrderItem
