import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { createUseStyles } from 'react-jss';
import LeftBG from '../Assets/images/bg-left.jpg'
import logo from '../Assets/images/logo-champagne-gratiot.png'
import Information from './Information ';
import Text from '../components/Text';
import { IconArrowDown } from '@tabler/icons-react';
import TextField from '../components/TextField';
import Button from '../components/Button';
import classNames from 'classnames';

const useStyles = createUseStyles(theme => ({
    container: {
        flex: 1,
        maxWidth: 600,
        height: '100vh',
        overflow: 'hidden'
    },
	leftSection: {
        backgroundImage: ({isMoved}) => !isMoved && `url(${LeftBG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        justifyContent: 'flex-end',
        height: '100vh',
        '& > div': {
          display: ({isMoved}) => !isMoved && 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100% - 110px)',
          padding: '60px 50px 50px 60px',
          backgroundColor: ({isMoved}) => !isMoved && '#0000002b'
        }
    },
    logo: {
		width: 46,
		height: 46,
		borderRadius: 13,
		backgroundColor: '#FFFFFF',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& img': {
		width: 'inherit'
		}
	},
    cgv: {
		textAlign: 'right',
        '& div': {
            cursor: 'pointer'
        }
	},
    iconClose: {
        textAlign: 'center',
        '& svg': {
            width: 37,
            height: 37,
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
                transform: 'scale(1.2)'
            }
        }
    },
    containerContact: {
        marginTop: 20,
        height: 'calc(100vh - 170px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 29,
        lineHeight: '34px',
        marginBottom: 20
    },
    citation: {
        textAlign: 'center',
        width: 343,
        marginBottom: 50
    },
    centerDiv: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    rootTextfield: {
        width: 330
    },
    buttonSendContact: {
        width: '298px !important',
        marginTop: 22
    },
    centerForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cgvContent: {
        textAlign: 'center'
    }
}));

const LeftSection = () => {
    const [isMoved, setIsMoved] = useState(false);
    const [isCGV, setIsCGV] = useState(false);
    const classes = useStyles({isMoved});

    const springConfig = {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1
    };

    const _handleContact = () => {
        setIsCGV(false)
        setIsMoved(true)
    }

    const _handleCGV = () => {
        setIsCGV(true)
        setIsMoved(true)
    }

    return (
        <div className={classes.container}>
            <AnimatePresence>
                <motion.div
                    className={classes.leftSection}
                    initial={{ y: '0px' }}
                    animate={isMoved ? { y: '-100%' } : { y: '0px' }}
                    transition={{ ...springConfig, ease: "easeInOut", duration: 0.5 }}
                >
                    <div>
                        <div className={classes.logo}>
                            <img src={logo} alt="logo gratiot" />
                        </div>
                        <div>
                            <div className={classes.content}><Information onMoved={_handleContact} /></div>
                            <div className={classes.cgv}><Text onClick={_handleCGV}>CGV et mentions légales</Text></div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    className={classes.leftSection}
                    initial={{ y: '100vh' }}
                    animate={isMoved ? { y: '-100vh' } : { y: '100vh' }}
                    transition={{ ...springConfig, ease: "easeInOut", duration: 0.5 }}
                >
                    <div>
                        <div className={classes.iconClose}><IconArrowDown onClick={() => setIsMoved(false)} /></div>
                        <div className={classes.containerContact}>
                            {isCGV ? <div className={classes.cgvContent}>Copy here the CGV</div> : 
                            <>
                                <Text styles={{ containerText: classes.title }} variant='h2'>Nous serions <br /> ravis de vous entendre !</Text>
                                <Text styles={{ containerText: classNames(classes.citation, classes.centerDiv) }}>
                                    " Nous ne pouvons pas résoudre les problèmes
                                    en utilisant le même genre de pensée que celle que nous avons
                                    utilisée lorsque nous les avons créés. " - Albert Einstein
                                </Text>
                                <div className={classes.centerForm}>
                                    <TextField styles={{ root: classes.rootTextfield }} name="username" label="Nom et prénom"/>
                                    <TextField styles={{ root: classes.rootTextfield }} name="username" label="Email"/>
                                    <TextField styles={{ root: classes.rootTextfield }} name="username" label="Message"/>
                                    <Button isSubmitable variant='primary' textLabel="Envoyer" styles={{container: classes.buttonSendContact}}/>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default LeftSection
