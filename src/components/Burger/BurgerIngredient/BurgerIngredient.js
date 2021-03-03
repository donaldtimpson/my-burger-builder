import PropTypes from 'prop-types';
import classes from './BurgerIngredient.module.css';

function BurgerIngredient(props) {
  let ingredient = null
  switch (props.type) {
    case ('bread-top'): 
      ingredient = (
        <div className={ classes.BreadTop }>
          <div classes={ classes.Seeds1 }></div>
          <div classes={ classes.Seeds2 }></div>
        </div>
      );
      break;
    case ('salad'): 
      ingredient = <div className={ classes.Salad } />;
      break;
    case ('bacon'): 
      ingredient = <div className={ classes.Bacon } />;
      break;
    case ('cheese'): 
      ingredient = <div className={ classes.Cheese } />;
      break;
    case ('meat'): 
      ingredient = <div className={ classes.Meat } />;
      break;
    case ('bread-bottom'): 
      ingredient = <div className={ classes.BreadBottom } />;
      break;
    default:
      console.assert(false);
  }
  
  return ingredient
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
}

export default BurgerIngredient;