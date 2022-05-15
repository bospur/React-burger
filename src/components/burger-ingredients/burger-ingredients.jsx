import React, { useState } from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomTab from '../../UI/custom-tab/custom-tab';
import ingredientsStyles from './burger-ingredients.module.css';

import IngredientsList from '../Ingredients-list/Ingredients-list';

const BurgerIngredients = ({ data }) => {
    const [ingredientsType, setIngredientsType] = useState('bun');

    const tabListener = (value) => {
        setIngredientsType(value)
    };

    const ingredients = data.filter((item) => item.type === ingredientsType);
    
    return (
        <div className={ingredientsStyles.container + " pt-10"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <CustomTab tabListener={tabListener}/>
            <IngredientsList 
                ingredients={ingredients}
            />
            
        </div>
    );
}

export default BurgerIngredients;
