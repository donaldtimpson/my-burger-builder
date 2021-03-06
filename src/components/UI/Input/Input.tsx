import { ChangeEvent } from "react";
import classes from "./Input.module.css";

export interface IInputProps {
  className?: string | null;
  isValid: boolean;
  invalidText: string | null;
  elementType: string;
  elementConfig: any;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

const Input = ({ className, isValid, invalidText, elementType, elementConfig, value, onChange, label }:IInputProps) => {
  const compClass = [classes.InputElement, className].join(' ')
  let inputElement = null
  let validationError = null;
  const inputClasses = [compClass]
  
  if (isValid === false) {
    inputClasses.push(classes.Invalid)
    if (invalidText) {
      validationError = <p className={classes.ValidationError}>{invalidText}</p>;
    }
  }

  switch (elementType) {
    case ('textarea'):
      inputElement = <textarea {...elementConfig} className={inputClasses.join(' ')} value={value} onChange={onChange}/>
      break
    case ('select'):
      inputElement = <select className={inputClasses.join(' ')} value={value} onChange={onChange}>
        {(elementConfig.options as string[]).map(option => {
          return <option value={option} key={option}>{option}</option>
        })}
      </select>
      break
    default:
      inputElement = <input {...elementConfig} className={inputClasses.join(' ')} value={value} onChange={onChange}/>
  }
  
  return <div className={classes.Input}>
    <label className={classes.Label}>{label}</label>
    {inputElement} 
    {validationError}
  </div>
}

export default Input