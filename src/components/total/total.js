import React from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

class Total extends React.Component {
  render() {
    return(
      <div className={totalStyle.total}>
        <div className={totalStyle.price}>
          <span className={totalStyle.cout}>620</span>
          <CurrencyIcon type='primary' />
        </div>

        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </div>
    );
  }
}

export default Total;