import React from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import { useCreateOrder, useGetOrders } from '../api/order.api'
import Button from '../components/Button'
import Text from '../components/Text'
import MyProfil from '../containers/MyProfil'

const Dashboard = () => {
  const location = useLocation()

  const { orders } = useGetOrders()
  const { mutate: createOrder } = useCreateOrder();

  const _handleModalProfil = () => {
    createOrder({name: 'name01', ref: 'ref01'})
  }

  const _closeModal = () => {
  }

  return (
    <div>
      <Button onClick={_handleModalProfil}/>
      <hr />
      {/* <MyProfil open={true} closeModal={_closeModal} /> */}
      { orders?.map((order, index) => <div key={index}>{order?.name +' - '+ order?.ref}</div>) }
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
      <Outlet/>
    </div>
  )
}

export default Dashboard
