import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input'
import ModalComp from '../components/Modal'
import Text from '../components/Text';

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
    passwordLost: {
        textAlign: 'right',
        marginBottom: 35
    }
}));

const Login = () => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(location.pathname === '/login') setOpen(true)
    }, [location.pathname])

    const _closeModal = () => {
        setOpen && setOpen(false)
        navigate('/')
    }

    return (
        <ModalComp open={open} closeModal={_closeModal} title='Se connecter'>
            <Input label="Adresse électronique"/>
            <Input label="Mot de passe"/>
            <div className={classes.passwordLost}>
                <Text isLink to='/password-lost'>Mot de passe oublié ?</Text>
            </div>
            <Button variant='primary' textLabel="Se connecter" styles={{container: classes.container}}/>
            <Button variant='primary' textLabel="Je m'inscris" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Login
