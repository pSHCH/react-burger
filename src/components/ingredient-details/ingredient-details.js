import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ingredientDetailsStyle from './ingredient-details.module.css';

function IngredientDetails({ id }) {
  const { ingredients } = useSelector(store => store.ingredients);
  const ingredient = ingredients.find(({ _id }) => _id === id)

  if (!ingredient) {
    return <h3 className={ingredientDetailsStyle.title}>Такого ингридиента нет</h3>
  }

  return ( 
    <div className={ingredientDetailsStyle.wrap}>
      <img src={ingredient?.image_large} alt={ingredient?.name} className={ingredientDetailsStyle.image} />
      <h3 className={ingredientDetailsStyle.title}>{ingredient?.name}</h3>
      <div className={ingredientDetailsStyle.details}>
        <div>
          <p className={ingredientDetailsStyle.name}>Калории,ккал</p>
          <p className={ingredientDetailsStyle.count}>{ingredient?.calories}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Белки, г</p>
          <p className={ingredientDetailsStyle.count}>{ingredient?.proteins}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Жиры, г</p>
          <p className={ingredientDetailsStyle.count}>{ingredient?.fat}</p>
        </div>
        <div>
          <p className={ingredientDetailsStyle.name}>Углеводы, г</p>
          <p className={ingredientDetailsStyle.count}>{ingredient?.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  id: PropTypes.string,
};

export default IngredientDetails;
