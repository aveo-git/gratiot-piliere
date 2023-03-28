import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '../api/user.api';
import Button from '../components/Button';
import ModalComp from '../components/Modal';
import TextField from '../components/TextField';
import { signupSchema } from '../misc/utils';

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
}));

const Signup = () => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({});
    const { mutate: createUser } = useCreateUser()
    const classes = useStyles();
    const navigate = useNavigate();

    const _closeModal = () => {
        navigate(-1)
    }

    const _handleFields = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const _handleConfirmation = (e) => {
        if(e.target.value !== values.password) {
            setErrors({...errors, matchPassword: true})
        } else setErrors({...errors, matchPassword: false})
    }

    const _handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = await signupSchema.isValid(values);
        
        isValid && createUser({...values, username: values.email})

    }

    return (
        <ModalComp open={true} closeModal={_closeModal} title="S'inscrire">
            <form onSubmit={_handleSignUp}>
                <TextField label="Nom" name="lastName" onChange={_handleFields} />
                <TextField label="Prénom" name="firstName" onChange={_handleFields} />
                <TextField label="Adresse électronique" name="email" onChange={_handleFields} />
                <TextField label="Téléphone" name="mobile" onChange={_handleFields} />
                <TextField label="Adresse" name="address" onChange={_handleFields} />
                <TextField label="Mot de passe" name="password" onChange={_handleFields} />
                <TextField label="Confirmation" name="passwordConfirmation" onChange={_handleConfirmation} />
                <Button disabled={errors.matchPassword} variant='primary' isSubmitable textLabel="S'inscrire" styles={{container: classes.container}}/>
            </form>
            <Button variant='primary' textLabel="J'ai déjà un compte" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Signup
