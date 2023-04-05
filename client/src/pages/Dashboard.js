import React from 'react'

import { createUseStyles } from 'react-jss'
import { Outlet } from 'react-router-dom'
import RightSection from '../containers/RightSection'
import Snackbar from '../components/Snackbar'
import LeftSection from '../containers/LeftSection'

const useStyles = createUseStyles(theme => ({
	root: {
		display: 'flex',
		height: '100vh'
	},
	rightSection: {
		padding: '50px 70px',
		flex: 1,
		overflow: 'auto'
	}
}));

const Dashboard = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
		<LeftSection/>
        <div className={classes.rightSection}>
          <RightSection/>
        </div>
      </div>
      <Snackbar />
      <Outlet/>
    </>
  )
}

export default Dashboard