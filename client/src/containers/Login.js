import React from 'react'
import Input from '../components/Input'
import ModalComp from '../components/Modal'

const Login = props => {
    const { open, setOpen } = props;

    const _closeModal = () => {
        setOpen && setOpen(false)
    }

    return (
        <ModalComp open={open} closeModal={_closeModal} title='Se connecter' closeOnOverlay>
            <Input label="Adresse électronique"/>
            <Input label="Mot de passe"/>
            Content here
        </ModalComp>
    )
}

export default Login
