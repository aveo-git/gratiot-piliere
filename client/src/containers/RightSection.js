import { IconPlugConnected } from '@tabler/icons-react';
import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button';
import CategoryItem from '../components/CategoryItem';
import Text from '../components/Text'
import imageCategorieBG from '../Assets/images/categorie.jpg'

const useStyles = createUseStyles(theme => ({
    root: {
        position: 'relative'
    },
    subtitle: {
        width: 500
    },
    title: {
        height: 150
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
        // justifyContent: 'space-between',
        gridGap: 25
    }
}));

const RightSection = () => {
    const classes = useStyles()
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
                <Button styles={{ container: classes.buttonLogin }} textLabel='Se connecter' variant='primary' icon={<IconPlugConnected/>} />
                <Button styles={{ container: classes.buttonSignin }} textLabel='Pas encore inscrit ?' />
            </div>
            <div className={classes.categories}>
                <Text styles={{ containerText: classes.sectionTitle }} variant='h3'>Catégories</Text>
                <div className={classes.catItem}>
                    {[1, 2, 3, 4, 5, 6].map(item => <CategoryItem imageUrl={imageCategorieBG} />)}
                </div>
            </div>
            <div>
                <Text styles={{ containerText: classes.sectionTitle }} variant='h3'>Catégories</Text>
                <div className={classes.catItem}>
                    {[1, 2, 3, 4, 5, 6].map(item => <CategoryItem imageUrl={imageCategorieBG} />)}
                </div>
            </div>
        </div>
    )
}

export default RightSection
