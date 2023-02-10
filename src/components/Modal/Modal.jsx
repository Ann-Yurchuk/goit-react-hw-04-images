import { useEffect, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  const backdropRef = createRef();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onClose();
  };

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  return createPortal(
    <div
      className={css.Overlay}
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
