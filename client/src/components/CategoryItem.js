import React from 'react'
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles(theme => ({
    container: {
        width: 157,
        height: 56,
        color: '#FFFFFF',
        backgroundImage: ({imageUrl}) => imageUrl && `url(${imageUrl})`,
        backgroundSize: 'cover',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        textDecoration: 'none'
    },
}));

const CategoryItem = props => {
    const { imageUrl } = props
    const classes = useStyles({imageUrl})

    return (
        <Link className={classes.container}>
            CatEGORIE 1
        </Link>
    )
}

export default CategoryItem
