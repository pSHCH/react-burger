import PropTypes from 'prop-types';
import cn from 'classnames';
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_TAB_ACTIVE } from '../../services/actions';
import { useInView } from 'react-intersection-observer';
import BurgerSection from '../burger-section/burger-section';
import Tabs from '../tabs/tabs';

import burgerIngredientsStyle from './burger-ingredients.module.css';

function BurgerIngredients(props) {
  const dispatch = useDispatch(); 
  const { ingredients } = useSelector(store => store.ingredients);

  const [bunRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [sauceRef, inViewSauce] = useInView({
    threshold: 0,
  });
  const [mainRef, inViewMain] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(inViewBuns) {
      dispatch({ type: SET_TAB_ACTIVE, tab: 'bun' });
    }
    else if(inViewSauce) {
      dispatch({ type: SET_TAB_ACTIVE, tab: 'sauce' });
    }
    else if(inViewMain) {
      dispatch({ type: SET_TAB_ACTIVE, tab: 'main' });
    }
  });


  const bun = useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
  const main = useMemo(() =>ingredients.filter(item => item.type === 'main'), [ingredients]);
  const sauce = useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);

  return (
    <section>
      <h1 className={burgerIngredientsStyle.title}>Соберите бургер</h1>

      <Tabs />

      <div className={cn(burgerIngredientsStyle.sectons, 'custom-scroll')}>
        <BurgerSection title='Булки' data={bun} openModal={props.openModal} refElem={bunRef}/>
        <BurgerSection title='Начинки' data={main} openModal={props.openModal} refElem={mainRef}/>
        <BurgerSection title='Соусы' data={sauce} openModal={props.openModal} refElem={sauceRef}/>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;