import React, { useState } from 'react'
import Button from '../components/Button'
import ButtonOrderCount from '../components/ButtonOrderCount'
import Input from '../components/Input'
import { padWithLeadingZeros } from '../components/utils'
import Login from '../containers/Login'

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

  const _openModal = () => {
    setOpen(true)
  }

  return (
    <div>
      <Button onClick={_openModal}/>
      <hr />
      <ButtonOrderCount text={padWithLeadingZeros(count)} variant='primary' handleMinus={_handleMinus} handlePlus={_handlePlus} />
      <hr />
      <Input/>
      <Login open={open} setOpen={setOpen} />
    </div>
  )
}

export default App

