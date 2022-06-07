import React, { useState, useEffect, useReducer} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './app.module.css';
import { BASE_URL } from '../../utils/constants';
import { ConstructorContext } from '../../contexts/constructor-context';
import { checkResponse } from '../api/api';



function App() {
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [state, setState] = useState({
    isLoad: true,
    hasError: false,
    ingredients: []
  });
  const [orderNumber, setOrderNumber] = useState()
  const [constructor, dispatchConstructor] = useReducer(reduce, {
    ingredients: [],
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
  
  const sendOrder = () => {
    const data = {
      ingredients : [constructor.bun._id, ...constructor.ingredients.map(item => item._id)]
    };

    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      body : JSON.stringify(data) 
    })
    .then(checkResponse)
    .then(res => {
        setOrderNumber(res.order.number);
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    const getIngredientsData = () => {
      fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
      .then(response => setState({
        isLoad: false,
        hasError: false,
        ingredients: response.data
      }))
      .catch((err) => {
        console.log(err);
        setState({
          ingredients: [],
          isLoad: false,
          hasError: true
        })
      })
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
    <ConstructorContext.Provider value={{constructor, dispatchConstructor, handleOrderModal, sendOrder}}>
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
        <BurgerConstructor />
    </main>
    )}
    {isIngredientModal && 
      <Modal
        onClose={closeIngredientModal}
      >
        <IngredientDetails ingredient={ingredient} />
      </Modal> 
    }
    {isOrderModal && orderNumber &&
           <Modal
            onClose={closeOrderModal}
          >
            <OrderDetails orderNumber={orderNumber}/>
          </Modal>          
        }
    </ConstructorContext.Provider>

    
  )
}


export default App;
