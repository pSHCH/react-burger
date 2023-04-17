import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-ovelay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyle from './modal.module.css';

const modalRoot = document.getElementById('react-modals');
const escCode = 27; 

function Modal(props) {

  React.useEffect(()=>{
    document.addEventListener('keydown', keyboardPress);

    return () => {
      document.removeEventListener('keydown', keyboardPress);
    }
  }, []);

  const keyboardPress = (e) => {
    if (e.keyCode === escCode) {
      props.onClose();
    }
  }
  
  return ReactDOM.createPortal( 
    ( 
      <>
        <div className={modalStyle.wrap}>
          <header className={modalStyle.header}>
            { props.modalType === 'ingredient' && <h4 className={modalStyle.title}>Детали ингредиента</h4> }
            <button className={modalStyle.button} onClick={props.onClose}>
              <CloseIcon type='primary' />
            </button>
          </header>

          { props.modalType === 'order' && <OrderDetails item={props?.itemData} /> }
          { props.modalType === 'ingredient' && <IngredientDetails item={props?.itemData} />}
        </div>

        <ModalOverlay onClick={props.onClose}/>
      </>
  ), 
  modalRoot);
}

Modal.propTypes = { 
  modalType: PropTypes.oneOf(['order', 'ingredient']).isRequired,
  onClose: PropTypes.func.isRequired,
  itemData: PropTypes.oneOfType([
    PropTypes.shape({
      image_large: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
    }),  
    PropTypes.shape({
      order: PropTypes.shape({
        number: PropTypes.number.isRequired,
      }).isRequired
    })
  ]).isRequired,
};

export default Modal;
