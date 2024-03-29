import { IconLoader2, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetCarts, useRestoreCart } from '../../api/cart.api';

import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import BillTotalResume from '../../components/order/BillTotalResume';
import NoContent from '../../components/order/NoContent';
import OrderItem from '../../components/order/OrderItem';
import { groupByIdforCart } from '../../misc/utils';
import OrderSetting from './OrderSetting';

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
    },
    spinner: {
        animation: 'spin 1s infinite linear',
    }
}));

const OrderCart = props => {
    const classes = useStyles();
    const [openSetting, setOpenSetting] = useState(false);
    const navigate = useNavigate();
    const { cart } = useGetCarts() || []
    const { mutate: deleteCart, isLoading } = useRestoreCart();
    const productsOnCart = cart.map(item => item.product);
    const isCartEmpty = productsOnCart.length <= 0;
    let cartGrouped = groupByIdforCart(cart);

    const _resetOrders = () => {
        deleteCart();
    }

    const _openBillConfirmation = () => {
        setOpenSetting(true);
    }

    const _closeModal = () => {
        navigate('/our-products')
    }

    return (
        <div>
            <Drawer open={true} closeModal={_closeModal} isModalClosable extraIcon={!isCartEmpty && (isLoading ? <IconLoader2 className={classes.spinner} /> : <IconTrash onClick={_resetOrders}/>)} title="Mon panier">
                {isCartEmpty ? <NoContent For='order'/> : 
                    <div className={classes.container}>
                        <div className={classes.listOrder}>
                            <div>
                            {cartGrouped?.map((product, index) => <OrderItem key={index} productsCart={product} />)}
                            </div>
                        </div>
                        <div className={classes.cta}>
                            <BillTotalResume styles={{ other: classes.billTotal }} products={cartGrouped} />
                            <div className={classes.info}>Valider votre commande en cliquant sur commander :</div>
                            <Button textLabel='Commander' onClick={_openBillConfirmation} variant='primary' />
                        </div>
                    </div>
                }
            </Drawer>
            <OrderSetting isOpen={openSetting} setOpen={setOpenSetting} />
            <Outlet/>
        </div>
    )
}

export default OrderCart