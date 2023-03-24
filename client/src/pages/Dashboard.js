import React from 'react'

import { createUseStyles } from 'react-jss'
import { Outlet } from 'react-router-dom'
import Text from '../components/Text'
import Information from '../containers/Information '
import RightSection from '../containers/RightSection'
import LeftBG from '../Assets/images/bg-left.jpg'

const useStyles = createUseStyles(theme => ({
	root: {
    display: 'flex',
    height: '100vh'
	},
  leftSection: {
    backgroundImage: `url(${LeftBG})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: 'auto',
      padding: '80px 50px 50px 80px'
    }
  },
  bgOverlay: {
    backgroundColor: '#0000002b'
  },
  rightSection: {
    padding: '50px 70px',
    width: '50%',
    overflow: 'auto'
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
          <div className={classes.bgOverlay}>
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