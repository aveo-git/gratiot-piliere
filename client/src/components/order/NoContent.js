import React from 'react'
import { IconError404, IconPackageOff, IconShoppingCartX } from '@tabler/icons-react'
import { createUseStyles } from 'react-jss';
import Text from '../Text';

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 150px)',
        '& svg': {
            width: 60,
            height: 60,
            strokeWidth: 1,
            marginBottom: 10
        }
	},
}));

const NoContent = props => {
    const { For } = props;
    const classes = useStyles()
    let content;
    switch(For) {
        case 'order':
            content = { icon: <IconShoppingCartX />, text: "Vous n'avez pas de commande" }
            break;
        case 'product':
            content = { icon: <IconPackageOff />, text: "Le produit n'existe pas ou n'a jamais éxisté" } 
            break;
        default:
            content = { icon: <IconError404 />, text: "Une erreur s'est produite" } 
            break
    }
    return <div className={classes.container}>
        {content?.icon}
        <Text>{content?.text}</Text>
    </div>;
}

export default NoContent
