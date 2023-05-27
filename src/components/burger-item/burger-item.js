import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { INGREDIENTS_MODAL_OPEN } from '../../services/actions';
import { ingredientType } from '../../utils/types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import burgerItemStyle from './burger-item.module.css';

function BurgerItem(props) {
  const { image_large, name, price, _id } = props.item;
  const dispatch = useDispatch();
  let location = useLocation();
  const ingredientsInCart = useSelector(store => store.cart.ingredientsInCart);
  const ingredientsCount = ingredientsInCart.filter(item => item._id === _id).length;
  
  const setModalData = () => {

    dispatch({ type: INGREDIENTS_MODAL_OPEN, ingredient: props.item })
    props.openModal('ingredient');
  }

  const [, drag] = useDrag({
    type: 'item',
    item: props.item,
  });

  return (
    <li className={burgerItemStyle.wrap}ref={drag} onClick={() => setModalData()}>
      <Link
        to={`/ingredients/${_id}`}
        className={burgerItemStyle.link}
        state={{ backgroundLocation: location }}
      >
        {ingredientsCount > 0 && <Counter count={ingredientsCount} size='default' extraClass='m-1' />}
        <img className={burgerItemStyle.image} src={image_large} alt={name}/>
        <div className={burgerItemStyle.info}>
          <span className={burgerItemStyle.count}>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={burgerItemStyle.title}>{name}</h4>
      </Link>
    </li>
  );
}

BurgerItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  item: PropTypes.shape(ingredientType).isRequired,
};

export default BurgerItem;