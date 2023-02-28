import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import ButtonOrderCount from '../components/order/ButtonOrderCount'
import Text from '../components/Text'
import { minifyId, padWithLeadingZeros } from '../components/utils'
import OrderCart from '../containers/order/OrderCart'

import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import OrderConfirmation from '../containers/order/OrderConfirmation'
import { actionForModal } from '../redux/actions/modals'
import { addOrder } from '../redux/actions/order'
import OrderPaid from '../containers/order/OrderPaid'
import MyProfil from '../containers/MyProfil'

const App = () => {

  const [count, setCount] = useState(0)
  const { modals } = useSelector(state => state.modals)

  const dispatch = useDispatch()

  const _handleMinus = () => {
    if(count <= 0) setCount(0)
    else setCount(count - 1)
  }

  const _handlePlus = () => {
    dispatch(addOrder(minifyId(uuidv4())))
  }

  const _openModalLogin = () => {
    // setOpen(true)
  }

  const _handleModalOrder = () => {
    dispatch(actionForModal({type: 'ORDER', status: 'open'}))
  }

  const _handleModalProfil = () => {
    dispatch(actionForModal({type: 'PROFIL', status: 'open'}))
  }

  const _closeModal = () => {
    // dispatch(actionForModal({type: 'ORDER', status: 'close'}))
    dispatch(actionForModal({type: 'PROFIL', status: 'close'}))
  }

  return (
    <div>
      <Button onClick={_openModalLogin}/>
      <hr />
      <Button onClick={_handleModalProfil}/>
      <hr />
      <ButtonOrderCount text={padWithLeadingZeros(count)} variant='primary' handleMinus={_handleMinus} handlePlus={_handlePlus} />
      <hr />
      <Input/>
      {/* <Signin open={open} setOpen={setOpen} /> */}
      {/* <Login open={open} setOpen={setOpen} /> */}
      {/* <Confirmation open={open} setOpen={setOpen} /> */}
      {/* <Renewall open={open} setOpen={setOpen} /> */}
      {/* <SendLink open={open} setOpen={setOpen} /> */}
      {/* <ConfirmationDone open={open} setOpen={setOpen} /> */}
      <OrderCart open={modals.order} closeModal={_closeModal} />
      <OrderConfirmation />
      <OrderPaid />
      <MyProfil open={modals.profil} closeModal={_closeModal} />
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
    </div>
  )
}

export default App

