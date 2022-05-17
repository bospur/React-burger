import React from 'react';
import constructorListStyle from './constructor-list.module.css';
import { Box, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorList = ({ data }) => {
    
    return (
        <ul className={constructorListStyle.list + " custom-scroll"}>
            {
                data.map((item, i) =>  
                    (
                        <li key={i} className={constructorListStyle.item} >
                            <DragIcon type="primary" className={constructorListStyle.icon}/>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image_mobile}
                            />
                        </li>
                    )          
                )
            }
        </ul>
    );
}

export default ConstructorList;
