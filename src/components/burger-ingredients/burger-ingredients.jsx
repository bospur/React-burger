import React from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomTab from '../../UI/custom-tab/custom-tab';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';

const BurgerIngredients = ({ data }) => {
    const buns = data.filter(item => item.type == 'bun');
    const mains = data.filter(item => item.type == 'main');
    const sauces = data.filter(item => item.type == 'sauce');

    return (
        <div className={ingredientsStyles.container + " pt-10"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <CustomTab />
            
            <section className={ingredientsStyles.ingredients + " mt-10"}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <ul className={ingredientsStyles.cardList + " pr-4 pl-4"}>
                   {buns.map((bun) => (
                       <IngredientCard info={bun} />
                   ))}
                </ul>
            </section>
            
            <section className={ingredientsStyles.ingredients + " mt-10"}>
                <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                <ul className={ingredientsStyles.cardList + " pr-4 pl-4"}>
                    {sauces.map((sauce) => (
                        <IngredientCard info={sauce} />
                    ))}
                </ul>
            </section>

            <section className={ingredientsStyles.ingredients + " mt-10"}>
                <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                <ul className={ingredientsStyles.cardList + " pr-4 pl-4"}>
                    {mains.map((main) => (
                        <IngredientCard info={main} />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default BurgerIngredients;
