import React from 'react';
import card from './ingredient-card.module.css';
import { Typography, Box, CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import {  useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const IngredientCard = ({ info }) => {
    
    const { ingredients, bun } = useSelector(state => state.burgerConstructor)
   
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: info
    });

    let count = 0;

    if ( info.type === 'bun') {
        bun._id === info._id ? count = 2 : count = 0
    } else {
        ingredients.forEach(item => {
            if (item._id === info._id) {
                count += 1
            }
        })
    }

    

    return (
        <li className={card.card + " pr-4 pl-4 mb-8"}   ref={dragRef}>
            { count !== 0 && <Counter count={count} size="default"  className={card.counter}/>}
            <img src={info.image} alt=""  className={card.image + " mb-1"}/>
            <div className={card.price + " mb-1"}>
                <p className="text text_type_digits-default mr-2">{info.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={card.name + " text text_type_main-default"}>{info.name}</p>
        </li>
    );
}

IngredientCard.propTypes = {
    info: dataPropTypes.isRequired,
}

export default IngredientCard;
