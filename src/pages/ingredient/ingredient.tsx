import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../index';
import { INGREDIENTS_MODAL_OPEN } from '../../services/actions';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Template from '../../components/template/template';

import ingredientStyles from './ingredient.module.css';

interface IIngredientPage {
  itemId?: string;
};

export const IngredientPage = ({ itemId }: IIngredientPage) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const itemIndicator = itemId || id;

  useEffect(() => {
    if(ingredients.length > 0) {
      const item = ingredients.find(({ _id }) => _id === itemIndicator);
  
      !!item && dispatch({ type: INGREDIENTS_MODAL_OPEN, ingredient: item })
    }
  }, [dispatch, ingredients, itemIndicator]);

  return (
    <Template>
      <main className={ingredientStyles.grid}>
        <h1 className={ingredientStyles.title}>Детали ингредиента</h1>
        {!!itemIndicator && <IngredientDetails id={itemIndicator}/>}
      </main>
    </Template>
  );
}