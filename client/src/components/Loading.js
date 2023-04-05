import { IconLoader2 } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        height: ({forDrawer}) => forDrawer ? 'calc(100vh - 82px)' : '100vh',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#FFFFFF',
        zIndex: 10000
    },
	spinner: {
        animation: 'spin 1s infinite linear',
        marginTop: 8
	},
}));

const Loading = props => {
    const { forDrawer } = props;
    const classes = useStyles({ forDrawer })
    return (
        <div className={classes.container}>
            <div>Chargement </div>
            <IconLoader2 className={classes.spinner} />
        </div>
    )
}

export default Loading
