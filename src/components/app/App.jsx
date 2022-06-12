import React, { useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import {  useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CLOSE_ORDER_MODAL } from '../../services/actions/order-details';
import { CLOSE_INGREDIENT_MODAL } from '../../services/actions/burger-ingredients';

function App() {
  const { viewedIngredient, isIngredientModal } = useSelector(state => state.burgerIngredients);
  const { orderNumber, isOrderModal } = useSelector(state => state.orderDetails);
  const dispatch = useDispatch();
  
  const closeIngredientModal = () => {
    dispatch({
      type: CLOSE_INGREDIENT_MODAL
    })
  };

  const closeOrderModal = () => {
    dispatch({
      type: CLOSE_ORDER_MODAL
    })
  };
 
  return (
    <>
    <AppHeader />
    <main className={appStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
    {isIngredientModal && 
      <Modal onClose={closeIngredientModal}>
        <IngredientDetails ingredient={viewedIngredient} />
      </Modal> 
    }
    {isOrderModal && orderNumber &&
      <Modal onClose={closeOrderModal}>
        <OrderDetails orderNumber={orderNumber}/>
      </Modal>          
    }
  </>
  )
}


export default App;
