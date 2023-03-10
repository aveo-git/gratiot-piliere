import { IconPlugConnected } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Text from '../components/Text'
import Filtre from '../containers/Filtre'
import ProductDisplay from '../containers/ProductDisplay'
import { WIDTH_RIGHT_SECTION } from '../misc/utils'

const useStyles = createUseStyles(theme => ({
    root: {
        padding: 45,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 90px)'
    },
    header: {
        display: 'flex',
        position: 'relative',
        height: 100
    },
    logo: {
        width: 46,
        height: 46,
        borderRadius: 13,
        backgroundColor: '#B7B7B7'
    },
    buttons: {
        width: 'fit-content',
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'flex'
    },
    sectionTitle: {
        color: '#98244D',
    },
    logoContent: {
        width: WIDTH_RIGHT_SECTION
    },
    content: {
        display: 'flex'
    }
}))

const ProductPlanner = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const _handleLogin = () => {
        navigate('/login')
    }

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.logoContent}>
                    <div className={classes.logo}></div>
                </div>
                <Text styles={{ containerText: classes.sectionTitle }} variant='h3' subtitle='Vous trouverez ici les meilleurs produits du mois.'>Nos produits</Text>
                <div className={classes.buttons}>
                    <Button styles={{ container: classes.buttonSignin }} textLabel='Pas encore inscrit ?' />
                    <Button onClick={_handleLogin} styles={{ container: classes.buttonLogin }} textLabel='Se connecter' variant='primary' icon={<IconPlugConnected/>} />
                </div>
            </div>
            <div className={classes.content}>
                <Filtre/>
                <ProductDisplay />
            </div>
        </div>
    )
}

export default ProductPlanner
