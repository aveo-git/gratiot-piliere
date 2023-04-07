import { IconX } from '@tabler/icons-react'
import classNames from 'classnames'
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { snackbarKeys } from '../api/snackbar.api';

const useStyles = createUseStyles(theme => ({
    root: {
        zIndex: 9991,
        position: 'absolute',
        bottom: 30,
        left: 30,
        height: 50
    },
    container: {
        height: 50,
        minWidth: 150,
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
        height: 18,
        marginLeft: 20
    },
    primary: {
        backgroundColor: '#000000',
        color: '#FFFFFF'
    }
}))

const Snackbar = props => {
    const { text, variant } = props;
    const [open, setOpen] = useState(true)
    const classes = useStyles();
    
    const usedContainerVariants = {
        hidden: { opacity: 0, transform: 'translateY(30%)'},
        visible: { opacity: 1, transform:'translateY(0px)'}
    }

    const queryClient = useQueryClient()
    const _handle = () => {
        setOpen(false);
        queryClient.removeQueries(snackbarKeys.status());
    }

    return (
        <AnimatePresence>
            {open && 
                <div className={classes.root}>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.3, ease: "easeInOut"}}
                        variants={usedContainerVariants}
                    >
                        <div className={classNames(classes.container, variant === 'primary' && classes.primary)}>
                            {text}
                            <IconX className={classes.iconClose} onClick={_handle} />
                        </div>
                    </motion.div>
                </div>
            }
        </AnimatePresence>
    )
}

export default Snackbar
