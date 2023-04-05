import { IconDownload } from '@tabler/icons-react';
import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useUserLogout } from '../api/user.api';

const useStyles = createUseStyles(theme => ({
	root: {
        padding: '18px 18px',
        borderWidth: ({isFirstItem}) => isFirstItem ? '1px 0' : '0 0 1px 0',
        borderColor: '#E4E4E4',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        cursor: ({disabled}) => disabled ? 'not-allowed' : 'pointer',
        opacity: ({disabled}) => disabled ? 0.3 : 1 ,
        '&:hover': {
            backgroundColor: ({disabled}) => !disabled && '#FAF4FF',
            color: ({disabled}) => !disabled && '#5600A5'
        }
	},
    icon: {
        display: 'inherit',
        width: 18,
        marginRight: 10
    },
    download: {
        marginLeft: 'auto'
    }
}));

const MenuItem = props => {
    const { icon, title, to, isFirstItem, disabled = false, downloaded, styles } = props
    const classes = useStyles({disabled, isFirstItem})
    const { mutate: userLogout } = useUserLogout()
    const navigate = useNavigate()

    const _handleRoot = () => {
        if(to === 'logout') {
            userLogout()
            navigate(-1)
        } else {
            navigate(to)
        }
    }

    return (
        <div className={classNames(classes.root, styles?.root)} onClick={_handleRoot} >
            <span className={classes.icon}>{icon}</span><span>{title}</span>{downloaded && <span className={classes.download}><IconDownload/></span>}
        </div>
    )
}

export default MenuItem
