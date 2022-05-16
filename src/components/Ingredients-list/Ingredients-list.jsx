import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsListStyle from './Ingredients-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import PropTypes from 'prop-types';

const IngredientsList = ({ ingredients }) => {

    

    const TYPES_NAME = {
        bun: 'Булки',
        main: 'Начинка',
        sauce: 'Соусы'
    }

    return (
        <section className={ingredientsListStyle.ingredients + " mt-10 custom-scroll"}>
                    <h2 className="text text_type_main-medium mb-6">{TYPES_NAME[ingredients[0].type]}</h2>
                    <ul className={ingredientsListStyle.cardList + " pr-4 pl-4"}>
                    {ingredients.map((ingredient, i) => (
                        <IngredientCard info={ingredient} key={i} />
                    ))}
                    </ul>
        </section>
    );
}

IngredientsList.propTypes = {
    ingredients: PropTypes.array
}

IngredientCard.propTypes = {
    info: PropTypes.object,
}

export default IngredientsList;
