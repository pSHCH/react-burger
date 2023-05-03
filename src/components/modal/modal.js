import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-ovelay';
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
            { props.title !=='' && <h4 className={modalStyle.title}>{props.title}</h4> }
            <button className={modalStyle.button} onClick={props.onClose}>
              <CloseIcon type='primary' />
            </button>
          </header>
          { props.children }
        </div>

        <ModalOverlay onClick={props.onClose}/>
      </>
  ), 
  modalRoot);
}

Modal.propTypes = { 
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
