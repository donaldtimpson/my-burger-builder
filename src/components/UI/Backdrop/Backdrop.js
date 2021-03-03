import classes from './Backdrop.module.css'

function Backdrop(props) {
  // const backdropClasses = [classes.Backdrop, props.show ? classes.BackdropOpen : classes.BackdropClose]
  // return <div className={backdropClasses.join(' ')}></div>

  return props.show ? <div className={classes.Backdrop} onClick={props.onClick}/> : null
}

export default Backdrop