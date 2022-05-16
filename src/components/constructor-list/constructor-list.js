import React from 'react';
import constructorListStyle from './constructor-list.module.css';
import { Box, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const ConstructorList = ({ data }) => {
    return (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={constructorListStyle.list + " custom-scroll"}>
                    {
                        data.map((item, i) =>  {
                            if (item.type !== 'bun') {
                                return (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
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

ConstructorList.propTypes = {
    data: PropTypes.array,
}

ConstructorElement.propTypes = {
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string
}

DragIcon.propTypes = {
    type: PropTypes.string
}

export default ConstructorList;
