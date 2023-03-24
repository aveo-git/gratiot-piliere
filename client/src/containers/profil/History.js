import React from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/Drawer';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
}));

const History = props => {
    const classes = useStyles()
    const navigate = useNavigate()

    const _goBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Historique">
                <div className={classes.container}>
                    <div className={classes.listItem}>
                        <div>
                            Historique
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default History
