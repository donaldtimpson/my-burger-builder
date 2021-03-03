import * as actions from '../actions/actionTypes'

const initialState = { token: null, userId: null, email: null, error: null, loading: false }

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_STARTED: return { ...state, loading: true, error: null }
    case actions.AUTH_SUCCESS: return { ...state, loading: false, token: action.token, userId: action.userId, email: action.email }
    case actions.AUTH_FAILED:  return { ...state, loading: false, error: action.error }
    case actions.LOGOUT:       return { ...state, token: null, userId: null, email: null }
    default:                   return state
  }
}

export default authReducer