import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button'
import Input from '../components/Input'
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
    }
}));

const Confirmation = props => {
    const { open, setOpen } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }
    return (
        <ModalComp open={open} closeModal={_closeModal} title="Confirmation" backIcon closeOnOverlay>
            <div className={classes.contentInformation}>Verifier votre adresse email et copier le code de verification en dessous : (adresse@gmail.com)</div>
            <Input label="Code de verification"/>
            Re-envoyer le code
            <Button variant='primary' textLabel="Confirmer" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Confirmation
