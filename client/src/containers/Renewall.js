import React from 'react'
import { createUseStyles } from 'react-jss'
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
    },
    rules: {
        fontSize: 12
    }
}));

const Renewall = props => {
    const { open, setOpen, isOldPasswordrequired = false } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }
    return (
        <ModalComp open={open} closeModal={_closeModal} title="Nouveau mot de passe" direction="left" backIcon closeOnOverlay>
            <div className={classes.contentInformation}>Votre mot de passe doit respecter les regles indiqués.</div>
            {isOldPasswordrequired && <TextField label="Ancien mot de passe"/>}
            <TextField label="Nouveau"/>
            <TextField label="Confirmation"/>
            <div className={classes.rules}>
                Votre mot de passe doit contenir au moins : <br />
                . Un caractère majuscule <br />
                . Un chiffre <br />
                . Un caractère minuscule <br />
                . 8 (huit) lettres
            </div>
            
            <Button variant='primary' textLabel="Valider" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Renewall
