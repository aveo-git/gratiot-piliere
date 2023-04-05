import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useUserLogin } from '../api/user.api';
import Button from '../components/Button';
import ModalComp from '../components/Modal';
import Text from '../components/Text';
import TextField from '../components/TextField';
import { loginSchema } from '../misc/utils';

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
    passwordLost: {
        textAlign: 'right',
        marginBottom: 35
    },
    error: {
        color: '#ff4209',
        marginBottom: 15
    }
}));

const Login = () => {
    const [user, setUser] = useState({});
    const [errorValidation, setErrorValidation] = useState(false);
    const classes = useStyles();
    const { mutate: userLogin } = useUserLogin();
    const navigate = useNavigate();

    const _closeModal = () => {
        navigate(-1)
    }

    const _handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const _submitLoginField = async (e) => {
        e.preventDefault()
        const values = {username: e.target[0].value, password: e.target[1].value}
        const isValid = await loginSchema.isValid(values);

        if (isValid) {
            userLogin(values);
            navigate(-1)
        } else setErrorValidation(true)
    }

    const _handleSignin = () => {
        // navigate('/signin')
    }

    return (
        <ModalComp open={true} closeModal={_closeModal} title='Se connecter'>
            <form onSubmit={_submitLoginField}>
                <TextField name="username" onChange={_handleChange} label="Adresse électronique"/>
                <TextField type="password" name="password" onChange={_handleChange} label="Mot de passe"/>
                {errorValidation && <div className={classes.error}>Authentification incorrecte</div>}
                <div className={classes.passwordLost}>
                    <Text isLink to='/password-lost'>Mot de passe oublié ?</Text>
                </div>
                <Button isSubmitable variant='primary' textLabel="Se connecter" styles={{container: classes.container}}/>
            </form>
            <Button variant='primary' textLabel="Je m'inscris" onClick={_handleSignin} styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Login
