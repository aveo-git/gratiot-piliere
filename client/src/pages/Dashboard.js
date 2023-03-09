import React from 'react'

import { createUseStyles } from 'react-jss'
import { Outlet } from 'react-router-dom'
import Text from '../components/Text'
import Information from '../containers/Information '
import RightSection from '../containers/RightSection'

const useStyles = createUseStyles(theme => ({
	root: {
    display: 'flex',
    height: '100vh'
	},
  leftSection: {
    backgroundColor: '#EAEAEA',
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '70vh',
      height: 'auto',
      padding: '80px 50px 50px 20px'
    }
  },
  rightSection: {
    padding: '50px 70px',
    width: '50%'
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#B7B7B7'
  },
  cgv: {
    textAlign: 'right'
  }
}));

const Dashboard = () => {
  const classes = useStyles()
  // const { products } = useGetProducts()
  // const { mutate: addProduct } = useAddProduct()

  return (
    <>
      <div className={classes.root}>
        <div className={classes.leftSection}>
          <div>
            <div className={classes.logo}></div>
            <div>
              <div className={classes.content}><Information /></div>
              <div className={classes.cgv}><Text isLink={true} to='/rakoto'>CGV et mentions légales</Text></div>
            </div>
          </div>
        </div>
        <div className={classes.rightSection}>
          <RightSection/>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Dashboard