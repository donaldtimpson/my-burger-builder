import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import classes from './App.module.css';
import Spinner from './components/UI/Spinner/Spinner';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import { checkAuthState } from './store/actions/auth';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))
const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Auth = React.lazy(() => import('./containers/Auth/Auth'))

function App(props) {
  props.checkAuthState()
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/burger-builder" component={BurgerBuilder} />
          {props.auth ? <Route path="/checkout" render={() => <Suspense fallback={<Spinner />}><Checkout /></Suspense>} /> : null}
          {props.auth ? <Route path="/orders" render={() => <Suspense fallback={<Spinner />}><Orders /></Suspense>} /> : null}
          <Route path="/authentication" render={() => <Suspense fallback={<Spinner />}><Auth /></Suspense>} />
          <Redirect from="/" to="/burger-builder" />
        </Switch>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return { auth: state.auth.token !== null }
}

const mapDispatchToProps = dispatch => {
  return { 
    checkAuthState: () => dispatch(checkAuthState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));