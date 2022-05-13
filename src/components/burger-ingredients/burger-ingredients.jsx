import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomTab from '../../UI/custom-tab/custom-tab';

const BurgerIngredients = () => {
    return (
        <div className="pt-10">
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <CustomTab />
            <h2 className="text text_type_main-medium mb-6">Булки</h2>
            
        </div>
    );
}

export default BurgerIngredients;
