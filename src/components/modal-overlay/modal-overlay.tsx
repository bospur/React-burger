import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

interface IMOdalOverlay {
    onClose: () => void;
}

const ModalOverlay: FC<IMOdalOverlay> = ({ onClose }) => {
    return (
        <div className={styles.modal} onClick={onClose}></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;
