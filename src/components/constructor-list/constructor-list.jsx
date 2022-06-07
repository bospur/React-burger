import React, { useContext } from 'react';
import constructorListStyle from './constructor-list.module.css';
import { Box, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import { ConstructorContext } from '../../contexts/constructor-context';

const ConstructorList = ({ data }) => {
    const { dispatchConstructor }  = useContext(ConstructorContext)

    const deleteIngredient = (id) => {
        const newIngredinets = data.filter(ingredient => ingredient.constructorId !== id);
        dispatchConstructor(newIngredinets);
    }

    const handleConstructorElement = (id) => {
        return deleteIngredient(id);
    }
    
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
                                handleClose={() => {
                                    handleConstructorElement(item.constructorId)
                                }}
                            />
                        </li>
                    )          
                )
            }
        </ul>
    );
}

ConstructorList.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired)
}

export default ConstructorList;
