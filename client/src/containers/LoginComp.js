import { IconPlugConnected } from '@tabler/icons-react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import Button from '../components/Button'

const useStyles = createUseStyles(theme => ({

}))

const LoginComp = props => {
    const { handleLogin, handleSignin } = props;
    const classes = useStyles()

    return (
        <>
            <Button onClick={handleLogin} styles={{ container: classes.buttonLogin }} textLabel='Se connecter' variant='primary' icon={<IconPlugConnected/>} />
            <Button onClick={handleSignin} styles={{ container: classes.buttonSignin }} textLabel='Pas encore inscrit ?' />
        </>
    )
}

export default LoginComp
