import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button';
import Input from '../components/Input'
import ModalComp from '../components/Modal'

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
}));

const Signin = props => {
    const { open, setOpen } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }

    return (
        <ModalComp open={open} closeModal={_closeModal} title="S'inscrire" closeOnOverlay>
            <Input label="Nom"/>
            <Input label="Prénom"/>
            <Input label="Adresse électronique"/>
            <Input label="Téléphone"/>
            <Input label="Adresse"/>
            <Input label="Mot de passe"/>
            <Input label="Confirmation"/>
            Content here
            <Button variant='primary' textLabel="S'inscrire" styles={{container: classes.container}}/>
            <Button variant='primary' textLabel="J'ai déjà un compte" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Signin
