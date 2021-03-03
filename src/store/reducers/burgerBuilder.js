import * as actions from '../actions/actionTypes'

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
}

const initialState = { ingredients: null, price: 4, error: false, building: false }

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:          return changeIngredient(state, action, 1)
    case actions.REMOVE_INGREDIENT:       return changeIngredient(state, action, -1)
    case actions.SET_INGREDIENTS_FAILED:  return { ...state, error: true }
    case actions.SET_INGREDIENTS:         return setIngredients(state, action)
    default:                              return state
  }
}

const changeIngredient = (state, action, amount) => {
  const newIngredients = { ...state.ingredients }
  newIngredients[action.ingredient] += amount
  return { ...state, ingredients: newIngredients, price: state.price + amount*INGREDIENT_PRICE[action.ingredient], building: true }
}

const setIngredients = (state, action) => {
  const cost = Object.keys(action.ingredients).map(key => INGREDIENT_PRICE[key]).reduce((val, el) => val += el, 0) + 4.0
  return { ...state, error: false, price: cost, ingredients: action.ingredients, building: false }
}

export default burgerBuilderReducer