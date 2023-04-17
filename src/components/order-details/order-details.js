import PropTypes from 'prop-types';
import orderDetailsStyle from './order-details.module.css';

function OrderDetails(props) {
  return ( 
    <>
      <h2 className={orderDetailsStyle.title}>{props.item?.order?.number}</h2>
      <p className={orderDetailsStyle.subtitle}>идентификатор заказа</p>
      <p className={orderDetailsStyle.state}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyle.notification}>Дождитесь готовности на орбитальной станции</p>
    </>
  );
};

OrderDetails.propTypes = {
  itemData:  
    PropTypes.shape({
      order: PropTypes.shape({
        number: PropTypes.number.isRequired,
      }).isRequired
    })
};


export default OrderDetails;
