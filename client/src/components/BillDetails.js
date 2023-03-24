import { IconTrash } from '@tabler/icons-react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeleteOrder, useGetOneOrderById } from '../api/order.api';
import { groupById, lastPath } from '../misc/utils';
import Button from './Button';
import Drawer from './Drawer';
import BillTotalResume from './order/BillTotalResume';
import OrderDetail from './order/OrderDetail';
import Text from './Text';

const useStyles = createUseStyles(theme => ({
	root: {
        position: 'relative'
	},
    container: {
        height: 'calc(100vh - 110px)',
        overflow: 'auto',
    },
    billBloc: {
        border: '1px solid #DFDFDF',
        padding: 25,
    },
    billTotal: {
        textAlign: 'right'
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
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    }
}));

const BillDetails = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const location = useLocation()
    const id = lastPath(location.pathname)
    const {order} = useGetOneOrderById(id)
    const { mutate: deleteOrder } = useDeleteOrder()

    const ref = order.id
    const products = groupById(order.products);

    const _goBack = () => {
        navigate(-1)
    }

    const orderDetails = products?.map((product, index) => (
        <OrderDetail key={index} productCart={product} />
    ))

    const _handleDeleteBill = () => {
        deleteOrder(id)
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} extraIcon={<IconTrash onClick={_handleDeleteBill}/>} title={`Facture : ${id}`}>
                <div className={classes.root}>
                    <div className={classes.container}>
                        <div className={classes.billBloc}>
                            {ref && <div className={classes.bloc}>
                                <Text>REF: {ref}</Text>
                            </div>}
                            <div className={classes.bloc}>
                                <Text isUpperCase>Rabenantoandro</Text>
                                <Text>Sylvestre Stalone</Text>
                                <Text>+261 34 xx xxx xx</Text>
                                <Text>sylvestrestalone@email.com</Text>
                                <Text>Rue RADAMA 1, BP 101</Text>
                            </div>
                            <div className={classes.bloc}>
                                <Text >Détails de la commande :</Text>
                                <div className={classes.orderDetails}>
                                    {orderDetails}
                                </div>
                                <BillTotalResume cart={order.products} styles={{ other: classes.billTotal }} />
                            </div>
                            <div className={classes.bloc}>
                                <Text>La livraison de la commande se fait à :</Text>
                                <Text>Rue RADAMA 1, BP 101</Text>
                            </div>
                            <Text styles={{ containerText: classes.billDate }}>{order.createdAt}</Text>
                        </div>
                    </div>
                    <div className={classes.cta}>
                        <Button textLabel='Télécharger ma facture' variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default BillDetails
