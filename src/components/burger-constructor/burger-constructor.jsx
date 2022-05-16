import React, { useState } from 'react';
import { Typography, Box, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import bugConstStyle from './burger-constructor.module.css';
import bunImg from '../../images/bun-02.png';
import ConstructorList from '../constructor-list/constructor-list';

const BurgerConstructor = ({ data }) => {

    return (
        <section className='mt-25' >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }} className="pr-4 pl-4">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={bunImg}
                    className='ml-14'
                />

                <ConstructorList 
                    data={data}
                />

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={bunImg}
                    className='ml-14'
                />
            </div>
        </section>
    );
}

export default BurgerConstructor;
