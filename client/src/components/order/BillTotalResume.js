import React from 'react'
import { useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { getTotal, toDecimal, VAT } from '../../misc/utils';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
  container: {
      '& span': {
        fontFamily: 'Inter-Bold'
      }
  },
}));

const BillTotalResume = props => {
  const { styles } = props
  const classes = useStyles()
  const { orders } = useSelector(state => state.orders);
  const { data } = orders;
  const { currency } = useSelector(state => state.currency);
  const totalTTC = getTotal(data)
  const totalHT = getTotal(data, true)

  return (
    <div className={classNames(classes.container, styles?.other)}>
      <div>Total TTC : <span>{totalTTC} {currency.symbol}</span></div>
      <div>TVA - {VAT}% : <span>{toDecimal(totalTTC - totalHT)} {currency.symbol}</span></div>
      <div>Total HC : <span>{toDecimal(totalHT)} {currency.symbol}</span></div>
    </div>
  )
}

export default BillTotalResume
