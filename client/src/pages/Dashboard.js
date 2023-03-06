import React from 'react'

import { Outlet, useLocation } from 'react-router-dom'
import { useCreateOrder, useGetOrders } from '../api/order.api'
import Button from '../components/Button'
import ProductItem from '../containers/product/ProductItem'
import bottleIMG from '../Assets/images/bottle.png'

const Dashboard = () => {
  const { orders } = useGetOrders()
  const { mutate: createOrder } = useCreateOrder();

  const _handleModalProfil = () => {
    createOrder({name: 'name01', ref: 'ref01'})
  }

  const _closeModal = () => {
  }

  return (
    <div>
      {/* { orders?.map((order, index) => <div key={index}>{order?.name +' - '+ order?.ref}</div>) } */}
      <Button onClick={_handleModalProfil}/>
      <hr />
      <div style={{ display: 'flex' }}>
        {fakeData.map(data => <ProductItem data={data} />)}
      </div>
      <Outlet/>
    </div>
  )
}

export default Dashboard

export const fakeData = [
  {
    id: '1', 
    name: 'Champagne delamorte avec texte longue', 
    description: 'Ceci est juste un test donc pas de soucis si le texte n\'a pas de siginification', 
    price: 30.12,
    count: 2,
    isVoted: true,
    image: bottleIMG
  },
  {
    id: '2', 
    name: 'Champagne delamorte avec texte longue', 
    description: 'Ceci est juste un test donc pas de soucis si le texte n\'a pas de siginification', 
    price: 30.12,
    count: 2,
    isVoted: true,
    image: bottleIMG
  }
]
