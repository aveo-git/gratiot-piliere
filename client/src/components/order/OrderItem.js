import React from 'react'
import { createUseStyles } from 'react-jss';
import Price from '../Price';
import Text from '../Text';
import { padWithLeadingZeros } from '../../misc/utils';
import ButtonOrderCount from './ButtonOrderCount';
import { useCreateCart } from '../../api/cart.api';

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
        backgroundColor: '#e7e7e7',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        '& img': {
            height: 80
        }
    },
    name: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold',
        lineHeight: '16px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: 170,
        textOverflow: 'ellipsis'
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
    const { productsCart } = props;
    const { count, product } = productsCart;
    const classes = useStyles()
    const { mutate: createCart } = useCreateCart()

    const _handleMinus = () => {
        createCart({product, operand: 'minus'})
    }

    const _handlePlus = () => {
        createCart({product, operand: 'plus'})
    }

    return (
        <div className={classes.container}>
            <div className={classes.img}><img src={product?.imageUrl} alt={'bottle'} /></div>
            <div className={classes.content}>
                <Text styles={{containerText: classes.name}} isUpperCase>{product?.title}</Text>
                <Text styles={{containerText: classes.description}}>{product?.description}</Text>
            </div>
            <div className={classes.priceAndCount}>
                <Price price={product?.price+''} />
                <ButtonOrderCount text={padWithLeadingZeros(count)} variant='primary' handleMinus={_handleMinus} handlePlus={_handlePlus} />
            </div>
        </div>
    )
}

export default OrderItem
