import { IconToggleLeft, IconToggleRight } from '@tabler/icons-react';
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useIsUserLogged } from '../../api/user.api';
import Button from '../../components/Button';
import Drawer from '../../components/Drawer';
import TextField from '../../components/TextField';
import { parseToView } from '../../misc/utils';

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
    }
}));

const General = () => {
    const classes = useStyles()
    const navigate = useNavigate()
    const currentUser = parseToView(useIsUserLogged()) || null;
    const [readOnly, setReadOnly] = useState(true)

    const _goBack = () => {
        navigate(-1)
    }

    const _toggleOverview = () => setReadOnly(!readOnly)

    const _handleUpdateUser = () => {}

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} extraIcon={readOnly ? <IconToggleRight onClick={_toggleOverview} /> : <IconToggleLeft onClick={_toggleOverview} />} title="Géneral">
                <div className={classes.container}>
                    <form onSubmit={_handleUpdateUser}>
                    <div className={classes.formContent}>
                        <div className={classes.title}>
                            {readOnly ? 
                                `Vous pouvez activer le mode modification en cliquant le bouton toggle en haut à droite.` : 
                                `Vous pouvez maintenant mettre à jour votre profil. Les changements ne seront pas pris  en compte si vous quittez sans validation.`}
                        </div>
                        <div className={classes.formProfil}>
                            <TextField readOnly={readOnly} value={currentUser?.lastName} label="Nom" name="lastName"/>
                            <TextField readOnly={readOnly} value={currentUser?.firstName} label="Prénom" name="firstName"/>
                            <TextField readOnly={readOnly} value={currentUser?.email} label="Adresse éléctronique" name="email"/>
                            <TextField readOnly={readOnly} value={currentUser?.mobile} label="Téléphone" name="mobile"/>
                            <TextField readOnly={readOnly} value={currentUser?.address} label="Adresse" name="address"/>
                            <TextField readOnly={readOnly} value={currentUser?.street} label="Rue" name="street"/>
                            <TextField readOnly={readOnly} value={currentUser?.code} label="Code postal" name="code"/>
                        </div>
                    </div>
                    {!readOnly && <div className={classes.cta}>
                        <Button textLabel='Valider' variant='primary' />
                    </div>}
                    </form>
                </div>
            </Drawer>
        </div>
    )
}

export default General
