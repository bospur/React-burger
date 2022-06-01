import React, { useEffect, useState, useContext } from 'react';
import styles from './order-details.module.css';
import { Typography, Box, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { isTypeNode } from 'typescript';
import { ConstructorContext } from '../app/App';

const OrderDetails = () => {
    const [isLoader, setIsloader] = useState(true);
    const [orderNumber, setOrderNumber] = useState('');
    const {constructor} = useContext(ConstructorContext);
    const data = {
        ingredients : constructor.ingredients.map(item => item._id)
    };

    useEffect(() => {
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body : JSON.stringify(data)
            
        })
        .then(res => res.json())
        .then(res => {
            setOrderNumber(res.order.number);
            setIsloader(false)
        })
    }, [])

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
