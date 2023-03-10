import React from 'react';
import { createUseStyles } from 'react-jss';
import AvailableCard from '../../components/AvailableCard';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import BillConfirmation from '../../components/order/BillConfirmation';
import Text from '../../components/Text';

const useStyles = createUseStyles(theme => ({
	container: {
        position: 'relative'
	},
    content: {
        height: 'calc(100vh - 110px)',
        overflow: 'auto',
        '&>div': {
            maxHeight: 'calc(100vh - 330px)',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: 0
            }
        }
    },
    titleText: {
        margin: '10px 0px 25px 0px'
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    }
}));

const OrderConfirmation = () => {
    const classes = useStyles()

    const _closeModal = () => {
    }

    const _openOrderPaid = () => {
    }

    return (
        <div>
            <Drawer open={false} goBack={_closeModal} closeOnOverlay title="Commande">
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Text styles={{ containerText: classes.titleText }} textCenter >Voici le résumé de votre commande :</Text>
                        <BillConfirmation/>
                    </div>
                    <div className={classes.cta}>
                        <AvailableCard />
                        <Button textLabel='Payer' onClick={_openOrderPaid} variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default OrderConfirmation
