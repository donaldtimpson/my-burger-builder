import Logo from '../../Logo/Logo'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'

function SideDrawer(props) {
  return <>
    <Backdrop show={props.show} onClick={props.toggle}/>
    <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')} onClick={props.toggle}>
      <div className={classes.Logo}><Logo/></div>
      <nav>
        <NavigationItems auth={props.auth} logout={props.logout}/>
      </nav>
    </div>
  </>
}

export default SideDrawer