import React from 'react'
import { createUseStyles } from 'react-jss';
import { IconCircleCheck } from '@tabler/icons-react';
import Button from '../components/Button'
import ModalComp from '../components/Modal'

const useStyles = createUseStyles(theme => ({
	container: {
		width: 298,
        marginTop: 22
	},
    content: {
        textAlign: 'center'
    },
    contentInformation: {
        textAlign: 'center',
        padding: '0 40px',
        marginBottom: 22
    },
    iconCheck: {
        color: '#78D792',
        width: 50,
        height: 50,
        margin: '19px 0'
    }
}));

const ConfirmationDone = props => {
    const { open, setOpen } = props;
    const classes = useStyles()

    const _closeModal = () => {
        setOpen && setOpen(false)
    }
    return (
        <ModalComp open={open} closeModal={_closeModal} title="Confirmation" backIcon closeOnOverlay>
            <div className={classes.content}>
                <IconCircleCheck className={classes.iconCheck}/>
                <div className={classes.contentInformation}>
                    Félicitation,
                    votre compte a été bien enregistré.
                    Vous pouvez maintenant vous connecter
                    en cliquant le bouton en bas.
                </div>
            </div>
            <Button variant='primary' textLabel="Je me connecte" styles={{container: classes.container}}/>
        </ModalComp>
    )
}

export default ConfirmationDone
