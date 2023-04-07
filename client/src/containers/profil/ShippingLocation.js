import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import TextField from '../../components/TextField';

import imageMap from '../../Assets/images/map-reunion.png'
import { capitalizeFirstLetter } from '../../misc/utils';
import { getShippingAdressUser, useSetShippingAddressUser } from '../../api/user.api';
import { useGetsnackBarStatus } from '../../api/snackbar.api';
import Snackbar from '../../components/Snackbar';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    content: {
        height: 'calc(100vh - 150px)',
    },
    title: {
        padding: '0 50px',
        textAlign: 'center',
        marginBottom: 50
    },
    formAddress: {
        '& input': {
            width: 348
        }
    },
    map: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
        height: 350,
        backgroundImage: ({ imageMap }) => imageMap && `url(${imageMap})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    selectShipping: {
        width: 388
    },
    shippingAddress: {
        border: '1px solid #000000',
        padding: '3px 10px'
    },
    error: {
        color: '#ff4209',
        position: 'relative',
        top: '-18px',
        left: 18
    }
}));

const ShippingLocation = props => {
    const [shippingAddress, setShippingAddress] = useState(getShippingAdressUser());
    const [error, setError] = useState(false);
    const { mutate: setShippingAddressUser } = useSetShippingAddressUser();
    const snackbar = useGetsnackBarStatus();
    const navigate = useNavigate();
    const classes = useStyles({imageMap});

    const _goBack = () => {
        navigate(-1)
    }
    
    const _handleCategory = (e) => {
        setShippingAddress(e.target.value);
    }

    const _handleSetShippingAddress = (e) => {
        e.preventDefault();
        if(e.target[0].value !== '') {
            setShippingAddressUser(e.target[0].value);
            setError(false);
        } else setError(true);
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Lieu de livraison">
                <div className={classes.container}>
                    <form onSubmit={_handleSetShippingAddress}>
                    <div className={classes.content}>
                        <div className={classes.title}>
                            {!!shippingAddress ? <>
                                Votre point de livraison : <br /><br />
                                <span className={classes.shippingAddress}>{shippingAddress.toUpperCase()}</span>
                            </> : 'Vous n\'avez pas encore choisi un lieu de livraison.'}
                        </div>
                        <div className={classes.formAddress}>
                            <TextField name="shippingAddress" onChange={_handleCategory} styles={{ select: classes.selectShipping }} variant='select' label="Mon lieu de livraison">
                                <option value=''>Selectionner un lieu de livraison</option>
                                {shippingSites.map((item, index) => <option key={index} value={item}>{capitalizeFirstLetter(item)}</option>)}
                            </TextField>
                            {error && <div className={classes.error}>Veuillez choisir un lieu de livraison.</div>}
                            <div className={classes.map}></div>
                        </div>
                    </div>
                    <div className={classes.cta}>
                        <Button textLabel='Valider' isSubmitable variant='primary' />
                    </div>
                    </form>
                </div>
            </Drawer>
            {snackbar?.status && <Snackbar text={snackbar?.message} variant='primary' />}
        </div>
    )
}

export default ShippingLocation

export const shippingSites = ['Bras-Panon', 'Entre-Deux', 'L\'Etang-Salé', 'La plaine-des-Palmistes', 'Le port', 'Les Avirons', ]
