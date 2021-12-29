import React from 'react'
import { connect } from 'react-redux'
import {registerCreator, logInCreator, resetPasswordCreator} from '../state/auth'
import LogInForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Auth = props => {

    const [toggleForm, setToggleForm] = React.useState(true)

    return(
        props._isLogged ?
        props.children
        :
        toggleForm ? 
        <LogInForm
        toggleForm={() => setToggleForm(false)}
        _logIn={props._logIn}
        _resetPassword={props._resetPassword}
        />
        :
        <RegisterForm
        toggleForm={() => setToggleForm(true)}
        _register={props._register}
        />

    )
}
const mapStateToProps = state => ({
    _isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
    _register: (email, password) => dispatch(registerCreator(email, password)),
    _logIn: (email, password) => dispatch(logInCreator(email, password)),
    _resetPassword: (email, success) => dispatch(resetPasswordCreator(email, success))
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Auth)