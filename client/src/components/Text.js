import React from 'react'
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles(theme => ({
    root: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        textDecoration: 'none',
    },
	default: {
		fontSize: 14,
        fontFamily: 'Inter-Regular'
	},
    h1: {
        fontSize: 80,
        fontFamily: 'Poppins-Bold'
    },
    h2: {
        fontSize: 40,
        fontFamily: 'Poppins-Bold'
    },
    h3: {
        fontSize: 20,
        fontFamily: 'Poppins-Bold'
    },
    link: {
        color: '#000000'
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#000000'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    center: {
        textAlign: 'center'
    }
}));

const Text = props => {
    const { variant = 'default', isLink, to, onClick, children, subtitle, isUpperCase = false, textCenter = false, styles } = props;
    const classes = useStyles()

    let className = classes.default
    switch (variant) {
        case 'h1':
            className = classes.h1
            break;
        case 'h2':
            className = classes.h2
            break;
        case 'h3':
            className = classes.h3
            break;
        default:
            break;
    }

    if(isLink) {
        className = classes.link
        return <Link to={to} className={classNames(classes.root, className, styles?.containerText, isUpperCase && classes.uppercase, textCenter && classes.center)}>
            {children}
        </Link>
    }

    return (
        <div className={classNames(classes.root, className, styles?.containerText, isUpperCase && classes.uppercase, textCenter && classes.center)} onClick={onClick} >
            { children }
            {subtitle && <div className={classNames(classes.subtitle, styles?.subtitle)}>{ subtitle }</div>}
        </div>
    )
}

export default Text
