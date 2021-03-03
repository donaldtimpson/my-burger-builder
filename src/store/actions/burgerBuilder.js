import axios from '../../axios-orders'
import * as actions from './actionTypes'

export const addIngredient = (ingredient) => {
  return { type: actions.ADD_INGREDIENT, ingredient: ingredient }
}

export const removeIngredient = (ingredient) => {
  return { type: actions.REMOVE_INGREDIENT, ingredient: ingredient }
}

const setIngredients = (ingredients) => {
  return { type: actions.SET_INGREDIENTS, ingredients: ingredients }
}

const setIngredientsFailed = () => {
  return { type: actions.SET_INGREDIENTS_FAILED }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('ingredients.json').then(response => {
      dispatch(setIngredients(response.data))
    }).catch(error => { 
      dispatch(setIngredientsFailed())
    })
  }
}