import React from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import Input from '../../components/Input';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    formContent: {
        height: 'calc(100vh - 150px)',
    },
    title: {
        padding: '0 50px',
        textAlign: 'center',
        marginBottom: 40
    },
    formProfil: {
        '& input': {
            width: 348
        }
    },
    cta: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    rules: {
        fontSize: 12
    }
}));

const Security = props => {
    const classes = useStyles()
    const navigate = useNavigate()

    const _goBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Mot de passe">
                <div className={classes.container}>
                    <div className={classes.formContent}>
                        <div className={classes.title}>
                            Vous pouvez activer le mode modification en cliquant le bouton toggle en haut à droite.
                        </div>
                        <div className={classes.formProfil}>
                            <Input label="Ancien mot de passe"/>
                            <Input label="Nouveau"/>
                            <Input label="Confirmation"/>
                            <div className={classes.rules}>
                                Votre mot de passe doit contenir au moins : <br />
                                . Un caractère majuscule <br />
                                . Un chiffre <br />
                                . Un caractère minuscule <br />
                                . 8 (huit) lettres
                            </div>
                        </div>
                    </div>
                    <div className={classes.cta}>
                        <Button textLabel='Valider' variant='primary' />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Security
