import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { initOrders } from '../../store/actions/orders';

function Orders(props) {
  useEffect(() => {
    props.initOrders(props.token, props.userId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var orderComponets = props.orders.map(order => {
    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
  })
  if (props.loading) {
    orderComponets = <Spinner/>
  }

  return <div>{orderComponets}</div>
}

const mapStateToProps = state => {
  return { orders: state.orders.orders, loading: state.orders.loading, token: state.auth.token, userId: state.auth.userId }
}
const mapDispatchToProps = dispatch => {
  return {
    initOrders: (token, userId) => dispatch(initOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))