import { ChangeEvent, useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import classes from './Form.module.css'

export interface IFormProps {
  className?: string | null;
  form: any;
  submitTitle: string;
  onSubmit: (formData: any) => void;
}

function Form({ className, form, submitTitle, onSubmit }: IFormProps) {
  const [formData, updateFormData] = useState(form)
  
  const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    let invalidText = null;
    if (rules.required) {
      isValid = value.trim() !== ''
      invalidText = isValid ? null : 'Field is required.'
    }
    if (isValid && rules.minLength) {
      isValid = value.length >= rules.minLength
      invalidText = isValid ? null : 'Must contain at least ' + rules.minLength + ' characters.'
    }
    if (isValid && rules.email) {
      isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
      invalidText = 'Must be a valid email'
    }
    if (isValid && rules.maxLength) {
      isValid = value.length <= rules.maxLength
      invalidText = isValid ? null : 'Must not contain more than ' + rules.maxLength + ' characters.'
    }
    return {isValid: isValid, invalidText: invalidText}
  }

  const inputChangedHandler = (inputIdentifier: string, event: ChangeEvent<HTMLSelectElement>) => {
    const state = { ...formData }
    const stateElement = { ...state[inputIdentifier] }
    stateElement.value = event.target.value
    stateElement.isDirty = true
    if (stateElement.validation) {
      let validityObject = checkValidity(stateElement.value, stateElement.validation)
      stateElement.isValid = validityObject.isValid
      stateElement.invalidText = validityObject.invalidText
    }
    state[inputIdentifier] = stateElement
    updateFormData(state)
  }
  
  const onSubmitHandler = (event: any) => {
    event.preventDefault()
    onSubmit(formData)
  }

  const formElements = []
  for (let key in formData) {
    formElements.push({
      id: key,
      config: formData[key],
    })
  }
  const formValid = formElements.map(el => el.config.isValid ?? true)
    .reduce((acc, val) => acc && val, true)

  return <div className={classes.ContactData}>
    <form onSubmit={onSubmitHandler}>
      {formElements.map(element => {
        return <Input 
          elementType={element.config.elementType} 
          elementConfig={element.config.config} 
          value={element.config.value} 
          key={element.id}
          isValid={(element.config.isValid ?? true) || element.config.isDirty === false}
          invalidText={element.config.invalidText}
          onChange={(event) => {inputChangedHandler(element.id, event)}}/>
      })}
      <Button buttonType="Success" disabled={!formValid}>{submitTitle}</Button>
    </form>
  </div>
}

export default Form