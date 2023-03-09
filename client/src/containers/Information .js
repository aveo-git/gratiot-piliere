import { IconPhoneOutgoing } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button';
import Text from '../components/Text'

const useStyles = createUseStyles(theme => ({
    root: {
        height: 450
    },
	description: {
        width: 390,
        paddingBottom: 20
	},
    cta: {
        width: 163
    }
}));

const Information  = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Text variant='h1'>Bienvenue</Text>
            <Text styles={{ containerText: classes.description }}>
                Nous souhaitons, à travers notre site,
                vous faire découvrir notre passion,
                notre esprit de famille et un savoir-faire de vignerons
                qui se transmet de génération en génération
                depuis plus de 3 siècles.
            </Text>
            <Text styles={{ containerText: classes.description }}>
                Bonne dégustation…
                Laissez-vous emporter par vos sens et profitez
                pleinement des moments de convivialité !
            </Text>
            <Button icon={<IconPhoneOutgoing/>} styles={{ container: classes.cta }} textLabel='Contactez-nous' />
        </div>
    )
}

export default Information 
