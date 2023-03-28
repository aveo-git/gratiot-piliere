import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
	root: {
        width: 255
	},
    input: {
        height: 40,
        border: 'none',
        padding: '0 20px',
        fontFamily: 'Inter-Regular',
        fontSize: 13,
        width: 288,
        backgroundColor: '#F3F3F3',
        marginBottom: 22,
        '&:focus': {
            outline: 'none'
        },
        mozAppearance: 'none', /* Firefox */
        webkitAppearance: 'none', /* Safari and Chrome */
        appearance: 'none'
    },
    label: {
        fontSize: 13,
        marginBottom: 4
    }
}));

const TextField = props => {
    const { placeholder = 'Entrer votre texte', name, type = 'input', label, readOnly, value, onChange, children } = props;
    const classes = useStyles();

    let content;
    switch (type) {
        case 'select':
            content = <select name={name} onChange={onChange} className={classes.input}>
                {children}
            </select>
            break;
        case 'input':
            content = <input readOnly={readOnly && "readonly"} name={name} onChange={onChange} className={classes.input} placeholder={placeholder} type={type} value={value} />
            break;
        default:
            break;
    }
    if(type === 'select') {
    }
    return (
        <div className={classes.root}>
            {label && <div className={classes.label}>{label}</div>}
            {content}
        </div>
    )
}

export default TextField

export const fakeData = [
    {firstName: 'Rasoa', lastName: 'Kininika', age: 50},
    {firstName: 'Benja', lastName: 'Nirina', age: 45},
]
