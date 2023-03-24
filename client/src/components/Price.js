import React from 'react'
import { createUseStyles } from 'react-jss';
import { CURRENCY, getPriceAfter, getPriceBefore } from '../misc/utils';

const useStyles = createUseStyles(theme => ({
	container: {
        fontFamily: 'Domine-Bold',
        fontSize: 25,
        position: 'relative',
        width: 'fit-content'
	},
    centime: {
        position: 'relative',
        fontSize: 15
    },
    currency: {
        position: 'absolute',
        top: '-13px',
        left: 0,
        fontSize: 12
    }
}));

const Price = props => {
    const { price, currency = CURRENCY }  = props;
    const classes = useStyles()

    const before = getPriceBefore(price)
    const after = getPriceAfter(price)

    return (
        <div className={classes.container} >
            <div>
                <span>{before}</span><span className={classes.centime}>,{after}<span className={classes.currency}>{currency}</span></span>
            </div>
        </div>
    )
}

export default Price
