import React, { useEffect } from 'react';
import { Typography, Box } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';


const IngredientDetails = () => {
    const { ingredients } = useSelector(state => state.burgerIngredients)
    const { id } = useParams();
    let ingredient;
    ingredients.forEach(item => item._id === id ? ingredient = item : ingredient);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch])
    
    if (ingredient) {
    return (
        <>
          <h1 className={`${styles.title} text text_type_main-large mb-5`}>Детали ингредиента</h1>
          <div className={styles.row}>
              <img src={ingredient.image_large} alt={ingredient.name} className={`${styles.image} mb-4`}/>
              <h2 className='text text_type_main-medium mb-8'>{ingredient.name}</h2>
              <ul className={`${styles.list} mb-5`}>
                  <li className={styles.item}>
                      <p className='text text_type_main-default text_color_inactive mb-2'>Калории,ккал</p>
                      <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
                  </li>
                  <li className={styles.item}>
                      <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                      <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
                  </li>
                  <li className={styles.item}>
                      <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                      <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
                  </li>
                  <li className={styles.item}>
                      <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                      <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
                  </li>
              </ul>
          </div> 
        </>
    );}

    return (
        <></>
    )
}


export default IngredientDetails;
