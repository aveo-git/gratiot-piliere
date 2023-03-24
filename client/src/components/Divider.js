import classNames from 'classnames'
import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
    divider: {
        flex: 1,
        borderTop: '1px solid #C5C5C5'
    }
}))

const Divider = ({ className }) => {
    const classes = useStyles()
    return (
        <div className={classNames(classes.divider, className)}></div>
    )
}

export default Divider
