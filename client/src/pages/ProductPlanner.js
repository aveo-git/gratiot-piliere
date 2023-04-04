import { IconUser } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useGetProducts } from '../api/product.api'
import { isUserLogged } from '../api/user.api'
import Button from '../components/Button'
import CartButton from '../components/CartButton'
import Text from '../components/Text'
import Filtre from '../containers/Filtre'
import LoginComp from '../containers/LoginComp'
import ProductDisplay from '../containers/ProductDisplay'
import { WIDTH_RIGHT_SECTION } from '../misc/utils'
import logo from '../Assets/images/logo-champagne-gratiot.png'

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
        backgroundColor: '#f1f1f1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            width: 'inherit'
        }
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
    const isLogged = isUserLogged()
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

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <div className={classes.logoContent}>
                    <Link to='/' className={classes.logo}>
                        <img src={logo} alt="logo gratiot" />
                    </Link>
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
                <Filtre />
                <ProductDisplay products={products} />
            </div>
            <Outlet/>
        </div>
    )
}

export default ProductPlanner
