import React from 'react'
import { createUseStyles } from 'react-jss';
import { CURRENCY, getTotal, toDecimal, VAT } from '../../misc/utils';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
  container: {
      '& span': {
        fontFamily: 'Inter-Bold'
      }
  },
}));

const BillTotalResume = props => {
  const { styles, cart } = props
  const classes = useStyles()
  const currency = CURRENCY;
  const totalTTC = getTotal(cart)
  const totalHT = getTotal(cart, true)

  return (
    <div className={classNames(classes.container, styles?.other)}>
      <div>Total TTC : <span>{totalTTC} {currency}</span></div>
      <div>TVA - {VAT}% : <span>{toDecimal(totalTTC - totalHT)} {currency}</span></div>
      <div>Total HC : <span>{toDecimal(totalHT)} {currency}</span></div>
    </div>
  )
}

export default BillTotalResume
