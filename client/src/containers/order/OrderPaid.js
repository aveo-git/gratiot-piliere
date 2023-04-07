import { IconCircleCheck } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Drawer from '../../components/Drawer'
import BillConfirmation from '../../components/order/BillConfirmation'

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
    titleDrawer: {
        lineHeight: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
            width: 50,
            height: 50,
            color: '#78D792',
            strokeWidth: 2,
            marginBottom: 10
        },
        '& span': {
            width: 260,
            textAlign: 'center'
        },
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 15
    },
    titleText: {
        margin: '0px 0px 25px 0px'
    },
    information: {
        textAlign: 'center',
        marginBottom: 25
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    buttonBills: {
        marginBottom: 15
    }
}));

const OrderPaid = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation()

    const _closeModal = () => {
        navigate('/our-products')
    }

    const _handleBills = () => {
        window?.localStorage.setItem('lastPathname', location.pathname)
        navigate('/our-products/profil/bills')
    }

    return (
        <div>
            <Drawer open={true} isModalClosable closeModal={_closeModal} closeOnOverlay={false}>
                <div className={classes.container}>
                    <div className={classes.content}>
                        <div className={classes.titleDrawer}>
                            <IconCircleCheck/>
                            <span>Commande réussie</span>
                        </div>
                        <div className={classes.information}>
                            Vous allez recevoir un mail <br /> sur le détails des paiements.
                            <br /><br />
                            Merci !
                        </div>
                        <BillConfirmation/>
                    </div>
                    <div className={classes.cta}>
                        <Button onClick={_handleBills} styles={{ container: classes.buttonBills }} textLabel='Voir mes factures' variant='primary' />
                        <Button textLabel='Télécharger ma facture' variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default OrderPaid
