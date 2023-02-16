import React from 'react'
import Modal from 'react-modal'
import { AnimatePresence, motion } from 'framer-motion';
import { createUseStyles } from 'react-jss';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { containerVariants } from './utils';

const useStyles = createUseStyles(theme => ({
	overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgb(0 0 0 / 22%)',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    root: {
        backgroundColor: 'transparent',
        overflow: 'scroll',
        height: 'fit-content',
        '&::-webkit-scrollbar': {
            width: 0
        },
        '&:focus-visible': {
            outline: 'none'
        }
	},
    content: {
		fontFamily: 'Inter-Medium',
        width: 404,
        height: '100vh',
        backgroundColor: '#FFFFFF'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '21px 28px',
        '& h2': {
            margin: '0 0 0 10px'
        }
    },
    leftHeader: {
        display: 'flex',
        alignItems: 'center',
        fontFamily: 'Inter-Bold',
        '& svg': {
            cursor: 'pointer',
            width: 40,
            height: 40,
            strokeWidth: 1,
        }
    },
    closeIcon: {
        cursor: 'pointer',
        display: 'flex',
        width: 40,
        height: 40,
        strokeWidth: 1,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter-Bold'
    },
    body: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        padding: '0 38px 38px 38px'
    }
}));

const Drawer = props => {
    const { open, setOpen, title, closeModal, children, closeOnOverlay = false, direction = 'top', backIcon = true } = props;
    const classes = useStyles();
    
    const _closeModal = () => {
        setOpen(false)
    }

    const usedContainerVariants = containerVariants[direction];

    return (
        <AnimatePresence>
            <Modal
                isOpen={open}
                onRequestClose={closeOnOverlay && _closeModal}
                contentLabel="Example Modal"
                overlayClassName={classes.overlay}
                className={classes.root}
                ariaHideApp={false}
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.3, ease: "easeInOut"}}
                    variants={usedContainerVariants}
                >
                    <div className={classes.content}>
                        <div className={classes.header}>
                            {closeModal ? 
                                <IconX className={classes.closeIcon} onClick={_closeModal}/> :
                                <div className={classes.leftHeader}>
                                    {backIcon && <IconArrowLeft/>}
                                    <h2 className={classes.title}>Titre</h2>
                                </div>
                            }
                        </div>
                        <div className={classes.body}>
                            {children}
                        </div>
                    </div>
                </motion.div>
            </Modal>
        </AnimatePresence>
    )
}

export default Drawer
