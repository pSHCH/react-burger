import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions';
import { REMOVE_INGREDIENTS_ALL_CART } from '../../services/actions';
import { getCookie, setCookie, deleteCookie} from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

function Total(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ingredients = useSelector(store => store.cart.ingredientsInCart);
  // const { login } = useSelector(store => store.login);
  const isToken = getCookie('token');



  const addOrder = async () => {
    let data;
    
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
    data = {'ingredients': ids};
    
    if (isToken) {
      deleteCookie('order', { path: '/' })
      dispatch(postOrder(data));
      props.openModal('order');
      dispatch({ type: REMOVE_INGREDIENTS_ALL_CART });

    } else {
      setCookie('order', ids, { path: '/' })
      navigate('/login');
    }
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