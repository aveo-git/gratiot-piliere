import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Text from '../components/Text'
import MyProfil from '../containers/MyProfil'
import { checkLocation } from '../misc/locations'
import { actionForModal, openOrCloseModal } from '../redux/actions/modals'
import { useCreateOrder, useGetOrders } from '../api/order.api'

const Dashboard = () => {
  const { modals } = useSelector(state => state.modals)
  const dispatch = useDispatch()
  const location = useLocation()
  const { orders } = useGetOrders()
  const { mutate: createOrder } = useCreateOrder();

  useEffect(() => {
    dispatch(checkLocation(location.pathname))
  }, [location, dispatch])

  const _handleModalProfil = () => {
    createOrder({name: 'name01', ref: 'ref01'})
  }

  const _closeModal = () => {
    dispatch(actionForModal({type: 'PROFIL', status: 'close'}))
  }

  return (
    <div>
      <Button onClick={_handleModalProfil}/>
      <hr />
      <MyProfil open={modals.profil} closeModal={_closeModal} />
      { orders?.map((order, index) => <div key={index}>{order?.name +' - '+ order?.ref}</div>) }
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
      <Outlet/>
    </div>
  )
}

export default Dashboard
