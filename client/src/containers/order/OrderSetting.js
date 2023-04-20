import React, { useState } from 'react'
import Drawer from '../../components/Drawer'
import Button from '../../components/Button';
import { createUseStyles } from 'react-jss';
import Text from '../../components/Text';
import TextField from '../../components/TextField';
import { capitalizeFirstLetter, parseToView, shippingSites } from '../../misc/utils';
import { isUserLogged } from '../../api/user.api';
import { useNavigate } from 'react-router-dom';

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
    },
    shippingAddress: {
        marginBottom: 15
    },
    selectShipping: {
        width: '100%',
        '& select': {
            width: '100%'
        },
        '& input': {
            width: 348
        }
    }
}));

const OrderSetting = (props) => {
    const { isOpen, setOpen } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const currentUser = parseToView(isUserLogged()) || null;
    const shippingSetting = JSON.parse(window?.localStorage.getItem('shippingSetting')) || {shippingAddress: currentUser?.shippingAddress};
    const [fields, setFields] = useState({shippingAddress: shippingSetting?.shippingAddress, shippingDate: shippingSetting?.shippingDate});

    const _handleConfirmation = () => {
        window?.localStorage.setItem('shippingSetting', JSON.stringify(fields));
        navigate('confirmation');
    }

    return (
        <div>
            <Drawer open={isOpen} goBack={() => setOpen(false)} closeOnOverlay title="Complément de la commande">
                <div className={classes.container}>
                    <div className={classes.content}>
                        <Text styles={{ containerText: classes.titleText }} textCenter >Veuillez remplir les deux formulaires :</Text>
                        <TextField name="shippingAddress" onChange={(e) => setFields({...fields, shippingAddress: e.target.value})} styles={{ root: classes.selectShipping }} variant='select' label="Mon lieu de livraison">
                            <option value=''>Selectionner un lieu de livraison</option>
                            {shippingSites.map((item, index) => <option selected={item === currentUser?.shippingAddress} key={index} value={item}>{capitalizeFirstLetter(item)}</option>)}
                        </TextField>
                        <TextField type="datetime-local" value={fields?.shippingDate} styles={{ root: classes.selectShipping }} name="shippingDate" onChange={(e) => setFields({...fields, shippingDate: e.target.value})} label="Date de livraison"/>
                    </div>
                    <div className={classes.cta}>
                        <Button textLabel='Suivant' onClick={_handleConfirmation} variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default OrderSetting
