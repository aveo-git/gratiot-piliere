import React from 'react'
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
    root: {
        color: '#000000',
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        textDecoration: 'none'
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
    subtitle: {
        fontSize: 14,
        fontFamily: 'Inter-Regular'
    },
    uppercase: {
        textTransform: 'uppercase'
    }
}));

const Text = props => {
    const { variant = 'default', isLink, to, children, subtitle, isUpperCase = false, styles } = props;
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
        return <a href={to} className={classNames(classes.root, className, styles?.containerText, isUpperCase && classes.uppercase)}>
            {children}
        </a>
    }

    return (
        <div className={classNames(classes.root, className, styles?.containerText, isUpperCase && classes.uppercase)}>
            { children }
            {subtitle && <div className={classNames(classes.subtitle, styles?.subtitle)}>{ subtitle }</div>}
        </div>
    )
}

export default Text
