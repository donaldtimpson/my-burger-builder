import { connect } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router-dom'
import CheckOutSummary from '../../components/CheckOut/CheckOutSummary/CheckOutSummary'
import { purchaseStarted } from '../../store/actions/orders'
import ContactData from '../ContactData/ContactData'
import classes from './Checkout.module.css'

function Checkout(props) {
  const cancelHandler = () => { 
    props.history.goBack()
  }
  const continueHandler = () => {
    props.purchaseStarted()
    props.history.replace('/checkout/contact-data')
  }
  if (!props.ingredients) {
    return <Redirect to="/"/>
  }

  return <div className={classes.Checkout}>
    <CheckOutSummary ingredients={props.ingredients} cancelHandler={cancelHandler} continueHandler={continueHandler} price={props.price}/>
    <Route path={props.match.url + '/contact-data'} component={ContactData}/>
  </div>
}

const mapStateToProps = state => {
  return { ingredients: state.burger.ingredients, price: state.burger.price }
}

const mapDispatchToProps = dispatch => {
  return { 
    purchaseStarted: () => dispatch(purchaseStarted()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))