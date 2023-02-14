import React from 'react'
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(theme => ({
	root: {
        width: 255
	},
    input: {
        height: 35,
        border: 'none',
        padding: '0 20px',
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        width: '100%',
        '&:focus': {
            outline: 'none'
        }
    }
}));

const Input = props => {
    const { placeholder = 'Entrer votre texte', type = 'select', contentOptions = fakeData } = props;
    const classes = useStyles();
    if(type === 'select') {
        return <select name="select"  className={classes.input}>
            {contentOptions.map(item => <option>{item.lastName}</option>)}
        </select>
    }
    return (
        <div className={classes.root}>
            <input className={classes.input} placeholder={placeholder} type={type} />
        </div>
    )
}

export default Input

export const fakeData = [
    {firstName: 'Rasoa', lastName: 'Kininika', age: 50},
    {firstName: 'Benja', lastName: 'Nirina', age: 45},
]
