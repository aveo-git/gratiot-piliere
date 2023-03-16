import { IconToggleLeft, IconToggleRight } from '@tabler/icons-react';
import React, { useState } from 'react'
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
    }
}));

const General = props => {
    const classes = useStyles()
    const navigate = useNavigate()
    const [readOnly, setReadOnly] = useState(true)

    const _goBack = () => {
        navigate(-1)
    }

    const _toggleOverview = () => setReadOnly(!readOnly)

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} extraIcon={readOnly ? <IconToggleRight onClick={_toggleOverview} /> : <IconToggleLeft onClick={_toggleOverview} />} title="Géneral">
                <div className={classes.container}>
                    <div className={classes.formContent}>
                        <div className={classes.title}>
                            {readOnly ? 
                                `Vous pouvez activer le mode modification en cliquant le bouton toggle en haut à droite.` : 
                                `Vous pouvez maintenant mettre à jour votre profil. Les changements ne seront pas pris  en compte si vous quittez sans validation.`}
                        </div>
                        <div className={classes.formProfil}>
                            <Input readOnly={readOnly} value='RABENANTOANDRO' label="Nom"/>
                            <Input readOnly={readOnly} value='Sylvester' label="Prénom"/>
                            <Input readOnly={readOnly} value='rabenantoandro@gmail.com' label="Adresse éléctronique"/>
                            <Input readOnly={readOnly} value='034 xx xxx xx' label="Téléphone"/>
                            <Input readOnly={readOnly} value='Lot 212 Bis Tana' label="Adresse"/>
                            <Input readOnly={readOnly} value='Circulaire Ampandrana' label="Rue"/>
                            <Input readOnly={readOnly} value='101' label="Code postal"/>
                        </div>
                    </div>
                    {!readOnly && <div className={classes.cta}>
                        <Button textLabel='Valider' variant='primary' />
                    </div>}
                </div>
            </Drawer>
        </div>
    )
}

export default General
