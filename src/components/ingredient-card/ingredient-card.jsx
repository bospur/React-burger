import React from 'react';
import card from './ingredient-card.module.css';
import { Typography, Box, CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import bun from '../../images/bun-02.png';


const IngredientCard = ({ info }) => {
    return (
        <li className={card.card + " pr-4 pl-4 mb-8"}>
            <Counter count={1} size="default"  className={card.counter}/>
            <img src={info.image} alt=""  className={card.image + " mb-1"}/>
            <div className={card.price + " mb-1"}>
                <p className="text text_type_digits-default mr-2">{info.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={card.name + " text text_type_main-default"}>{info.name}</p>
        </li>
    );
}

export default IngredientCard;
