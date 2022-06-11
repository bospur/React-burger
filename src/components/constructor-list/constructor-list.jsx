import React from 'react';
import constructorListStyle from './constructor-list.module.css';
import { Box, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import ConstructorListItem from '../constructor-list-item/constructor-list-item';

const ConstructorList = ({ data }) => {

    return (
        <ul className={constructorListStyle.list + " custom-scroll"}>
            {data.map((item, i) => (<ConstructorListItem item={item} key={i} index={i}/>))}
        </ul>
    );
}

ConstructorList.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired)
}

export default ConstructorList;
