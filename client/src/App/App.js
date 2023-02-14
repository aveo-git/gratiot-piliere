import React, { useState } from 'react'
import Button from '../components/Button'
import ButtonOrderCount from '../components/ButtonOrderCount'
import Input from '../components/Input'
import ModalComp from '../components/Modal'
import { padWithLeadingZeros } from '../components/utils'

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

  const _closeModal = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={_openModal}/>
      <hr />
      <ButtonOrderCount text={padWithLeadingZeros(count)} variant='primary' handleMinus={_handleMinus} handlePlus={_handlePlus} />
      <hr />
      <Input/>
      <ModalComp open={open} closeModal={_closeModal} title='Se connecter' closeOnOverlay>
        Content here
      </ModalComp>
    </div>
  )
}

export default App

