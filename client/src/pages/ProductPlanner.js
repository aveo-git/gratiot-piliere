import { IconUser } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useGetProducts } from '../api/product.api'
import Button from '../components/Button'
import CartButton from '../components/CartButton'
import Text from '../components/Text'
import Filtre from '../containers/Filtre'
import LoginComp from '../containers/LoginComp'
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
        backgroundColor: '#B7B7B7',
        display: 'inline-block'
    },
    buttons: {
        width: 'fit-content',
        position: 'absolute',
        right: 0,
        top: 0,
        display: 'flex'
    },
    buttonUser: {
        width: 25,
        marginLeft: 15
    },
    icon: {
        marginLeft: 0,
        '& svg': {
            width: 20,
            height: 20
        }
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
    const { products } = useGetProducts() || []
    const navigate = useNavigate()

    const _handleLogin = () => {
        navigate('login')
    }

    const _handleCart = () => {
        navigate('cart')
    }

    const _handleSignin = () => {
        navigate('signin')
    }

    const _handleProfil = () => {
        navigate('profil')
    }

    const isLogged = true;

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.logoContent}>
                    <Link to='/' className={classes.logo}></Link>
                </div>
                <Text styles={{ containerText: classes.sectionTitle }} variant='h3' subtitle='Vous trouverez ici les meilleurs produits du mois.'>Nos produits</Text>
                <div className={classes.buttons}>
                    {isLogged ? 
                        <><CartButton handleCart={_handleCart} /> <Button variant='primary' onClick={_handleProfil} icon={<IconUser/>} styles={{ container: classes.buttonUser, icon: classes.icon }} /></> : 
                        <LoginComp handleLogin={_handleLogin} handleSignin={_handleSignin} />
                    }
                </div>
            </div>
            <div className={classes.content}>
                <Filtre products={products} />
                <ProductDisplay products={products} />
            </div>
            <Outlet/>
        </div>
    )
}

export default ProductPlanner
