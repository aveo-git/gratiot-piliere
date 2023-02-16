import React from 'react'
import { createUseStyles } from 'react-jss';
import Button from '../components/Button'
import Input from '../components/Input'
import ModalComp from '../components/Modal'
import Text from '../components/Text';

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
            <div className={classes.resend}>
                <Text isLink to='/resend-code'>Re-envoyer le code</Text>
            </div>
            
            <Button variant='primary' textLabel="Confirmer" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default Confirmation
