import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

function NavigationItems(props) {
  return <ul className={classes.NavigationItems}>
    <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
    {props.auth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    { props.auth 
    ? <NavigationItem link="/authentication" onClick={props.logout}>Logout</NavigationItem> 
    : <NavigationItem link="/authentication">Sign In</NavigationItem>}
  </ul>
}

export default NavigationItems