import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box , Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientsList from '../Ingredients-list/Ingredients-list';
import { dataPropTypes } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';
import { useInView } from "react-intersection-observer";


const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])

    const scrollIngredients = (e) => {
        const scrolledElement = document.getElementById(e);
        setCurrent(e);
        scrolledElement.scrollIntoView({ behavior: 'smooth' });
    }
    const [bun] = useInView({
        threshold: 1,
        onChange: (isView) => {
          if (isView) {
            setCurrent('bun');
          }
        }
    });

    const [sauce] = useInView({
        threshold: 1,
        onChange: (isView) => {
          if (isView) {
            setCurrent('sauce');
          }
        }
      });
    
    const [main] = useInView({
        threshold: 0.4,
        onChange: (isView) => {
          if (isView) {
            setCurrent('main');
          }
        }
      });
    
    return (
        <div className={ingredientsStyles.container + " pt-10"}>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={ingredientsStyles.tabs} >
                <Tab value="bun" active={current === 'bun'} onClick={scrollIngredients} >
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={scrollIngredients} >
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={scrollIngredients} >
                    Начинки
                </Tab>
            </div>
            <div className={`${ingredientsStyles.row} custom-scroll`} >
                { ingredientsFailed && <h1>Ошибка связи</h1> }
                { ingredientsRequest && <h1>Load...</h1> }
                { ingredients.length !== 0 && 
                        <>
                            <div ref={bun}>
                                <IngredientsList
                                    ingredients={ingredients.filter(item => item.type === 'bun')}
                                    
                                />
                            </div>
                            <div ref={sauce}>
                                <IngredientsList
                                    ingredients={ingredients.filter(item => item.type === 'sauce')}
                                    
                                />
                            </div>
                            <div ref={main}>
                                <IngredientsList
                                    ingredients={ingredients.filter(item => item.type === 'main')}
                                    
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired),
}

export default BurgerIngredients;
