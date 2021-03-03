import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const INGREDIENT_POSITION = {salad: 0, bacon: 1, cheese: 2, meat: 3}

function Burger(props) {
  let sortedKeys = Object.keys(props.ingredients)
  sortedKeys = sortedKeys.sort((el1, el2) => INGREDIENT_POSITION[el1] - INGREDIENT_POSITION[el2])
  var ingredients = sortedKeys.map(key => {
    return [...Array(props.ingredients[key])].map((_, index) => {
      return <BurgerIngredient key={key + index} type={key} />
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);
  if (ingredients.length === 0) {
    ingredients = <p>Pleas start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger;