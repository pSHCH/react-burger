import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-ovelay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import modalStyle from './modal.module.css';

interface IModal {
  title: string;
  children: JSX.Element;
  onClose: () => void;
}

const modalRoot = document.getElementById('react-modals')!;
const escCode = 27; 

const Modal: React.FC<IModal> = ({title, children, onClose}) => {

  React.useEffect(()=>{
    document.addEventListener('keydown', keyboardPress);

    return () => {
      document.removeEventListener('keydown', keyboardPress);
    }
  }, []);

  const keyboardPress = (e: KeyboardEvent) => {
    if (e.keyCode === escCode) {
      onClose();
    }
  }

  return ReactDOM.createPortal( 
    ( 
      <>
        <div className={modalStyle.wrap}>
          <header className={modalStyle.header}>
            { title !=='' && <h4 className={modalStyle.title}>{title}</h4> }
            <button className={modalStyle.button} onClick={onClose}>
              <CloseIcon type='primary' />
            </button>
          </header>
          { children }
        </div>

        <ModalOverlay onClick={onClose}/>
      </>
  ), 
  modalRoot);
}

export default Modal;
