import React from 'react'
import { createUseStyles } from 'react-jss'
import Input from '../components/Input'
import Text from '../components/Text'
import { WIDTH_RIGHT_SECTION } from '../misc/utils'

const useStyles = createUseStyles(theme => ({
    root: {
        width: WIDTH_RIGHT_SECTION,
    },
    sectionTitle: {
        color: '#98244D'
    },
    formFilter: {
        marginTop: 30,
        '& select': {
            width: 253
        },
        '& input': {
            width: 211
        }
    },
    sideByside: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: 10,
        width: 250,
        '& input': {
            width: 80
        }
    }
}))

const Filtre = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Text styles={{ containerText: classes.sectionTitle, subtitle: classes.subtitle }} variant='h3' subtitle='1561 items'>Filtre</Text>
            <div className={classes.formFilter}>
                <Input type='select' label="Catégorie"/>
                <Input label="Nom"/>
                <Input label="Contenance"/>
                <Input label="Moins de (€)"/>
                <div className={classes.sideByside}>
                    <Input label="Compris entre"/>
                    <Input/>
                </div>
                <Input label="Millesime"/>
            </div>
        </div>
    )
}

export default Filtre
