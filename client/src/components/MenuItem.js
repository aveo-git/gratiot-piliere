import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
	root: {
        padding: '18px 18px',
        borderWidth: ({isFirstItem}) => isFirstItem ? '1px 0' : '0 0 1px 0',
        borderColor: '#E4E4E4',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        cursor: ({data}) => data.disabled ? 'not-allowed' : 'pointer',
        opacity: ({data}) => data.disabled ? 0.3 : 1 ,
        '&:hover': {
            backgroundColor: ({data}) => !data.disabled && '#FAF4FF',
            color: ({data}) => !data.disabled && '#5600A5'
        }
	},
    icon: {
        display: 'inherit',
        width: 18,
        marginRight: 10
    }
}));

const MenuItem = props => {
    const { data, isFirstItem } = props
    const classes = useStyles({data, isFirstItem})

    const _handleRoot = () => {
        console.log('link:', data.to)
    }

    return (
        <div className={classes.root} onClick={_handleRoot} >
            <span className={classes.icon}>{data.icon}</span><span>{data.title}</span>
        </div>
    )
}

export default MenuItem
