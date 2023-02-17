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
        width: 464,
        height: '100vh',
        backgroundColor: '#FFFFFF'
    },
    header: {
        position: 'relative', 
        display: ({closeModal}) => !closeModal && 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '21px 28px',
        '& h2': {
            margin: '0 0 0 10px'
        }
    },
    leftHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        position: 'relative',
        zIndex: 1
    },
    title: {
        position: ({closeModal}) => !!closeModal && 'absolute',
        bottom: ({closeModal}) => closeModal && 0,
        left: 0,
        right: 0, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        fontSize: ({closeModal}) => closeModal ? 34 : 20,
        fontFamily: 'Poppins-Bold',
        textAlign: ({closeModal}) => closeModal && 'center',
    },
    body: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        padding: '0 38px 38px 38px',
        height: 'calc(100vh - 120px)',
        display: 'flex',
        justifyContent: 'center'
    },
    extraIcon: {
        position: 'absolute',
        top: 15,
        right: 28,
        cursor: 'pointer',
        '& svg': {
            strokeWidth: 1,
            width: 35, height: 53
        }
    }
}));

const Drawer = props => {
    const { open, setOpen, title, closeModal, extraIcon, children, closeOnOverlay = true, direction = 'left', backIcon = true } = props;
    const classes = useStyles({closeModal});

    const usedContainerVariants = containerVariants[direction];

    const _closeDrawer = () => {
        setOpen(false)
    }

    return (
        <AnimatePresence>
            <Modal
                isOpen={open}
                onRequestClose={closeOnOverlay && _closeDrawer}
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
                                <>
                                    <IconX className={classes.closeIcon} onClick={_closeDrawer}/> 
                                    <div className={classes.title}>{title}</div>
                                </>
                                :
                                <div className={classes.leftHeader}>
                                    {backIcon && <IconArrowLeft/>}
                                    <h2 className={classes.title}>{ title }</h2>
                                </div>
                            }
                            <span className={classes.extraIcon}>{extraIcon}</span>
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
