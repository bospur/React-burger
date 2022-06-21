import React from 'react';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {  useDispatch, useSelector } from 'react-redux';
import { CLOSE_ORDER_MODAL } from '../../services/actions/order-details';
import { CLOSE_INGREDIENT_MODAL } from '../../services/actions/burger-ingredients';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';


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
    <Switch>
      <Route path='/' exact>
        <Home />
      </Route>
      <Route path='/login' exact>
        <Login />
      </Route>
      <Route path='/register' exact>
        <Register />
      </Route>
      <Route path='/forgot-password' exact>
        <ForgotPassword />
      </Route>
    </Switch>


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
