import PropTypes from 'prop-types';
import modalOverlayStyle from './modal-ovelay.module.css';

function ModalOverlay(props) {
 
  return (
    <div className={modalOverlayStyle.wrap} onClick={props.onClick} />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ModalOverlay;
