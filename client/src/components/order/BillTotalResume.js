import React from 'react'
import { createUseStyles } from 'react-jss';
import { CURRENCY, getTotal, toDecimal, VAT } from '../../misc/utils';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
      '& span': {
        fontFamily: 'Inter-Bold'
      }
  },
  billAmount: {
    border: '1px solid #000000',
    width: 'fit-content',
    padding: '5px 15px',
    marginTop: 10,
  }
}));

const BillTotalResume = props => {
  const { styles, cart } = props;
  const classes = useStyles();
  const currency = CURRENCY;
  const totalTTC = getTotal(cart);
  const totalHT = getTotal(cart, true);

  return (
    <div className={classNames(classes.container, styles?.other)}>
      <div>TVA - {VAT}% : <span>{toDecimal(totalTTC - totalHT)} {currency}</span></div>
      <div>Total HC : <span>{toDecimal(totalHT)} {currency}</span></div>
      <div className={classes.billAmount}>Total TTC : <span>{totalTTC} {currency}</span></div>
    </div>
  )
}

export default BillTotalResume
