import React from 'react';
import AppHeader from '../app-header/app-header';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {  useDispatch, useSelector } from 'react-redux';
import { CLOSE_ORDER_MODAL } from '../../services/actions/order-details';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from '../../pages/home/home';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import ForgotPassword from '../../pages/forgot-password/forgot-password';
import ResetPassword from '../../pages/reset-password/reset-password';
import Profile from '../../pages/profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientModal from '../ingredient-modal/ingredient-modal';


function App() {
  const { orderNumber, isOrderModal } = useSelector(state => state.orderDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  let background = location.state && location.state.background;
  
  const closeOrderModal = () => {
    dispatch({
      type: CLOSE_ORDER_MODAL
    })
  };
 
  return (
    <>
    <AppHeader />
    <Switch location={background || location}>
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
      <Route path='/reset-password' exact>
        <ResetPassword />
      </Route>
      <Route path='/ingredients/:id' exact>
       <IngredientDetails />
      </Route>
      <ProtectedRoute path='/profile'>
        <Profile/>
      </ProtectedRoute>
    </Switch>

    {background && <Route path="/ingredients/:id" children={<IngredientModal />} />}

    {isOrderModal && orderNumber &&
      <Modal onClose={closeOrderModal}>
        <OrderDetails orderNumber={orderNumber}/>
      </Modal>          
    }
  </>
  )
}


export default App;
