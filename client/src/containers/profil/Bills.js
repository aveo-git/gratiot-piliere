import React from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import Drawer from '../../components/Drawer';
import NoContent from '../../components/order/NoContent';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
}));

const Bills = props => {
    const classes = useStyles()
    const navigate = useNavigate()

    const _goBack = () => {
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Mes factures">
                <div className={classes.container}>
                    <NoContent For='bill'/>
                </div>
            </Drawer>
        </div>
    )
}

export default Bills
