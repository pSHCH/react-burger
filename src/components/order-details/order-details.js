import { useSelector } from 'react-redux';
import orderDetailsStyle from './order-details.module.css';

function OrderDetails() {
  const { order } = useSelector(store => store.order);

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
