import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

function NavigationItem(props) {
  return <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active} onClick={props.onClick}>
      {props.children}
    </NavLink>
  </li>
}

export default NavigationItem