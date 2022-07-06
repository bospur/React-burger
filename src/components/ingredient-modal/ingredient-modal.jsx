import React from 'react';
import { useHistory } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import cl from './ingredient-modal.module.css';

const IngredientModal = () => {
    const history = useHistory();
    

    const goBack = (e) => {
        e.stopPropagation();
        history.goBack();
    }

    return (
        <div className={cl.overlay} onClick={goBack}>
            <div className={cl.modal}>
                <IngredientDetails />
            </div>
        </div>
    );
}

export default IngredientModal;
