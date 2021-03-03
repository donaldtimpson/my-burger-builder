import * as actions from '../actions/actionTypes'
import authReducer from './auth'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({ token: null, userId: null, email: null, error: null, loading: false })
  })

  it('should store token upon login', () => {
    const state = { token: null, userId: null, email: null, error: null, loading: false }
    const action = { type: actions.AUTH_SUCCESS, token: 'token', userId: 'userId', email: 'email' }
    expect(authReducer(state, action)).toEqual({ token: 'token', userId: 'userId', email: 'email', error: null, loading: false })
  })
})