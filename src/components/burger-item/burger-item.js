import PropTypes from 'prop-types';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import burgerItemStyle from './burger-item.module.css';

function BurgerItem(props) {

  const { image_large, name, price } = props.item;

  return (
    <li className={burgerItemStyle.wrap} onClick={() => props.openModal('ingredient', props.item)}>
      <Counter count={1} size='default' extraClass='m-1' />
      <img className={burgerItemStyle.image} src={image_large} alt={name}/>
      <div className={burgerItemStyle.info}>
        <span className={burgerItemStyle.count}>{price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h4 className={burgerItemStyle.title}>{name}</h4>
    </li>
  );
}


BurgerItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  item: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default BurgerItem;