import React from 'react'
import { createUseStyles } from 'react-jss';
import { Outlet, useNavigate } from 'react-router-dom';
import Drawer from '../../components/Drawer';
import MenuItem from '../../components/MenuItem';
import { MENU_PROFIL } from '../../misc/utils';

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
    const classes = useStyles()
    const navigate = useNavigate()

    const _closeModal = () => {
        navigate(-1)
    }

    return (
        <div>
            <Drawer open={true} closeModal={_closeModal} isModalClosable title="Mon profil">
                <div className={classes.container}>
                    <div className={classes.listItem}>
                        <div>
                            {MENU_PROFIL?.map((item, index) => <MenuItem key={index} isFirstItem={index === 0} data={item} />)}
                        </div>
                    </div>
                </div>
            </Drawer>
            <Outlet/>
        </div>
    )
}

export default MyProfil
