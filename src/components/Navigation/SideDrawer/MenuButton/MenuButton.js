import classes from './MenuButton.module.css'

function MenuButton(props) {
  return <div className={classes.MenuButton} onClick={props.onClick}>
    <div/>
    <div/>
    <div/>
  </div>
}

export default MenuButton