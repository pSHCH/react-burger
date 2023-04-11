import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

function Total(props) {

  return(
    <div className={totalStyle.total}>
      <div className={totalStyle.price}>
        <span className={totalStyle.cout}>{props.total}</span>
        <CurrencyIcon type='primary' />
      </div>

      <Button 
        htmlType='button' 
        type='primary' 
        size='medium'
        onClick={() => props.openModal('order')}
      >
        Оформить заказ
      </Button>
    </div>
  );
}


Total.propTypes = {
  openModal: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default Total;