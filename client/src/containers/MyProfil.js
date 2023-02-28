import React from 'react'
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import Drawer from '../components/Drawer';
import MenuItem from '../components/MenuItem';
import { MENU_PROFIL } from '../components/utils';

const useStyles = createUseStyles(theme => ({
	container: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
    listItem: {
        height: 'calc(100vh - 150px)',
        overflow: 'auto',
        '&>div': {
            maxHeight: 'calc(100vh - 330px)',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
                width: 0
            }
        }
    },
}));

const MyProfil = props => {
    const { open, closeModal } = props;
    const classes = useStyles()
    const dispatch = useDispatch()
    const { orders } = useSelector(state => state.orders);
    const { data } = orders;

    const _resetOrders = () => {
        
    }

    const _openBillConfirmation = () => {
        
    }

    return (
        <div>
            <Drawer open={open} closeModal={closeModal} isModalClosable title="Mon profil">
                <div className={classes.container}>
                    <div className={classes.listItem}>
                        <div>
                            {MENU_PROFIL?.map((item, index) => <MenuItem key={index} isFirstItem={index === 0} data={item} />)}
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default MyProfil
