import React from 'react'
import Modal from 'react-modal'
import { AnimatePresence, motion } from 'framer-motion';
import { createUseStyles } from 'react-jss';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import { containerVariants } from './utils';
import { useDispatch } from 'react-redux';
import { closeAllModals } from '../redux/actions/modals';

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
        display: ({isModalClosable}) => !isModalClosable && 'flex',
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
        position: ({isModalClosable}) => !!isModalClosable && 'absolute',
        bottom: ({isModalClosable}) => isModalClosable && 0,
        left: 0,
        right: 0, 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        fontSize: ({isModalClosable}) => isModalClosable ? 34 : 20,
        fontFamily: 'Poppins-Bold',
        textAlign: ({isModalClosable}) => isModalClosable && 'center',
        display: ({isModalClosable}) => isModalClosable && 'flex',
        justifyContent: ({isModalClosable}) => isModalClosable && 'center',
    },
    body: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        padding: '0 38px',
        height: ({isModalClosable}) => isModalClosable ? 'calc(100vh - 120px)' : 'calc(100vh - 90px)',
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
    const { open, title, isModalClosable = false, closeModal, goBack, extraIcon, children, closeOnOverlay = true, direction = 'left', backIcon = true } = props;
    const classes = useStyles({isModalClosable});
    const dispatch = useDispatch()

    const usedContainerVariants = containerVariants[direction];

    const _closeAllModals = () => {
        dispatch(closeAllModals())
    }

    return (
        <AnimatePresence>
            <Modal
                isOpen={open}
                onRequestClose={closeOnOverlay && _closeAllModals}
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
                            {isModalClosable ? 
                                <>
                                    <IconX className={classes.closeIcon} onClick={closeModal}/> 
                                    <div className={classes.title}>{title}</div>
                                </>
                                :
                                <div className={classes.leftHeader}>
                                    {backIcon && <IconArrowLeft onClick={goBack}/>}
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
