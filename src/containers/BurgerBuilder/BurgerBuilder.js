import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { addIngredient, initIngredients, removeIngredient } from '../../store/actions/burgerBuilder';

export const BurgerBuilder = (props) => {
  useEffect(() => {
    props.initIngredients()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [purchasing, updatePurchasing] = useState({ purchasing: false })
  const startPurchasing = () => {
    if (props.auth) {
      updatePurchasing({purchasing: true})
    } else {
      props.history.push('/authentication')
    }
  }
  const endPurchasing = () => {
    updatePurchasing({purchasing: false})
  }
  
  const disabledControls = {...props.ingredients}
  for (let key in disabledControls) {
    disabledControls[key] = disabledControls[key] === 0
  }

  let orderSummary = <OrderSummary 
      ingredients={props.ingredients ?? {}} 
      cancelHandler={endPurchasing} 
      continueHandler={() => {props.history.push('/checkout')}}
      price={props.price}/>
  let burger = props.ingredients ? <>
    <Burger ingredients={ props.ingredients } />
    <BuildControls 
      addIngredient={props.addIngredient} 
      removeIngredient={props.removeIngredient} 
      disabledControls={disabledControls}
      orderNowPressed={startPurchasing}
      price={props.price}
      auth={props.auth}/>
  </> : <Spinner/>

  return <>
    <Modal show={purchasing.purchasing} onClick={endPurchasing}>
      {orderSummary}
    </Modal>
    {props.error ? <p>Failed to load ingredients</p> : burger}
  </>
}

const mapStateToProps = state => {
  return { ingredients: state.burger.ingredients, price: state.burger.price, error: state.burger.error, auth: state.auth.token !== null}
}
const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
    removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
    initIngredients: () => dispatch(initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), axios));