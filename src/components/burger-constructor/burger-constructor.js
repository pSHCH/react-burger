import PropTypes from 'prop-types';
import { useMemo, useContext } from 'react';
import { DataContext } from '../../utils/productsContext';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Total from '../total/total'

import burgerConstructorStyle from './burger-constructor.module.css';

function BurgerConstructor(props) {

  const { state } = useContext(DataContext);
  const data = state?.data?.data;

  const bunIngredient = useMemo(() => data.filter(item => item.type === 'bun'), [data]);
  const wrapIngredient = bunIngredient[0];
  const innerIngrediens = useMemo(() => data.filter(item => item.type !== 'bun'), [data]);
  const totalIngredients = useMemo(() => innerIngrediens.reduce(function(sum, item) {
    return sum + item.price;
  }, 0), [innerIngrediens]);
  const totalWrapIngredients = useMemo(() => wrapIngredient.price * 2, [wrapIngredient]);
  const total = totalIngredients + totalWrapIngredients;

  return (
    <>
      <div className={burgerConstructorStyle.burger}>
        <BurgerIngredient top data={wrapIngredient}/>
        <div className={cn(burgerConstructorStyle.sectons, 'custom-scroll')}>
          {useMemo(() => innerIngrediens.map(item => <BurgerIngredient data={item} key={item._id}/>), [innerIngrediens])}
        </div>
        <BurgerIngredient bottom data={wrapIngredient}/>
      </div>
      <Total total={total} openModal={props.openModal}/>
    </>
  );
}


BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;