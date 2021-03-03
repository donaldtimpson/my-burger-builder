import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckOutSummary.module.css'

function CheckOutSummary(props) {
  return <div className={classes.CheckOutSummary}>
    <h1>We hope is tastes well!</h1>
    <div style={{width: '100%', margin: 'auto', alignContent: 'left'}}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <p><strong>Price: ${props.price.toFixed(2)}</strong></p>
    <Button buttonType="Danger" onClick={props.cancelHandler}>CANCEL</Button>
    <Button buttonType="Success" onClick={props.continueHandler}>CONTINUE</Button>
  </div>
}

export default CheckOutSummary