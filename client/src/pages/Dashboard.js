import React from 'react'

import { createUseStyles } from 'react-jss'
import { Outlet } from 'react-router-dom'
import RightSection from '../containers/RightSection'
import LeftSection from '../containers/LeftSection'
import { useGetsnackBarStatus } from '../api/snackbar.api'
import Snackbar from '../components/Snackbar'

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
  const classes = useStyles();
  const snackbar = useGetsnackBarStatus();

  return (
    <>
      <div className={classes.root}>
		    <LeftSection/>
        <div className={classes.rightSection}>
          <RightSection/>
        </div>
      </div>
      {snackbar?.status && <Snackbar text={snackbar?.message} variant='primary' />}
      <Outlet/>
    </>
  )
}

export default Dashboard