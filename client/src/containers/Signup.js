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
    error: {
        color: '#ff4209',
        marginBottom: 15
    }
}));

const Signup = () => {
    const [values, setValues] = useState({});
    const [error, setError] = useState(false);
    const { mutate: createUser } = useCreateUser();
    const classes = useStyles();
    const navigate = useNavigate();

    const _closeModal = () => {
        // setOpen(false)
        navigate(-1)
    }

    const _handleFields = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const _handleSignUp = async (e) => {
        e.preventDefault();
        const isValid = await signupSchema.isValid(values);
        
        if(isValid) {
            createUser({...values, username: values.email})
        } else setError(true)
    }

    const _handleLogin = () => {
        // navigate('/login')
    }

    return (
        <ModalComp open={true} closeModal={_closeModal} title="S'inscrire">
            <form onSubmit={_handleSignUp}>
                <TextField label="Nom" name="lastName" onChange={_handleFields} />
                <TextField label="Prénom" name="firstName" onChange={_handleFields} />
                <TextField label="Adresse électronique" name="email" onChange={_handleFields} />
                <TextField label="Téléphone" name="mobile" onChange={_handleFields} />
                <TextField label="Adresse" name="address" onChange={_handleFields} />
                <TextField label="Mot de passe" type="password" name="password" onChange={_handleFields} />
                <TextField label="Confirmation" type="password" name="passwordConfirmation" />
                {error && <div className={classes.error}>Authentification incorrecte</div>}
                <Button variant='primary' isSubmitable textLabel="S'inscrire" styles={{container: classes.container}}/>
            </form>
            <Button variant='primary' textLabel="J'ai déjà un compte" onClick={_handleLogin} styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Signup
