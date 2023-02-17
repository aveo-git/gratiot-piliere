import { IconTrash } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button';
import Drawer from '../components/Drawer'
import NoOrders from '../components/order/NoOrders';
import OrderItem from '../components/order/OrderItem';
import Text from '../components/Text';

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
    const { open, setOpen, closeModal, noOrders = false } = props;
    const classes = useStyles()

    return (
        <div>
            <Drawer open={open} setOpen={setOpen} closeModal={closeModal} extraIcon={<IconTrash />} title="Mon panier">
                {noOrders ? <NoOrders/> : 
                    <div className={classes.container}>
                        <div className={classes.listOrder}>
                            {orders.map((order, index) => <OrderItem order={order} />)}
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

const orders = [
    {
        id: '01agaura',
        nom: 'Brut Rose',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 33.99,
        image: 'null'
    },
    {
        id: '02agaura',
        nom: 'Millesime 2015',
        description: 'Ce Rosé est constitué de 83% de vin blanc',
        quantity: 2,
        price: 31.45,
        image: 'null'
    },
    {
        id: '03agaura',
        nom: 'Millesime 2015',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 10,
        image: 'null'
    },
    {
        id: '01agaura',
        nom: 'Brut Rose',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 33.99,
        image: 'null'
    },
    {
        id: '02agaura',
        nom: 'Millesime 2015',
        description: 'Ce Rosé est constitué de 83% de vin blanc',
        quantity: 2,
        price: 31.45,
        image: 'null'
    },
    {
        id: '03agaura',
        nom: 'Millesime 2015',
        description: 'Ce Rosé est constitué de 83% de vin blanc et 17% de vin de la suite je ne sais plus quoi dire mais je veux des phrases tres tres longues',
        quantity: 1,
        price: 10,
        image: 'null'
    }
]
