import { IconDownload } from '@tabler/icons-react';
import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserLogout } from '../api/user.api';
import { translateState } from '../misc/utils';

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
    },
    state: {
        fontSize: 12,
        position: 'relative',
        right: 15,
        bottom: 5
    },
    canceled: {
        color: '#ff4209'
    },
    paid: {
        color: '#000000'
    }
}));

const MenuItem = props => {
    const { icon, title, to, isFirstItem, disabled = false, downloaded, status, styles } = props;
    const classes = useStyles({disabled, isFirstItem});
    const { mutate: userLogout } = useUserLogout();
    const navigate = useNavigate();
    const location = useLocation();
    let stateLabel = translateState(status);
    let stateColorClass = '';
    switch(status) {
        case 'canceled':
            stateColorClass = classes.canceled;
            break;
        case 'paid':
            stateColorClass = classes.paid;
            break;
        default:
            stateColorClass = '';
            break;
    }

    const _handleRoot = () => {
        window?.localStorage.setItem('lastPathname', location.pathname)
        if(to === 'logout') {
            userLogout();
            navigate(-1);
        } else {
            !disabled && navigate(to);
        }
    }

    return (
        <div className={classNames(classes.root, styles?.root)} onClick={_handleRoot} >
            <span className={classes.icon}>{icon}</span><span>{title}</span><span className={classes.download}><span className={classNames(classes.state, stateColorClass)}>{stateLabel}</span>{downloaded && <IconDownload/>}</span>
        </div>
    )
}

export default MenuItem
