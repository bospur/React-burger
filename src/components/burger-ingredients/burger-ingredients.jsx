import React from 'react';
import { Typography, Box, CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomTab from '../../UI/custom-tab/custom-tab';
import ingredientsStyles from './burger-ingredients.module.css';
import bun from '../../images/bun-02.png';

const BurgerIngredients = () => {
    return (
        <div className={ingredientsStyles.container + " pt-10"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <CustomTab />
            
            <section className={ingredientsStyles.ingredients + " mt-10"}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <ul className={ingredientsStyles.cardList + " pr-4 pl-4"}>
                    <li className={ingredientsStyles.card + " pr-4 pl-4 mb-8"}>
                        <Counter count={1} size="default"  className={ingredientsStyles.counter}/>
                        <img src={bun} alt=""  className={ingredientsStyles.image + " mb-1"}/>
                        <div className={ingredientsStyles.price + " mb-1"}>
                            <p className="text text_type_digits-default mr-2">20</p>
                            <CurrencyIcon type="primary" />
                        </div>
                        <p className={ingredientsStyles.name + " text text_type_main-default"}>Краторная булка N-200i</p>
                    </li>
                    
                    
                </ul>
            </section>
            
        </div>
    );
}

export default BurgerIngredients;
