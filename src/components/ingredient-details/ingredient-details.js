import PropTypes from 'prop-types';

import ingredientDetailsStyle from './ingredient-details.module.css';


function IngredientDetails(props) {
  return ( 
    <div className={ingredientDetailsStyle.wrap}>
      <img src={props.item.image_large} alt={props.item.name} className={ingredientDetailsStyle.image} />
      <h3 className={ingredientDetailsStyle.title}>{props.item.name}</h3>
      <div className={ingredientDetailsStyle.details}>
        <div>
          <p className={ingredientDetailsStyle.name}>Калории,ккал</p>
          <p className={ingredientDetailsStyle.count}>{props.item.calories}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Белки, г</p>
          <p className={ingredientDetailsStyle.count}>{props.item.proteins}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Жиры, г</p>
          <p className={ingredientDetailsStyle.count}>{props.item.fat}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Углеводы, г</p>
          <p className={ingredientDetailsStyle.count}>{props.item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  item: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
  }).isRequired,  

};

export default IngredientDetails;
