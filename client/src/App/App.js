import React, { useState } from 'react'
import Button from '../components/Button'
import ButtonOrderCount from '../components/order/ButtonOrderCount'
import Input from '../components/Input'
import Text from '../components/Text'
import { padWithLeadingZeros } from '../components/utils'
import OrderCart from '../containers/order/OrderCart'

import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { addOrder } from '../redux/actions/order'
import { closeModalOrder, openModalOrder } from '../redux/actions/modals'
import OrderConfirmation from '../containers/order/OrderConfirmation'

const App = () => {

  const [count, setCount] = useState(0)
  const { modal } = useSelector(state => state.modalOrder)

  const dispatch = useDispatch()

  const _handleMinus = () => {
    if(count <= 0) setCount(0)
    else setCount(count - 1)
  }

  const _handlePlus = () => {
    dispatch(addOrder(uuidv4().split('-')[0]))
  }

  const _openModalLogin = () => {
    // setOpen(true)
  }

  const _handleModalOrder = () => {
    dispatch(openModalOrder({closeModal: true}))
  }

  const _closeModal = (e) => {
    dispatch(closeModalOrder(e))
  }

  return (
    <div>
      <Button onClick={_openModalLogin}/>
      <hr />
      <Button onClick={_handleModalOrder}/>
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
      <OrderCart open={modal.open} closeModal setOpen={_closeModal} />
      <OrderConfirmation open={true} />
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
    </div>
  )
}

export default App

