import React from 'react'
import { createUseStyles } from 'react-jss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetOrders } from '../../api/order.api';
import BillsMensualy from '../../components/BillsMensualy';
import Drawer from '../../components/Drawer';
import Loading from '../../components/Loading';
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
    const { orders, isLoading } = useGetOrders() || []
    const bills = groupOrderByMonth(orders).filter(item => item.order.length > 0);

    const _goBack = () => {
        const lastPath = window?.localStorage.getItem('lastPathname');
        const isPathFromCart = lastPath.includes('paid');
        lastPath && isPathFromCart ? navigate('/our-products') : navigate(-1)
    }

    const isOrderEmpty = orders.length === 0;

    return (
        <div>
            <Drawer open={true}  goBack={_goBack} title="Mes factures">
                <div className={classes.container}>
                    {isLoading && <Loading forDrawer/>}
                    {isOrderEmpty ? <NoContent For='bill'/> :
                        bills && bills.map((bill, index) => <BillsMensualy key={index} bill={bill} />).reverse()
                    }
                </div>
            </Drawer>
            <Outlet/>
        </div>
    )
}

export default Bills
