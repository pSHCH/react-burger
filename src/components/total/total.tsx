import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions';
import type { ReduxState } from '../../utils/ReduxState';
import type { IIngredient } from '../../utils/ingredient';
import { REMOVE_INGREDIENTS_ALL_CART } from '../../services/actions';
import { getCookie, setCookie, deleteCookie} from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

interface ITotal {
  openModal: (arg0: string) => void;
  total: number;
  ingredientsInCart: IIngredient[]
};

const Total: React.FC<ITotal> = ({openModal, total}) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const ingredients = useSelector((store: ReduxState) => store.cart.ingredientsInCart);
  const isToken = getCookie('token');

  const addOrder = async () => {
    let data;
    
    const bunIngredient = ingredients.filter((item: IIngredient) => item.type === 'bun');
    const innerIngrediens = ingredients.filter((item: IIngredient) => item.type !== 'bun');
    
    let ids: string[] = [];

    

    ids.push(bunIngredient[0]._id);
    innerIngrediens.map((item: IIngredient) =>  ids.push(item._id)) // прочее
    ids.push(bunIngredient[0]._id);

    
    
    // данные заказа
    data = {'ingredients': ids};
    
    if (isToken) {
      deleteCookie('order', { path: '/' })
      dispatch(postOrder(data));
      openModal('order');
      dispatch({ type: REMOVE_INGREDIENTS_ALL_CART });

    } else {
      setCookie('order', ids, { path: '/' })
      navigate('/login');
    }
  }

  return(
    <div className={totalStyle.total}>
      <div className={totalStyle.price}>
        <span className={totalStyle.cout}>{total}</span>
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