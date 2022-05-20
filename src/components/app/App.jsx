import React, { useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { BASE_URL } from '../../utils/constants';



function App() {
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [state, setState] = useState({
    isLoad: true,
    hasError: false,
    ingredients: []
  });

  useEffect(() => {
    const getIngredientsData = () => {
      fetch(`${BASE_URL}/ingredients`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          setState({
            ingredients: [],
            isLoad: false,
            hasError: true
          })
          return Promise.reject(`${response.status}`)
        }
      })
      .then(response => setState({
        isLoad: false,
        hasError: false,
        ingredients: response.data
      }))
      .catch((err) => console.log(err))
    };
    getIngredientsData();
  }, []);
  
  
  
  const closeIngredientModal = () => {
    setIsIngredientModal(false)
  };

  const closeOrderModal = () => {
    setIsOrderModal(false)
  };

  const handleIngredientModal = (value) => {
    setIngredient(value);
    setIsIngredientModal(true);
  };

  const handleOrderModal = (evt) => {
    evt.preventDefault();
    setIsOrderModal(true);
  };

  return (
    <>
    <AppHeader />
    {
      state.hasError && (
        <p className={styles.error}>Ошибка загрузки данных...</p>
      )
    }
    {
      state.isLoad && (
        <p className={styles.load}>Загрузка данных...</p>
      )
    }
    {state.ingredients.length !== 0 && (
      <main className={appStyles.main}>
      <BurgerIngredients 
        data={state.ingredients}
        onOpen={handleIngredientModal}
      />
      <BurgerConstructor 
        data={state.ingredients}
        onOpen={handleOrderModal}
      />
    </main>
    )}
    {isIngredientModal && 
      <Modal
        onClose={closeIngredientModal}
      >
        <IngredientDetails ingredient={ingredient} />
      </Modal> 
    }
    {isOrderModal && 
          <Modal
            onClose={closeOrderModal}
          >
            <OrderDetails />
          </Modal> 
        }
    </>

    
  )
}


export default App;
