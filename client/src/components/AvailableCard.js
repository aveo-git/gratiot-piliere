import { IconBrandMastercard, IconBrandVisa } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss';
import Text from './Text'

const useStyles = createUseStyles(theme => ({
    container: {
        border: '1px solid #DFDFDF',
        padding: 25
    },
    cards: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
        padding: '10px 0',
        '& span, svg': {
            marginRight: 10,
            fontStyle: 'italic',
            fontSize: 12,
            fontFamily: 'Inter-Bold'
        }
    },
}));

const AvailableCard = () => {
    const classes = useStyles()
    const availableCard = ['cb', 'visa', 'mc']
    
    return (
        <div>
            <Text>Nous acceptons :</Text>
            <div className={classes.cards}>
                {availableCard.map((card, index) => {
                    switch(card) {
                        case 'cb':
                            return <span key={index}>Carte bancaire</span>
                        case 'visa':
                            return <IconBrandVisa key={index}/>
                        case 'mc':
                            return <IconBrandMastercard key={index}/>
                        default:
                            return '';
                    }
                })}
            </div>
        </div>
    )
}

export default AvailableCard
