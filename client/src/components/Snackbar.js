import { IconX } from '@tabler/icons-react'
import classNames from 'classnames'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';

const useStyles = createUseStyles(theme => ({
    root: {

        position: 'absolute',
        bottom: 30,
        left: 30,
        height: 50
    },
    container: {
        height: 50,
        minWidth: 350,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        justifyContent: 'space-between'
    },
    iconClose: {
        cursor: 'pointer',
        width: 18,
        height: 18
    },
    primary: {
        backgroundColor: '#000000',
        color: '#FFFFFF'
    }
}))

const Snackbar = () => {
    const queryClient = useQueryClient()
    const classes = useStyles()
    // const status = useGetsnackBarStatus()
    const good = {
        isOpen: false,
        message: "Vous êtes connecté.",
        type: "info",
        variant: "primary"}

    const usedContainerVariants = {
        hidden: { opacity: 0, transform: 'translateY(30%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    }

    const _handleClose = () => {
        queryClient.setQueryData(['snackbar'], {})
    }


    return (
        <AnimatePresence>
            {good.isOpen && 
                <div className={classes.root}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: "easeInOut"}}
                        variants={usedContainerVariants}
                    >
                        <div className={classNames(classes.container, good.variant === 'primary' && classes.primary)}>
                            {good.message}
                            <IconX className={classes.iconClose} onClick={_handleClose} />
                        </div>
                    </motion.div>
                </div>
            }
        </AnimatePresence>
    )
}

export default Snackbar
