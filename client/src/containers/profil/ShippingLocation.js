import React from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import TextField from '../../components/TextField';

import imageMap from '../../Assets/images/map-reunion.png'

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
        overflow: 'hidden'
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
}));

const ShippingLocation = props => {
    const classes = useStyles()
    const navigate = useNavigate()

    const _goBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Lieu de livraison">
                <div className={classes.container}>
                    <div className={classes.content}>
                        <div className={classes.title}>
                            Vous serez livré au : <br />
                            RUE, LES AVIRONS 1120
                        </div>
                        <div className={classes.formAddress}>
                            <TextField label="Mon lieu de livraison"/>
                            <div className={classes.map}>
                                <img src={imageMap} alt='map la reunion'/>
                            </div>
                        </div>
                    </div>
                    <div className={classes.cta}>
                        <Button textLabel='Valider' variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default ShippingLocation
