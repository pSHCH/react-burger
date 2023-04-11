import orderDetailsStyle from './order-details.module.css';

function OrderDetails() {
  return ( 
    <>
      <h2 className={orderDetailsStyle.title}>034536</h2>
      <p className={orderDetailsStyle.subtitle}>идентификатор заказа</p>
      <p className={orderDetailsStyle.state}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyle.notification}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

export default OrderDetails;
