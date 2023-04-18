import { useContext, useMemo } from 'react';
import { DataContext } from '../../utils/productsContext';
import { ORDERURL } from '../../utils/consts';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import totalStyle from './total.module.css';

function Total(props) {
  const { state } = useContext(DataContext); //Данные из контекста должны быть доступны при нажатии на кнопку «Оформить заказ» и в блоке с итоговой стоимостью.

  const postData = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }  
      })
      .catch(err => {
        return Promise.reject(`Ошибка ${err.status}`);
      });
  }

  const addOrder = async () => {
    const ingredients = state?.data?.data;
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
    
    const res = await postData(ORDERURL, data);
    props.openModal('order', res);
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