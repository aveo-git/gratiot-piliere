import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
    container: {
        width: 157,
        height: 56,
        backgroundColor: 'red',
        color: '#FFFFFF',
        backgroundImage: ({imageUrl}) => imageUrl && `url(${imageUrl})`,
        backgroundSize: 'cover',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        fontFamily: 'Inter-Regular'
    },
}));

const CategoryItem = props => {
    const { imageUrl } = props
    const classes = useStyles({imageUrl})

    return (
        <div className={classes.container}>
            CatEGORIE 1
        </div>
    )
}

export default CategoryItem
