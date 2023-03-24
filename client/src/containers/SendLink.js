import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button'
import TextField from '../components/Input'
import ModalComp from '../components/Modal'

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
    contentInformation: {
        textAlign: 'center',
        padding: '0 40px',
        marginBottom: 22
    },
    resend: {
        textAlign: 'right',
        marginBottom: 35
    }
}));

const SendLink = props => {
    const { open, setOpen } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }
    return (
        <ModalComp open={open} closeModal={_closeModal} title="Mot de passe oublié" direction="left" backIcon closeOnOverlay>
            <div className={classes.contentInformation}>Veillez saisir ici votre adresse mail.</div>
            <TextField label="Adresse mail"/>
            
            <Button variant='primary' textLabel="Envoyer le lien" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default SendLink
