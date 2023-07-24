import React from 'react';
import { useSelector } from '../../index';

import ingredientDetailsStyle from './ingredient-details.module.css';

interface IIngredientDetails {
  id?: string;
};

const IngredientDetails: React.FC<IIngredientDetails> = ({ id }) => {
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

export default IngredientDetails;
