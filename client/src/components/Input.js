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

const Input = props => {
    const { placeholder = 'Entrer votre texte', type = 'input', contentOptions = fakeData, label } = props;
    const classes = useStyles();

    let content;
    switch (type) {
        case 'select':
            content = <select name="select"  className={classes.input}>
                {contentOptions.map(item => <option>{item.lastName}</option>)}
            </select>
            break;
        case 'input':
            content = <input className={classes.input} placeholder={placeholder} type={type} />
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

export default Input

export const fakeData = [
    {firstName: 'Rasoa', lastName: 'Kininika', age: 50},
    {firstName: 'Benja', lastName: 'Nirina', age: 45},
]
