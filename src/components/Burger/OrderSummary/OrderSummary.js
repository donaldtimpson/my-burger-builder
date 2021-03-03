import Button from '../../UI/Button/Button'

function OrderSummary(props) {
  const ingredients = Object.keys(props.ingredients).map((key) => {
    return <li key={key}>
      <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
    </li>
  })

  return <>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      { ingredients }
    </ul>
    <p><strong>Price: ${props.price.toFixed(2)}</strong></p>
    <p>Continue to purchase?</p>
    <Button buttonType="Danger" onClick={props.cancelHandler}>CANCEL</Button>
    <Button buttonType="Success" onClick={props.continueHandler}>CONTINUE</Button>
  </>
}

export default OrderSummary