import React from 'react'
import { IconShoppingCartX } from '@tabler/icons-react'
import { createUseStyles } from 'react-jss';
import Text from '../Text';

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},
    iconNoOrder: {
        width: 60,
        height: 60,
        strokeWidth: 1,
        marginBottom: 10
    }
}));

const NoOrders = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <IconShoppingCartX className={classes.iconNoOrder} />
            <Text>Vous n'avez pas de commande</Text>
        </div>
    )
}

export default NoOrders
