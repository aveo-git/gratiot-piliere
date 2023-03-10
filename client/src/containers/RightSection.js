import { IconMapSearch, IconPlugConnected, IconShoppingCart } from '@tabler/icons-react';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useGetProducts } from '../api/product.api';
import imageCategorieBG from '../Assets/images/categorie.jpg';
import Button from '../components/Button';
import CategoryItem from '../components/CategoryItem';
import Divider from '../components/Divider';
import Text from '../components/Text';
import ProductItem from './product/ProductItem';

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
        width: 158
    },
    buttonShipping: {
        width: 206
    },
    cta: {
        display: 'flex',
        gap: 25,
        alignItems: 'center'
    }
}));

const RightSection = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { products } = useGetProducts()

    const _handleLogin = () => {
        navigate('/login')
    }

    const _handleSignin = () => {
        navigate('/signin')
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
                <Button onClick={_handleLogin} styles={{ container: classes.buttonLogin }} textLabel='Se connecter' variant='primary' icon={<IconPlugConnected/>} />
                <Button onClick={_handleSignin} styles={{ container: classes.buttonSignin }} textLabel='Pas encore inscrit ?' />
            </div>
            <div>
                <div className={classes.categories}>
                    <Text styles={{ containerText: classes.sectionTitle }} variant='h3'>Catégories</Text>
                    <div className={classes.catItem}>
                        {[1, 2, 3, 4, 5, 6].map(item => <CategoryItem imageUrl={imageCategorieBG} />)}
                    </div>
                </div>
                <div>
                    <Text styles={{ containerText: classes.sectionTitle, subtitle: classes.sectionSubtitle }} variant='h3' subtitle='Nos meilleurs ventes'>Nos meilleurs ventes</Text>
                    <div className={classes.productsItem}>
                        {products.slice(0, 4).map(product =>  <ProductItem product={product} />)}
                    </div>
                </div>
            </div>
            <div className={classes.cta}>
                <Button variant='primary' textLabel='Voir nos offres' icon={<IconShoppingCart/>} styles={{ container: classes.buttonShop }} />
                <Button variant='primary' textLabel='Nos points de livraison' icon={<IconMapSearch/>} styles={{ container: classes.buttonShipping }} />
                <Divider />
            </div>
        </div>
    )
}

export default RightSection
