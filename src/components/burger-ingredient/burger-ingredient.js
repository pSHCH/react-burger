import React from 'react';
import cn from 'classnames';
import { DragIcon, LockIcon, DeleteIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


import burgerIngredientStyle from './burger-ingredient.module.css';

class BurgerIngredients extends React.Component {
  render() {
    console.log(this.props.data)

    const { name, image_mobile, price } = this.props.data

    return (
      <div className={burgerIngredientStyle.wrap}>
        {!this.props.top & !this.props.bottom ? <DragIcon type='primary'/> : null }
        <div className={cn(
          burgerIngredientStyle.item, {
            [burgerIngredientStyle['item--form-top']]: this.props.top,
            [burgerIngredientStyle['item--form-bottom']]: this.props.bottom
          }
      )}>
          <img className={burgerIngredientStyle.image} alt={name} src={image_mobile} />
          <h4 className={burgerIngredientStyle.title}>{name}</h4>
          <div className={burgerIngredientStyle.price}>
            <span className={burgerIngredientStyle.count}>{price}</span>
            <CurrencyIcon type='primary' />
          </div>

          <button className={burgerIngredientStyle.remove}>
            {this.props.top || this.props.bottom ? <LockIcon type='secondary' /> : <DeleteIcon type='primary' />}
          </button>
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;