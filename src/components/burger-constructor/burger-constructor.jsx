import React from 'react';
import { Typography, Box, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ data }) => {
    const bun = data.find((item) => item.type === 'bun');
    const price = data.reduce((sum, item) => sum += item.price, 0);

    return (
        <section className='pt-25 pb-25' >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }} className="pr-4 pl-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    
                />

                <ConstructorList 
                    data={data}
                />

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                />
            </div>
            <div style={{ display: 'flex', alignItems:'center', justifyContent: 'flex-end', gap: '15px'}} className="mt-10 pr-4 pl-4">
                <p className="text text_type_digits-medium mr-2" style={{ display: 'flex', alignItems:'center', gap: '5px'}}>
                    {price}
                    <CurrencyIcon type="primary" className="mr-10" style={{width: '36px', height: '36px'}} />
                </p>
                <Button type="primary" size="medium">
                        Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array,
};

ConstructorElement.propTypes = {
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string
}

export default BurgerConstructor;
