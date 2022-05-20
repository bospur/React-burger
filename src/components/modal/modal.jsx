import React, { useEffect } from 'react';
import ReactDOM from "react-dom"
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('my-modals')

const Modal = ({ children, onClose, }) => {

    const hendleCloseModal = (evt) => {
        evt.preventDefault();

        if (evt.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', hendleCloseModal)

        return () => {
            document.removeEventListener('keydown', hendleCloseModal)
        }
    });

    return ReactDOM.createPortal(
        <>
          <div className={`${styles.modal} p-10`}>
            <button className={styles.close} onClick={onClose}>
                <CloseIcon type="primary" />
            </button>
            {children}
          </div>
          <ModalOverlay onClose={onClose}/>
        </>,
        modalRoot
      );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;
