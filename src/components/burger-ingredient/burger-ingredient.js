import PropTypes from 'prop-types';
import cn from 'classnames';
import { DragIcon, LockIcon, DeleteIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


import burgerIngredientStyle from './burger-ingredient.module.css';

function BurgerIngredients(props) {

  const { name, image_mobile, price } = props.data;

  return (
    <div className={burgerIngredientStyle.wrap}>
      {!props.top & !props.bottom ? <DragIcon type='primary'/> : null }
      <div className={cn(
        burgerIngredientStyle.item, {
          [burgerIngredientStyle['item--form-top']]: props.top,
          [burgerIngredientStyle['item--form-bottom']]: props.bottom
        }
    )}>
        <img className={burgerIngredientStyle.image} alt={name} src={image_mobile} />
        <h4 className={burgerIngredientStyle.title}>{name}</h4>
        <div className={burgerIngredientStyle.price}>
          <span className={burgerIngredientStyle.count}>{price}</span>
          <CurrencyIcon type='primary' />
        </div>

        <button className={burgerIngredientStyle.remove}>
          {props.top || props.bottom ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
        </button>
      </div>
    </div>
  );
}


BurgerIngredients.propTypes = {
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  data: PropTypes.shape({
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default BurgerIngredients;