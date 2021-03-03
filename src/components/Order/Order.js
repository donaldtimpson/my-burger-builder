import classes from './Order.module.css'

function Order(props) {
  const ingredientsArray = []
  for (let ingredientName in props.ingredients) {
    ingredientsArray.push({amount: props.ingredients[ingredientName], name: ingredientName})
  }

  const ingredientOutput = ingredientsArray.map(ing => (
    <span key={ing.name}>{ing.name} ({ing.amount})</span>
  ))
  return <div className={classes.Order}>
    <p>Ingredients: {ingredientOutput}</p>
    <p><strong>Price: ${Number.parseFloat(props.price).toFixed(2)}</strong></p>
  </div>
}

export default Order