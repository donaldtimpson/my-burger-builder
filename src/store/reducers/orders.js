import * as actions from '../actions/actionTypes'

const initialState = {orders: [], loading: false, purchased: false}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_STARTED:        return { ...state, purchased: false }
    case actions.ORDER_LOADING_START:     return { ...state, loading: true }
    case actions.PURCHASE_BURGER_SUCCESS: return { loading: false, orders: state.orders.concat(action.order), purchased: true }
    case actions.PURCHASE_BURGER_FAILED:  return { ...state, loading: false }
    case actions.SET_ORDERS:              return { ...state, orders: action.orders, loading: false }
    case actions.SET_ORDERS_FAILED:       return { ...state, loading: false }
    default:                              return state
  }
}

export default ordersReducer