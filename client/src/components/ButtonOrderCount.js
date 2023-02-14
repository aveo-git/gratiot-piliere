import React from 'react'
import { createUseStyles } from 'react-jss';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
	root: {
		fontFamily: 'Inter-Medium',
        fontSize: 13,
        width: 85,
		justifyContent: 'center',
        height: ({size}) => size === 'medium' ? 44 : 35,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            width: 15,
            height: 15,
        }
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
	textLabel: {
		margin: '0 10px'
	},
	icon: {
		cursor: 'pointer',
		position: 'relative',
		top: 2
	}
}));

const ButtonOrderCount = props => {
    const { text, variant = 'default', size = 'small', iconLeft = <IconArrowLeft/>, iconRight = <IconArrowRight/>, handleMinus, handlePlus } = props;
	const classes = useStyles({text, size })
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
		<div className={classNames(classes.root, classForVariant)}>
      		<span className={classes.icon} onClick={handleMinus}>{iconLeft}</span>
			<span className={classes.textLabel}>{text}</span>
      		<span className={classes.icon} onClick={handlePlus}>{iconRight}</span>
		</div>
	)
}

export default ButtonOrderCount
