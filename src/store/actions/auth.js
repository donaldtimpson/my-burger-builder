import axios from 'axios'
import * as actions from './actionTypes'
const apiKey = 'AIzaSyDUoif9z0MUe7CEIMcemTzkgf5weitgGgA'

const authStarted = () => {
  return { type: actions.AUTH_STARTED }
}

const authSuccess = (token, userId, email) => {
  return { type: actions.AUTH_SUCCESS, token: token, userId: userId, email: email }
}

const authFailed = (error) => {
  return { type: actions.AUTH_FAILED, error: error }
}

export const logout = () => {
  return (dispatch, getState) => {
    getState().burger.building = false
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('experationDate')
    dispatch({ type: actions.LOGOUT })
  }
}

const checkAuthTimeout = (time) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time)
  }
}

export const authenticate = (email, password, isSignIn) => {
  return dispatch => {
    dispatch(authStarted())
    const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey
    const signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    axios.post(isSignIn ? signInUrl : signUpUrl, authData).then((response) => {
      dispatch(authSuccess(response.data.idToken, response.data.localId, email))
      dispatch(checkAuthTimeout(response.data.expiresIn * 1000))

      const experationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
      localStorage.setItem('token', response.data.idToken)
      localStorage.setItem('userId', response.data.localId)
      localStorage.setItem('email', email)
      localStorage.setItem('experationDate', experationDate)
    }).catch(error => {
      dispatch(authFailed(error.response.data.error.message))
    })
  }
}

export const checkAuthState = () => {
  return (dispatch, getState) => { 
    if (!getState().auth.token) {
      const experationDate = new Date(localStorage.getItem('experationDate'))
      const timeDiff = experationDate.getTime() - new Date().getTime()
      if (timeDiff > 0) {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        const email = localStorage.getItem('email')
        dispatch(authSuccess(token, userId, email))
        dispatch(checkAuthTimeout(timeDiff))
      }
    }
  }
}