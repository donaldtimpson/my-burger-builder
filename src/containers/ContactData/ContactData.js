import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from '../../axios-orders';
import Form from '../../components/UI/Form/Form';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../store/actions/orders';
import classes from './ContactData.module.css';

function ContactData(props) {
  const form = {
    name: { 
      elementType: 'input', 
      config: { type: 'text', placeholder: 'Enter Name' }, 
      value: '',
      isDirty: false, 
      validation: { required: true }, 
      isValid: false,
      invalidText: null},
    email: { 
      elementType: 'input', 
      config: { type: 'email', placeholder: 'Enter Email' }, 
      value: props.email,
      isDirty: true, 
      validation: { required: true, email: true }, 
      isValid: true,
      invalidText: null},
    street: { 
      elementType: 'input', 
      config: { type: 'text', placeholder: 'Street Address' }, 
      value: '',
      isDirty: false, 
      validation: { required: true }, 
      isValid: false,
      invalidText: null},
    city: { 
      elementType: 'input', 
      config: { type: 'text', placeholder: 'City' }, 
      value: '',
      isDirty: false, 
      validation: { required: true }, 
      isValid: false,
      invalidText: null},
    state: { 
      elementType: 'input', 
      config: { type: 'text', placeholder: 'State' }, 
      value: '',
      isDirty: false, 
      validation: { required: true }, 
      isValid: false,
      invalidText: null},
    zipCode: { 
      elementType: 'input', 
      config: { type: 'text', 
      placeholder: 'Postal Code' }, 
      value: '',
      isDirty: false, 
      validation: { required: true, minLength: 5, maxLength: 5 }, 
      isValid: false,
      invalidText: null},
    deliveryMethod: { 
      elementType: 'select', 
      config: { options: ['Fastest', 'Cheapest'] }, 
      value: 'Fastest',
      isDirty: true},
  }

  const onSubmitHandler = (orderForm) => {
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      deliveryMethod: orderForm.deliveryMethod.value,
      userId: props.userId,
      customer: {
        name: orderForm.name.value,
        email: orderForm.email.value,
        address: {
          street: orderForm.street.value,
          city: orderForm.city.value,
          state: orderForm.state.value,
          zipCode: orderForm.zipCode.value,
        }
      },
    }
    props.purchaseBurger(order, props.token)
  }

  if (props.purchased) {
    return <Redirect to="/"/>
  }

  return <div className={classes.ContactData}>
    <h4>Enter your Contact Data</h4>
    {props.loading 
    ? <Spinner /> 
    : <Form form={form} onSubmit={onSubmitHandler} submitTitle={'ORDER'}/>}
  </div>
}

const mapStateToProps = state => {
  return { 
    ingredients: state.burger.ingredients, 
    price: state.burger.price, 
    loading: state.orders.loading, 
    purchased: state.orders.purchased, 
    token: state.auth.token, 
    userId: state.auth.userId,
    email: state.auth.email,
  }
}

const mapDispatchToProps = dispatch => {
  return { 
    purchaseBurger: (order, token) => dispatch(purchaseBurger(order, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios))