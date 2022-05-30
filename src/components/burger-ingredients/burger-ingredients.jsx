import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomTab from '../custom-tab/custom-tab';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsList from '../Ingredients-list/Ingredients-list';
import { dataPropTypes } from '../../utils/data';

const BurgerIngredients = ({ data, onOpen }) => {
    
    return (
        <div className={ingredientsStyles.container + " pt-10"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <CustomTab />
            <div className={`${ingredientsStyles.row} custom-scroll`}>
                <IngredientsList
                    ingredients={
                        data.filter(item => item.type === 'bun')
                    }
                    onOpen={onOpen}
                />
                <IngredientsList
                    ingredients={
                        data.filter(item => item.type === 'sauce')
                    }
                    onOpen={onOpen}
                />
                <IngredientsList
                    ingredients={
                        data.filter(item => item.type === 'main')
                    }
                    onOpen={onOpen}
                />
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired),
    onOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;
