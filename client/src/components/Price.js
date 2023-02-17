import React from 'react'
import { createUseStyles } from 'react-jss';
import { getPriceAfter, getPriceBefore } from './utils';

const useStyles = createUseStyles(theme => ({
	container: {
        fontFamily: 'Domine-Bold',
        fontSize: 28,
        position: 'relative',
        width: 'fit-content'
	},
    centime: {
        position: 'relative',
        fontSize: 17
    },
    currency: {
        position: 'absolute',
        top: '-15px',
        left: 0,
        fontSize: 14
    }
}));

const Price = props => {
    const { price, currency = '€', styles }  = props;
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
