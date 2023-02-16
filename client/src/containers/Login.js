import React from 'react'
import { createUseStyles } from 'react-jss';
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

const Login = props => {
    const { open, setOpen } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }

    return (
        <ModalComp open={open} closeModal={_closeModal} title='Se connecter' closeOnOverlay>
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
