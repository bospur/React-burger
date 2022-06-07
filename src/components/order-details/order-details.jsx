import React, { useEffect, useState, useContext } from 'react';
import styles from './order-details.module.css';
import { Typography, Box, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorContext } from '../../contexts/constructor-context';
import { checkResponse } from '../api/api';
import { BASE_URL } from '../../utils/constants';

const OrderDetails = ({orderNumber}) => {    

    return (
        <div className={`${styles.row} mb-20 mt-20`}>
            <h1 className='text text_type_digits-large mb-8'>{orderNumber}</h1>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <div className={`${styles.icon} mb-15`}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;
