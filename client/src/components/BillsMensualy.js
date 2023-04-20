import { IconReceipt } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { toDateString } from '../misc/utils'
import MenuItem from './MenuItem'
import Text from './Text'

const useStyles = createUseStyles(theme => ({
    container: {
        marginBottom: 25
    },
    month: {
        fontSize: 15,
        fontFamily: 'Inter-Medium',
        borderBottom: '1px solid #E4E4E4',
        paddingBottom: 8
    },
    menuitemRoot: {
        padding: '13px 18px !important'
    }
}))

const BillsMensualy = props => {
    const { bill } = props;
    const { month, order } = bill;
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Text styles={{ containerText: classes.month }}>{month}</Text>
            {order.map((item, id) => <MenuItem key={id} to={item.id} icon={<IconReceipt/>} title={toDateString(item.createdAt)} status={item.state} downloaded styles={{ root: classes.menuitemRoot }} /> ).reverse()}
        </div>
    )
}

export default BillsMensualy
