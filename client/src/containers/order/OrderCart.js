import { IconTrash } from '@tabler/icons-react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetCarts, useRestoreCart } from '../../api/cart.api';

import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import BillTotalResume from '../../components/order/BillTotalResume';
import NoContent from '../../components/order/NoContent';
import OrderItem from '../../components/order/OrderItem';
import { groupByIdforCart } from '../../misc/utils';

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
    const classes = useStyles()
    const navigate = useNavigate()
    const { cart } = useGetCarts() || []
    const { mutate: deleteCart } = useRestoreCart()
    const productsOnCart = cart.map(item => item.product)

    let best_data = groupByIdforCart(cart)

    const _resetOrders = () => {
        deleteCart();
    }

    const _openBillConfirmation = () => {
        navigate('pfVq4W27GW')
    }

    const _closeModal = () => {
        navigate(-1)
    }


    const isCartEmpty = productsOnCart.length <= 0
    
    return (
        <div>
            <Drawer open={true} closeModal={_closeModal} isModalClosable extraIcon={!isCartEmpty && <IconTrash onClick={_resetOrders}/>} title="Mon panier">
                {isCartEmpty ? <NoContent For='order'/> : 
                    <div className={classes.container}>
                        <div className={classes.listOrder}>
                            <div>
                            {best_data?.map((product, index) => <OrderItem key={index} productsCart={product} />)}
                            </div>
                        </div>
                        <div className={classes.cta}>
                            <BillTotalResume styles={{ other: classes.billTotal }} cart={productsOnCart} />
                            <div className={classes.info}>Valider votre commande en cliquant sur commander :</div>
                            <Button textLabel='Commander' onClick={_openBillConfirmation} variant='primary' />
                        </div>
                    </div>
                }
            </Drawer>
            <Outlet/>
        </div>
    )
}

export default OrderCart