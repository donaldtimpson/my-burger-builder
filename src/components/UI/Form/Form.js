import { useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import classes from './Form.module.css'

function Form(props) {
  const [formData, updateFormData] = useState(props.form)
  
  const checkValidity = (value, rules) => {
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

  const inputChangedHandler = (inputIdentifier, event) => {
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
  
  const onSubmitHandler = (event) => {
    event.preventDefault()
    props.onSubmit(formData)
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
      <Button buttonType="Success" disabled={!formValid}>{props.submitTitle}</Button>
    </form>
  </div>
}

export default Form