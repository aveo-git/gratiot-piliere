import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateUser } from '../api/user.api';
import Button from '../components/Button';
import ModalComp from '../components/Modal';
import TextField from '../components/TextField';

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
}));

const Signup = () => {
    const [openSignin, setOpen] = useState(false)
    const [values, setValues] = useState({}) // Change to Yup
    const classes = useStyles()
    const location = useLocation()
    const { mutate: createUser } = useCreateUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(location.pathname === '/signin') setOpen(true)
    }, [location.pathname])

    const _closeModal = () => {
        setOpen && setOpen(false)
        navigate('/')
    }

    const _handleSignUp = () => {
        createUser({...values, username: values.email})
    }

    return (
        <ModalComp open={openSignin} closeModal={_closeModal} title="S'inscrire">
            <TextField label="Nom" onChange={(e) => setValues({...values, firstName: e.target.value})} />
            <TextField label="Prénom" onChange={(e) => setValues({...values, lastName: e.target.value})} />
            <TextField label="Adresse électronique" onChange={(e) => setValues({...values, email: e.target.value})} />
            <TextField label="Téléphone" onChange={(e) => setValues({...values, mobile: e.target.value})} />
            <TextField label="Adresse" onChange={(e) => setValues({...values, address: e.target.value})} />
            <TextField label="Mot de passe" onChange={(e) => setValues({...values, password: e.target.value})} />
            <TextField label="Confirmation" onChange={(e) => setValues({...values, pwdConfirmation: e.target.value})} />
            <Button variant='primary' onClick={_handleSignUp} textLabel="S'inscrire" styles={{...values, container: classes.container}}/>
            <Button variant='primary' textLabel="J'ai déjà un compte" styles={{...values, container: classes.container}}/>
        </ModalComp>
    )
}

export default Signup
