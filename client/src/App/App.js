import React, { useState } from 'react'
import Button from '../components/Button'
import ButtonOrderCount from '../components/order/ButtonOrderCount'
import Input from '../components/Input'
import Text from '../components/Text'
import { padWithLeadingZeros } from '../components/utils'
import OrderCart from '../containers/OrderCart'

import { useDispatch } from 'react-redux'
import { addOrder } from '../redux/store'
import { v4 as uuidv4 } from 'uuid'

const App = () => {

  const [count, setCount] = useState(0)
  const [open, setOpen] =  useState(false)

  const dispatch = useDispatch()

  const _handleMinus = () => {
    if(count <= 0) setCount(0)
    else setCount(count - 1)
  }

  const _handlePlus = () => {
    dispatch(addOrder(uuidv4().split('-')[0]))
  }

  const _openModalLogin = () => {
    setOpen(true)
  }

  const _openModalSignin = () => {
    setOpen(true)
  }

  return (
    <div>
      <Button onClick={_openModalLogin}/>
      <hr />
      <Button onClick={_openModalSignin}/>
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
      <OrderCart open={open} closeModal setOpen={setOpen} />
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
    </div>
  )
}

export default App

