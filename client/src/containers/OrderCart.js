import { IconTrash } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../components/Button';
import Drawer from '../components/Drawer'
import NoOrders from '../components/order/NoOrders';
import OrderItem from '../components/order/OrderItem';
import Text from '../components/Text';
import { resetAllOrder } from '../redux/store';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    listOrder: {
        maxHeight: 'calc(100vh - 350px)',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: 0
        }
    },
    priceDesc: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 5,
        '& span': {
            color: '#98244D',
            fontFamily: 'Inter-Bold'
        }
    },
    info: {
        textAlign: 'center',
        margin: '20px 0 20px'
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }
}));

const OrderCart = props => {
    const { open, setOpen, closeModal } = props;
    const classes = useStyles()
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.orders);

    const _resetOrders = () => {
        dispatch(resetAllOrder())
    }

    return (
        <div>
            <Drawer open={open} setOpen={setOpen} closeModal={closeModal} extraIcon={<IconTrash onClick={_resetOrders}/>} title="Mon panier">
                {orders.length <= 0 ? <NoOrders/> : 
                    <div className={classes.container}>
                        <div className={classes.listOrder}>
                            {orders.map((order, index) => <OrderItem key={index} order={order} />)}
                        </div>
                        <div className={classes.cta}>
                            <Text styles={{containerText: classes.priceDesc}}>Totals HT : <span>140.00 €</span></Text>
                            <Text styles={{containerText: classes.priceDesc}}>TVA - 20% : <span>140.00 €</span></Text>
                            <Text styles={{containerText: classes.priceDesc}}>Total TTC : <span>140.00 €</span></Text>
                            <div className={classes.info}>Valider votre commande en cliquant sur commander :</div>
                            <Button textLabel='Commander' variant='primary' />
                        </div>
                    </div>
                }
            </Drawer>
        </div>
    )
}

export default OrderCart