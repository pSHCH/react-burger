import { useSelector } from 'react-redux';
import React from 'react';
import type { ReduxState } from '../../utils/ReduxState';
import orderDetailsStyle from './order-details.module.css';

const OrderDetails: React.FC = () => {
  const { order } = useSelector((store: ReduxState) => store.order);

  if (!order) {
    return <p className={orderDetailsStyle.state}>Загрузка...</p>
  }

  return ( 
    <>
      <h2 className={orderDetailsStyle.title}>{order?.order?.number}</h2>
      <p className={orderDetailsStyle.state}>{order?.name}</p>
      <p className={orderDetailsStyle.subtitle}>идентификатор заказа</p>
      <p className={orderDetailsStyle.notification}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyle.notification}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

export default OrderDetails;
