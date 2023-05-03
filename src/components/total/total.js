import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions';

import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

function Total(props) {

  const dispatch = useDispatch(); 
  const menu = useSelector(store => store.ingredients.ingredients);

  const addOrder = async () => {
    const ingredients = menu;
    // иммитируем данные бургера
    const bunIngredient = ingredients.filter(item => item.type === 'bun');
    const wrapIngredient = bunIngredient[0];
    const innerIngrediens = ingredients.filter(item => item.type !== 'bun');
    
    let ids = [];

    ids.push(wrapIngredient._id); //верхняя булка
    // прочее
    innerIngrediens.map(item => {
      return ids.push(item._id)
    })
    ids.push(wrapIngredient._id); //нижняя булка
    
    // данные заказа
    const data = {'ingredients': ids};
    
    dispatch(postOrder(data) )
    props.openModal('order');
  }

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
        onClick={() => addOrder()}
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