import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Text from '../components/Text'
import MyProfil from '../containers/MyProfil'
import { checkLocation } from '../misc/locations'
import { actionForModal, openOrCloseModal } from '../redux/actions/modals'

const Dashboard = () => {
  const { modals } = useSelector(state => state.modals)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(checkLocation(location.pathname))
  }, [location, dispatch])

  const _handleModalProfil = () => {
    dispatch(openOrCloseModal(navigate, {type: 'ORDER', link: '/cart', status: 'open'}))
  }

  const _closeModal = () => {
    dispatch(actionForModal({type: 'PROFIL', status: 'close'}))
  }
  return (
    <div>
      <Button onClick={_handleModalProfil}/>
      <hr />
      <MyProfil open={modals.profil} closeModal={_closeModal} />
      <Text variant='h1' subtitle="Subtitle" isLink>Bonjour</Text>
      <Outlet/>
    </div>
  )
}

export default Dashboard
