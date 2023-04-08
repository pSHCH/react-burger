import PropTypes from 'prop-types';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Total from '../total/total'

import burgerConstructorStyle from './burger-constructor.module.css';

function BurgerConstructor(props) {

  const data = props.data;
  const wrapIngredient = data[0];
  const totalIngredients = data.reduce(function(sum, item) {
    return sum + item.price;
  }, 0);
  const totalWrapIngredients = wrapIngredient.price * 2;
  const total = totalIngredients + totalWrapIngredients;

  return (
    <>
      <div className={burgerConstructorStyle.burger}>
        <BurgerIngredient top data={wrapIngredient}/>
        <div className={cn(burgerConstructorStyle.sectons, 'custom-scroll')}>
          {data.map(item => <BurgerIngredient data={item} key={item._id}/>)}
        </div>
        <BurgerIngredient bottom data={wrapIngredient}/>
      </div>
      <Total total={total} openModal={props.openModal}/>
    </>
  );
}


BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default BurgerConstructor;