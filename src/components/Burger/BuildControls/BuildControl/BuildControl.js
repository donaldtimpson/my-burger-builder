import classes from './BuildControl.module.css';

function BuildControl(props) {
  return <div className={classes.BuildControl}>
    <div className={classes.Label}>{ props.title }</div>
    <button className={classes.Less} onClick={props.remove} disabled={props.removeDisabled}> Less </button>
    <button className={classes.More} onClick={props.add}> More </button>
  </div>
}

export default BuildControl;