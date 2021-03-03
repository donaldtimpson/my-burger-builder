import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import MenuButton from '../SideDrawer/MenuButton/MenuButton'
import classes from './Toolbar.module.css'

function Toolbar(props) {
  return <header className={classes.Toolbar}>
    <MenuButton onClick={props.toggleSideDrawer}/>
    <div className={classes.Logo}><Logo/></div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems auth={props.auth} logout={props.logout}/>
    </nav>
  </header>
}

export default Toolbar