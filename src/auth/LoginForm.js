import React from 'react'
import {Button, Collapse, Paper, TextField, Typography} from '@material-ui/core'

import logo_start from '../img/logo_start.png'

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position:'absolute', top:0, left:0},
    paper: {maxWidth: 320, padding: 20},
    buttonDiv: {display: 'flex', justifyContent: 'space-around', marginTop: 16, flexWrap: 'wrap'},
    forrgotToggleButton: { margin: 10},
    logo: { width: 320, marginBottom: 25 }
}

const LogInForm = props => {

    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState(false)
    const emailValidate = value => {
        const isError = !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        setEmailError(isError)
        return isError
    }

    const [pwd, setPwd] = React.useState('')
    const [pwdError, setPwdError] = React.useState(false)
    const pwdValidate = value => {
        setPwdError(!value)
        return !value
    }

    const onSubmit = () => {
        const isEmailError = emailValidate(email)
        const isPwdError = pwdValidate(pwd)

        if (!isEmailError && !isPwdError){
            props._logIn(email, pwd)
        
        }
    }
    const forgotOnSumbit = () => {
        const isEmailError = forgotEmailValidate(forgotEmail)
        if (!isEmailError){
            props._resetPassword(forgotEmail, () => setIsForgotPanelOpen(false))
        }
    }


    const submitOnEnter = evt => {
        if (evt.key === 'Enter')
        {
            onSubmit()
        }
    }

    const forgotSubmitOnEnter = evt => {
        if (evt.key === 'Enter')
        {
            forgotOnSumbit()
        }
    }

    const [forgotEmail, setForgotEmail] = React.useState('')
    const [forgotEmailError, setForgotEmailError] = React.useState(false)
    const forgotEmailValidate = value => {
        const isError = !value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        setForgotEmailError(isError)
        return isError
    }

    const [isForgotPanelOpen, setIsForgotPanelOpen] = React.useState(false)

    return(
        <div style={styles.container} > 
       

            <Paper
            style={styles.paper}
            >
                <img 
                        style={styles.logo}
                        src={logo_start}
                        alt='logo'
                    />  
                <Typography
                align='center'
                variant='h4'
                color='secoundary'
                >
                    Zaloguj się
                </Typography>
                <TextField
                value={email}
                onChange={evt => {
                    setEmail(evt.target.value)
                    if(emailError){
                        emailValidate(evt.target.value)
                    } 
                }}
                onBlur={() => emailValidate(email)}
                onKeyPress={submitOnEnter}
                fullWidth={true}
                margin='normal'
                label='email'
                variant='outlined'
                error={emailError}
                helperText={emailError&& 'Podaj prawidłowy email'}
                />
                <TextField
                value={pwd}
                onChange={evt => {
                    setPwd(evt.target.value)
                    if(pwdValidate) {
                        pwdValidate(evt.target.value)
                    }
                }}
                onBlur={() => pwdValidate(pwd)}
                onKeyPress={submitOnEnter}
                fullWidth
                margin='normal'
                label='haslo'
                variant='outlined'
                type='password'
                error={pwdError}
                helperText={pwdError&& 'Podaj hasło'}
                />
                <div
                style={styles.buttonDiv}
                >
                    <Button
                    color='primary'
                    variant='contained'
                    onClick={onSubmit}
                    >
                        zaloguj
                    </Button>
                    <Button
                    color='secoundary'
                    variant='contained'
                    onClick={props.toggleForm}
                    >
                        rejestracja
                    </Button>
                    <Button
                    style={styles.forrgotToggleButton}
                    onClick={() => setIsForgotPanelOpen(!isForgotPanelOpen) }
                    >
                        Przywróc hasło
                    </Button>
                </div>
                <Collapse in={isForgotPanelOpen}>
                <TextField
                value={forgotEmail}
                onChange={evt => {
                    setForgotEmail(evt.target.value)
                    if(forgotEmailError){
                        forgotEmailValidate(evt.target.value)
                    } 
                }}
                onBlur={() => forgotEmailValidate(forgotEmail)}
                onKeyPress={forgotSubmitOnEnter}
                fullWidth={true}
                margin='normal'
                label='email'
                variant='outlined'
                error={forgotEmailError}
                helperText={forgotEmailError&& 'Podaj prawidłowy email'}
                />
                  <Button
                color='primary'
                variant='contained'
                fullWidth
                onClick={forgotOnSumbit}
                
                >
                    wyślij
                </Button>
                </Collapse>
              
            </Paper>
        </div>
    )
}

export default LogInForm