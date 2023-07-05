import React from 'react';
import modalOverlayStyle from './modal-ovelay.module.css';

interface IModalOverlay {
  onClick: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({onClick}) => {
 
  return (
    <div className={modalOverlayStyle.wrap} onClick={onClick} />
  );
}

export default ModalOverlay;
