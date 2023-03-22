import React from 'react'
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
import { useGetOrders } from '../../api/order.api';
import BillsMensualy from '../../components/BillsMensualy';
import Drawer from '../../components/Drawer';
import NoContent from '../../components/order/NoContent';
import { groupOrderByMonth } from '../../misc/utils';

const useStyles = createUseStyles(theme => ({
	container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
	},
}));

const Bills = props => {
    const classes = useStyles()
    const navigate = useNavigate()
    const { orders } = useGetOrders() || []
    const bills = groupOrderByMonth(orders).filter(item => item.order.length > 0);

    const _goBack = () => {
        navigate(-1)
    }

    const isOrderEmpty = orders.length === 0;

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Mes factures">
                <div className={classes.container}>
                    {isOrderEmpty ? <NoContent For='bill'/> :
                        bills && bills.map((bill) => <BillsMensualy bill={bill} />)
                    }
                </div>
            </Drawer>
        </div>
    )
}

export default Bills
