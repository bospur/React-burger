import React from 'react';
import constructorListStyle from './constructor-list.module.css';
import { Box, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorList = ({ data }) => {
    return (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={constructorListStyle.list + " custom-scroll"}>
                    {
                        data.map((item) =>  {
                            if (item.type !== 'bun') {
                                return (
                                    <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            text={item.name}
                                            price={item.price}
                                            thumbnail={item.image_mobile}
                                        />
                                    </li>
                                )
                            }
                            return null;
                        })
                    }

                </ul>
    );
}

export default ConstructorList;
