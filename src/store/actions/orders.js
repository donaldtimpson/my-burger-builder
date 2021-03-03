import axios from '../../axios-orders'
import * as actions from './actionTypes'

export const purchaseStarted = () => {
  return { type: actions.PURCHASE_STARTED }
}

const orderLoadingStatr= () => {
  return { type: actions.ORDER_LOADING_START }
}

const purchaseBurgerSuccess = (id, orderData) => {
  return { type: actions.PURCHASE_BURGER_SUCCESS, order: { ...orderData, id: id } }
}

const purchaseBurgerFailed = (error) => {
  return { type: actions.PURCHASE_BURGER_FAILED, error: error }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(orderLoadingStatr())
    axios.post('/orders.json?auth=' + token, orderData).then(response => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    }).catch( error => {
      dispatch(purchaseBurgerFailed(error))
    })
  }
}

const setOrders = (orders) => {
  return { type: actions.SET_ORDERS, orders: orders }
}

const setOrdersFailed = (error) => {
  return { type: actions.SET_ORDERS_FAILED, error: error }
}

export const initOrders = (token, userId) => {
  return dispatch => {
    const queryParams = 'auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios.get('/orders.json?' + queryParams).then(response => {
      dispatch(orderLoadingStatr())
      const fetchedOrders = []

      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        })
      }
      dispatch(setOrders(fetchedOrders))
    }).catch(error => { 
      dispatch(setOrdersFailed(error))
    })
  }
}