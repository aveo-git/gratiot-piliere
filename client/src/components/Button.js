import React from 'react'
import classeNames from 'classnames'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	root: {
		fontFamily: 'Inter-Medium',
        fontSize: 13,
        padding: '0px 15px',
        justifyContent: 'center',
        cursor: 'pointer',
        height: ({size}) => size === 'medium' ? 44 : 35,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            width: 15,
            height: 15,
        }
	},
    defaulticonPosition: {
        flexDirection: ({defaultIconPosition}) => defaultIconPosition ? 'row' : 'row-reverse'
    },
    btnDefault: {
        backgroundColor: '#FFFFFF'
    },
    btnPrimary: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #000000',
        color: '#000000',
        '&:hover': {
            backgroundColor: '#F3F3F3',
        }
    },
    icon: {
        position: 'relative',
        top: 2,
        margin: ({icon, defaultIconPosition}) => icon ? defaultIconPosition ? '0 0 0 10px' : '0 10px 0 0' : '0'
    },
    textLabel: {
        margin: ({icon}) => !icon && '0 10px',
        opacity: ({variant}) => variant === 'default' ? '0.7' :  '1',
        '&:hover': {
            opacity: 1,
        }
    }
}));

const Button = props => {
    const { textLabel = 'Voir plus', variant = 'default', size = 'medium', icon, defaultIconPosition = true, onClick, styles } = props;
    const classes = useStyles({icon, variant, size, defaultIconPosition})
    
    let classForVariant;
    switch(variant) {
        case 'default':
            classForVariant = classes.btnDefault
            break;
        case 'primary':
            classForVariant = classes.btnPrimary
            break;
        default:
            break;
    }

  return (
    <div className={classeNames(styles?.container, classes.root, classForVariant, classes.defaulticonPosition)} onClick={onClick}>
      <span className={classes.textLabel}>{textLabel}</span>
      <span className={classes.icon}>{icon}</span>
    </div>
  )
}

export default Button
