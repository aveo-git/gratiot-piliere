import React from 'react'
import { useSelector } from 'react-redux';
import { getTotalHT, getTotalTTC, VAT } from '../utils';

const BillTotalResume = () => {
  const { orders } = useSelector(state => state.orders);
  const { currency } = useSelector(state => state.currency);
  const totalTTC = getTotalTTC(orders)
  const totalHT = getTotalHT(orders)

  return (
    <div>
      <div>Total TTC : <span>{totalTTC} {currency.symbol}</span></div>
      <div>TVA - {VAT}% : <span>{totalTTC - totalHT}</span></div>
      <div>Total HC : <span>{totalHT}</span></div>
    </div>
  )
}

export default BillTotalResume
