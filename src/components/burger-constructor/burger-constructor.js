import React from 'react';
import cn from 'classnames';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Total from '../total/total'

import burgerConstructorStyle from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
  render() {
    const data = this.props.data;

    return (
      <>
        <div className={burgerConstructorStyle.burger}>
          <BurgerIngredient top  data={data[0]}/>
          <div className={cn(burgerConstructorStyle.sectons, 'custom-scroll')}>
            {data.map(item => <BurgerIngredient data={item} key={item._id}/>)}
          </div>
          <BurgerIngredient bottom data={data[0]}/>
        </div>
        <Total />
      </>
    );
  }
}

export default BurgerConstructor;