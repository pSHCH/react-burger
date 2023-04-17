import PropTypes from 'prop-types';
import cn from 'classnames';
import { useMemo, useContext } from 'react';
import { DataContext } from '../../utils/productsContext';
import BurgerSection from '../burger-section/burger-section';
import Tabs from '../tabs/tabs';

import burgerIngredientsStyle from './burger-ingredients.module.css';

function BurgerIngredients(props) {

  const { state } = useContext(DataContext);
  const data = state?.data?.data;

  const bun = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
  const main = useMemo(() =>data.filter(item => item.type === 'main'), [data]);
  const sauce = useMemo(() => data.filter(item => item.type === 'sauce'), [data]);

  return (
    <>
      <h1 className={burgerIngredientsStyle.title}>Соберите бургер</h1>

      <Tabs />

      <div className={cn(burgerIngredientsStyle.sectons, 'custom-scroll')}>
        <BurgerSection title='Булки' data={bun} openModal={props.openModal}/>
        <BurgerSection title='Соусы' data={main} openModal={props.openModal}/>
        <BurgerSection title='Начинки' data={sauce} openModal={props.openModal}/>
      </div>
    </>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;