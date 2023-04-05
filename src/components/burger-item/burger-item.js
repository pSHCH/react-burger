import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import burgerItemStyle from './burger-item.module.css';

class BurgerItem extends React.Component {
  render() {
    const { image_large, name, price } = this.props.item;

    return (
      <li className={burgerItemStyle.wrap}>
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
}

export default BurgerItem;