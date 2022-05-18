import React from 'react';
import { Typography, Box, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import constructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ data }) => {
    const bun = data.find((item) => item.type === 'bun');
    const price = data.reduce((sum, item) => sum += item.price, 0);

    return (
        <section className='pt-25 pb-25' >
            <div  className={constructorStyles.constructor}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    className={constructorStyles.top}
                />
                <ConstructorList 
                    data={data.filter(item => item.type !== 'bun')}
                />
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    className={constructorStyles.bottom}
                />
            </div>
            <div  className={`${constructorStyles.row} mt-10 pr-4 pl-4`}>
                <p className={`${constructorStyles.price} text text_type_digits-medium mr-2`} >
                    {price}
                    <CurrencyIcon type="primary" className="mr-10" />
                </p>
                <Button type="primary" size="medium">
                        Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired)
}

export default BurgerConstructor;
