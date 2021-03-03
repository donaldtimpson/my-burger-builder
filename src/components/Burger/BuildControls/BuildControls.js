import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const controls = [
  { title: 'Salad', type: 'salad' },
  { title: 'Bacon', type: 'bacon' },
  { title: 'Cheese', type: 'cheese' },
  { title: 'Meat', type: 'meat' },
]

function BuildControls(props) {
  const orderDisabled = Object.keys(props.disabledControls).map(key => {
    return props.disabledControls[key]
  }).reduce((val, el) => {
    return val && el
  }, true)
  return <div className={classes.BuildControls}>
    <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map((control) => {
      return <BuildControl 
        key={control.title} 
        title={control.title} 
        add={() => { props.addIngredient(control.type) }} 
        remove={() => { props.removeIngredient(control.type) }}
        removeDisabled={props.disabledControls[control.type]}/>
    })}
    <button className={classes.OrderButton} disabled={orderDisabled} onClick={props.orderNowPressed}>
      {props.auth ? 'ORDER NOW' : 'SIGN IN TO ORDER' }
    </button>
  </div>
}

export default BuildControls