import { IconMapSearch, IconShoppingCart, IconUser } from '@tabler/icons-react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'

import { useGetAllCategories, useGetProducts } from '../api/product.api';
import { isUserLogged } from '../api/user.api';
import imageCategorieBG from '../Assets/images/categorie.jpg';
import Button from '../components/Button';
import CategoryItem from '../components/CategoryItem';
import Divider from '../components/Divider';
import Text from '../components/Text';
import LoginComp from './LoginComp';
import ProductItem from './product/ProductItem';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },
    subtitle: {
        width: 500
    },
    buttons: {
        width: 'fit-content',
        position: 'absolute',
        right: 0,
        top: 0
    },
    buttonLogin: {
        width: 150
    },
    buttonSignin: {
        paddingRight: 0,
        justifyContent: 'flex-end'
    },
    categories: {
        marginBottom: 30,
    },
    sectionTitle: {
        color: '#98244D',
        marginBottom: 10
    },
    catItem: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 154px)',
        gridGap: 25,
        height: 137,
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    productsItem: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 200px)',
        justifyContent: 'space-between',
        gridGap: 15,
        height: 380,
        overflow: 'hidden'
    },
    sectionSubtitle: {
        marginBottom: 20
    },
    buttonShop: {
        width: 178
    },
    buttonShipping: {
        width: 206
    },
    cta: {
        display: 'flex',
        gap: 25,
        alignItems: 'center'
    },
    buttonProfil: {
        width: 25
    },
    icon: {
        marginLeft: 0,
        '& svg': {
            width: 20,
            height: 20
        }
    },
    skeletonTitle: {
        height: 40,
        marginBottom: 20,
        width: 400
    },
    skeletonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 20,
        '& span': {
            display: 'inline-block',
            flex: 1
        }
    },
    skeletonChild: {
        height: 50,
        marginBottom: 15
    },
    skeletonChildProduct: {
        height: 230,
        marginBottom: 15
    }
}));

const RightSection = () => {
    const classes = useStyles()
    const { products, isLoading: isLoadingProducts } = useGetProducts() || []
    const { categories, isLoading: isLoadingCategories } = useGetAllCategories() || []
    const isLogged = isUserLogged();
    const navigate = useNavigate();

    const _handleLogin = () => {
        navigate('/login')
    }

    const _handleSignin = () => {
        navigate('/signin')
    }

    const _handleOurProducts = () => {
        navigate('/our-products')
    }

    const _handleProfil = () => {
        navigate('/my-profil')
    }

    const _handleShipping = () => {
        navigate('/my-profil/choise-shipping')
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Text variant='h2'>Bienvenue</Text>
                <Text styles={{ containerText: classes.subtitle }}>
                    Bonne dégustation…
                    Laissez-vous emporter par vos sens et profitez
                    pleinement des moments de convivialité !
                </Text>
            </div>
            <div className={classes.buttons}>
                {!!isLogged ? 
                <Button variant='primary' icon={<IconUser/>} onClick={_handleProfil} styles={{ container: classes.buttonProfil, icon: classes.icon }} /> : 
                <LoginComp handleLogin={_handleLogin} handleSignin={_handleSignin} />
                }
            </div>
            <div>
                <div className={classes.categories}>
                    <Text styles={{ containerText: classes.sectionTitle }} variant='h3'>Catégories</Text>
                    {isLoadingCategories ? 
                        <SkeletonComp classes={classes} typeFor='category' /> : 
                        <div className={classes.catItem}>
                            {categories.map(item => <CategoryItem key={item} text={item} imageUrl={imageCategorieBG} />)}
                        </div>
                    }
                </div>
                <div>
                    <Text styles={{ containerText: classes.sectionTitle, subtitle: classes.sectionSubtitle }} variant='h3' subtitle='Nos meilleurs ventes'>Nos meilleurs ventes</Text>
                    {isLoadingProducts ? 
                        <SkeletonComp classes={classes} typeFor='product' /> :
                        <div className={classes.productsItem}>
                            {products.slice(0, 4).map(product =>  <ProductItem key={product.id} product={product} />)}
                        </div>
                    }
                </div>
            </div>
            <div className={classes.cta}>
                <Button onClick={_handleOurProducts} variant='primary' textLabel='Voir nos produits' icon={<IconShoppingCart/>} styles={{ container: classes.buttonShop }} />
                <Button onClick={_handleShipping} variant='primary' textLabel='Nos points de livraison' icon={<IconMapSearch/>} styles={{ container: classes.buttonShipping }} />
                <Divider />
            </div>
        </div>
    )
}

export default RightSection

export const SkeletonComp = props => {
    const { classes, typeFor } = props
    return (
        <>
            <Skeleton className={classes.skeletonTitle} />
            <div className={classes.skeletonContainer}>
                <Skeleton className={classNames(typeFor === 'category' ? classes.skeletonChild : classes.skeletonChildProduct)} />
                <Skeleton className={classNames(typeFor === 'category' ? classes.skeletonChild : classes.skeletonChildProduct)} />
                <Skeleton className={classNames(typeFor === 'category' ? classes.skeletonChild : classes.skeletonChildProduct)} />
            </div>
            <Skeleton />
        </>
    )
}