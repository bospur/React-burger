import React, { useState, useEffect, createContext, useReducer} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { BASE_URL } from '../../utils/constants';

export const ConstructorContext = createContext();

function App() {
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [state, setState] = useState({
    isLoad: true,
    hasError: false,
    ingredients: []
  });
  const [constructor, dispatchConstructor] = useReducer(reduce, {
    ingredients: [],
    buns: {},
  });

  function  reduce(constructor, action) {
    if (action.type === 'bun') {
      return {
        ...constructor,
        bun: action 
      }
    }
    if (Array.isArray(action)) {
      return {
        ...constructor,
      ingredients: [...action]
      }
    }
    return {
      ...constructor,
      ingredients: [...constructor.ingredients, {...action, constructorId: Date.now()}]
    }

  }
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
    dispatchConstructor(value)
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
      <ConstructorContext.Provider value={{constructor, dispatchConstructor, handleOrderModal}}>
        <BurgerConstructor />
      </ConstructorContext.Provider>
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
           <ConstructorContext.Provider value={{ constructor }}>
           <Modal
            onClose={closeOrderModal}
          >
            <OrderDetails />
          </Modal> 
         </ConstructorContext.Provider>
          
        }
    </>

    
  )
}


export default App;
