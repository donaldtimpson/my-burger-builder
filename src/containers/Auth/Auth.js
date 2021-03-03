import { useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import Button from "../../components/UI/Button/Button"
import Form from "../../components/UI/Form/Form"
import Spinner from "../../components/UI/Spinner/Spinner"
import { authenticate } from "../../store/actions/auth"
import classes from "./Auth.module.css"

function Auth(props) {
  const [isSignIn, updateSignIn] = useState(true)
  const form = {
    email: { 
      elementType: 'input', 
      config: { type: 'email', placeholder: 'Enter Email' }, 
      value: '',
      isDirty: false, 
      validation: { required: true, email: true }, 
      isValid: false,
      invalidText: null},
    password: { 
      elementType: 'input', 
      config: { type: 'password', placeholder: 'Enter Password' }, 
      value: '',
      isDirty: false, 
      validation: { required: true, minLength: 7 }, 
      isValid: false,
      invalidText: null},
  }

  const onSubmitHandler = (signInForm) => {
    props.authenticate(signInForm.email.value, signInForm.password.value, isSignIn)
  }

  if (props.token !== null) {
    if (props.buildingBurger) {
      return <Redirect to="/checkout"/>
    } else {
      return <Redirect to="/burger-builder"/>
    }
  }

  return <div className={classes.Auth}>
    <h3>Please Enter to {isSignIn ? 'Sign In' : 'Sign Up'}</h3>
    {props.loading 
    ? <Spinner /> 
    : <Form form={form} onSubmit={onSubmitHandler} submitTitle={isSignIn ? 'SIGN IN' : 'SIGN UP'}/>}
    <Button buttonType="Danger" onClick={() => updateSignIn(!isSignIn)}>{isSignIn ? 'SWITCH TO SIGN UP' : 'SWITCH TO SIGN IN'}</Button>
    {props.error ? <p className={classes.ValidationError}>{props.error}</p> : null}
  </div>
}

const mapStateToProps = state => {
  return { loading: state.auth.loading, error: state.auth.error, token: state.auth.token, buildingBurger: state.burger.building }
}

const mapDispatchToProps = dispatch => {
  return { 
    authenticate: (email, password, isSignIn) => dispatch(authenticate(email, password, isSignIn)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)