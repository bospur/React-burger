import React, { useContext } from 'react';
import { Typography, Box, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import constructorStyles from './burger-constructor.module.css';
import { ConstructorContext } from '../../contexts/constructor-context';

const BurgerConstructor = () => {
    const {constructor, handleOrderModal, sendOrder} = useContext(ConstructorContext);
    const bun = constructor.bun;
    const price = constructor.ingredients.reduce((sum, item) => sum += item.price, 0);

    const onClick = (e) => {
        handleOrderModal(e);
        sendOrder();
    }

    return (
        <section className='pt-25 pb-25' >
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
                ) || null
                }
                {bun && 
                <ConstructorList
                    data={constructor.ingredients.filter(item => item.type !== 'bun')}
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
                ) || null
                }
            </div>
            {
                bun &&
                <div  className={`${constructorStyles.row} mt-10 pr-4 pl-4`}>
                <p className={`${constructorStyles.price} text text_type_digits-medium mr-2`} >
                    {price + bun.price * 2}
                    <CurrencyIcon type="primary" className="mr-10" />
                </p>
                <Button type="primary" size="medium" onClick={onClick}>
                        Оформить заказ
                </Button>
            </div>
            }
        </section>
    );
}



export default BurgerConstructor;
