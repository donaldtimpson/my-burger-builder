import { useState } from 'react';
import { connect } from 'react-redux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { logout } from '../../store/actions/auth';
import classes from './Layout.module.css';

const Layout = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const toggleSideDrawer = () => {
    setSideDrawerOpen(!sideDrawerOpen)
  }

  return <>
    <Toolbar toggleSideDrawer={toggleSideDrawer} auth={props.auth} logout={props.logout}/>
    <SideDrawer show={sideDrawerOpen} toggle={toggleSideDrawer} auth={props.auth} logout={props.logout}/>
    <main className={classes.Content}>
      {props.children}
    </main>
  </>
}

const mapStateToProps = state => {
  return { auth: state.auth.token !== null }
}

const mapDispatchToProps = dispatch => {
  return { 
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);