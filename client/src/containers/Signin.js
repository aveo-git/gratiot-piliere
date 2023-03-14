import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input'
import ModalComp from '../components/Modal'

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
}));

const Signin = () => {
    const [openSignin, setOpen] = useState(false)
    const classes = useStyles()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(location.pathname === '/signin') setOpen(true)
    }, [location.pathname])

    const _closeModal = () => {
        setOpen && setOpen(false)
        navigate('/')
    }

    return (
        <ModalComp open={openSignin} closeModal={_closeModal} title="S'inscrire">
            <Input label="Nom"/>
            <Input label="Prénom"/>
            <Input label="Adresse électronique"/>
            <Input label="Téléphone"/>
            <Input label="Adresse"/>
            <Input label="Mot de passe"/>
            <Input label="Confirmation"/>
            <Button variant='primary' textLabel="S'inscrire" styles={{container: classes.container}}/>
            <Button variant='primary' textLabel="J'ai déjà un compte" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Signin
