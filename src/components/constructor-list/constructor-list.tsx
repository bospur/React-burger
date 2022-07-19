import React, { FC } from 'react';
import constructorListStyle from './constructor-list.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorListItem from '../constructor-list-item/constructor-list-item';
import { Idata, IdataArray } from '../../utils/type';


const ConstructorList: FC<IdataArray> = ({ ingredients }) => {

    return (
        <ul className={constructorListStyle.list + " custom-scroll"}>
            {ingredients.map((item: Idata, i: number) => (<ConstructorListItem item={item} key={item.constructorId} index={i}/>))}
        </ul>
    );
}


export default ConstructorList;
