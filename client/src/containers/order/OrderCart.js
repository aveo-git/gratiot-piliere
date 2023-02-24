import { IconTrash } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../components/Button';
import Drawer from '../../components/Drawer'
import BillTotalResume from '../../components/order/BillTotalResume';
import NoOrders from '../../components/order/NoOrders';
import OrderItem from '../../components/order/OrderItem';
import { isEmpty } from '../../components/utils';
import { prepareOrders, resetAllOrder } from '../../redux/actions/order';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    listOrder: {
        height: 'calc(100vh - 150px)',
        overflow: 'auto',
        '&>div': {
            maxHeight: 'calc(100vh - 330px)',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: 0
            }
        }
    },
    billTotal: {
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
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    }
}));

const OrderCart = props => {
    const { open, closeModal } = props;
    const classes = useStyles()
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.orders);
    const { data } = orders;

    const _resetOrders = () => {
        dispatch(resetAllOrder())
    }

    const _openBillConfirmation = () => {
        dispatch(prepareOrders(orders))
    }

    return (
        <div>
            <Drawer open={open} closeModal={closeModal} isModalClosable extraIcon={<IconTrash onClick={_resetOrders}/>} title="Mon panier">
                {isEmpty(data) ? <NoOrders/> : 
                    <div className={classes.container}>
                        <div className={classes.listOrder}>
                            <div>
                            {data?.map((order, index) => <OrderItem key={index} order={order} />)}
                            </div>
                        </div>
                        <div className={classes.cta}>
                            <BillTotalResume styles={{ other: classes.billTotal }} />
                            <div className={classes.info}>Valider votre commande en cliquant sur commander :</div>
                            <Button textLabel='Commander' onClick={_openBillConfirmation} variant='primary' />
                        </div>
                    </div>
                }
            </Drawer>
        </div>
    )
}

export default OrderCart