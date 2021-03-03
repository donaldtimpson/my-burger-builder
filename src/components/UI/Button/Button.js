import classes from './Button.module.css'

function Button(props) {
  return <button className={[classes.Button, classes[props.buttonType]].join(' ')} onClick={props.onClick} disabled={props.disabled}>
    {props.children}
  </button> 
}

export default Button