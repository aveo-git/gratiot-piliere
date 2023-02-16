import React, { useState } from 'react'
import Button from '../components/Button'
import ButtonOrderCount from '../components/ButtonOrderCount'
import Input from '../components/Input'
import Text from '../components/Text'
import { padWithLeadingZeros } from '../components/utils'
import Renewall from '../containers/Renewall'
import SendLink from '../containers/SendLink'

const App = () => {

  const [count, setCount] = useState(0)
  const [open, setOpen] =  useState(false)

  const _handleMinus = () => {
    if(count <= 0) setCount(0)
    else setCount(count - 1)
  }

  const _handlePlus = () => {
    setCount(count + 1)
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
      <SendLink open={open} setOpen={setOpen} />
      {/* <ConfirmationDone open={open} setOpen={setOpen} /> */}
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
    </div>
  )
}

export default App

