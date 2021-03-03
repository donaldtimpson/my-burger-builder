import classes from "./Input.module.css";

function Input(props) {
  let inputElement = null
  let validationError = null;
  const inputClasses = [classes.InputElement]
  
  if (props.isValid === false) {
    inputClasses.push(classes.Invalid)
    if (props.invalidText) {
      validationError = <p className={classes.ValidationError}>{props.invalidText}</p>;
    }
  }

  switch (props.elementType) {
    case ('textarea'):
      inputElement = <textarea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}/>
      break
    case ('select'):
      inputElement = <select className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}>
        {props.elementConfig.options.map(option => {
          return <option value={option} key={option}>{option}</option>
        })}
      </select>
      break
    default:
      inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.onChange}/>
  }
  
  return <div className={classes.Input}>
    <label className={classes.label}>{props.label}</label>
    {inputElement} 
    {validationError}
  </div>
}

export default Input