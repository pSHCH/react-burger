import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import BurgerSection from '../burger-section/burger-section';
import Tabs from '../tabs/tabs';

import burgerIngredientsStyle from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
  render() {
    const data = this.props.data;
    const bun = data.filter(item => item.type === 'bun');
    const main = data.filter(item => item.type === 'main');
    const sauce = data.filter(item => item.type === 'sauce');

    return (
      <>
        <h1 className={burgerIngredientsStyle.title}>Соберите бургер</h1>

        <Tabs />

        <div className={cn(burgerIngredientsStyle.sectons, 'custom-scroll')}>
          <BurgerSection title='Булки' data={bun}/>
          <BurgerSection title='Соусы' data={main}/>
          <BurgerSection title='Начинки' data={sauce}/>
        </div>
      </>
    );
  }
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
};

export default BurgerIngredients;