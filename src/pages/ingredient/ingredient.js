import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, INGREDIENTS_MODAL_OPEN } from '../../services/actions';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import Template from '../../components/template/template';

import ingredientStyles from './ingredient.module.css';

export function IngredientPage({ itemId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const itemIndicator = itemId || id;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);


  useEffect(() => {
    if(ingredients.length > 0) {
      const item = ingredients.find(({ _id }) => _id === itemIndicator);
  
      dispatch({ type: INGREDIENTS_MODAL_OPEN, ingredient: item })
    }
  }, [dispatch, ingredients, itemIndicator]);

  return (
    <Template>
      <main className={ingredientStyles.grid}>
        <h1 className={ingredientStyles.title}>Детали ингредиента</h1>
        <IngredientDetails id={itemIndicator}/>
      </main>
    </Template>
  );
}

IngredientPage.propTypes = {
  itemId: PropTypes.string,
};

