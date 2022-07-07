import React from 'react';
import { Typography, Box, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import constructorStyles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { OPEN_ORDER_MODAL } from '../../services/actions/order-details';
import { getOrderNumber } from '../../services/actions/order-details';
import { useDrop } from 'react-dnd';
import { ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR } from '../../services/actions/burger-constructor';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { useHistory } from 'react-router-dom';

const BurgerConstructor = () => {
    const { isAuth } = useAuth();
    const history = useHistory();
    const { ingredients, bun } = useSelector(state => state.burgerConstructor);
    const price = ingredients.reduce((sum, item) => sum += item.price, 0);
    const dispatch = useDispatch();
    const data = {
        ingredients: [bun._id, ...ingredients.map(item => item._id)]
    }
    const [{ isHover }, drop] = useDrop({
        accept: "ingredient",
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(item) {
            if (item.type == 'bun') {
                dispatch({
                    type: ADD_BUN,
                    bun: item
                })
            } else {
                dispatch({
                    type: ADD_INGREDIENT,
                    ingredient: {...item, constructorId: Date.now()}
                })
            }
        },
    })

    const handleClickOrderButton = (e) => {
        e.preventDefault();
        if (isAuth) {
            dispatch({
                type: OPEN_ORDER_MODAL
            })
            dispatch(getOrderNumber(data))
            dispatch({
                type: CLEAR_CONSTRUCTOR
            })
        } else {
            history.replace({ pathname: '/login'})
        }
    }

    const sectionStyles = isHover ? {border: '1px solid #4c4cff'} : '';

    return (
        <section className='pt-25 pb-25' ref={drop} styles={{sectionStyles}}>
            <div  className={constructorStyles.constructor}>
                { bun && (
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    className={constructorStyles.top}
                    />
                )
                }
                {bun && 
                <ConstructorList
                    data={ingredients}
                /> || <p className="text text_type_main-large">
                        Добавте булку
                    </p>}
                {bun && (
                    <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    className={constructorStyles.bottom}
                />
                )
                }
            </div>
            {
                bun &&
                <div  className={`${constructorStyles.row} mt-10 pr-4 pl-4`}>
                <p className={`${constructorStyles.price} text text_type_digits-medium mr-2`} >
                    {price + bun.price * 2}
                    <CurrencyIcon type="primary" className="mr-10" />
                </p>
                <Button type="primary" size="medium" onClick={handleClickOrderButton}>
                        Оформить заказ
                </Button>
            </div>
            }
        </section>
    );
}



export default BurgerConstructor;
