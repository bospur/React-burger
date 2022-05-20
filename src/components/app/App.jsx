import React, { useState, useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';
import { data } from '../../utils/data';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';



function App() {
  const [isIngredientModal, setIsIngredientModal] = useState(false);
  const [isOrderModal, setIsOrderModal] = useState(false);
  const [ingredient, setIngredient] = useState();
  const [ingredients, setIngredients] = useState([]);

  const INGREDIENTS_DATA_URL = 'https://norma.nomoreparties.space/api/ingredients';

  const getIngredientsData = () => {
    fetch(INGREDIENTS_DATA_URL)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`${response.status}`)
    })
    .then(response => {setIngredients(response.data)})
    .catch((err) => {console.log(err)})
  };

  useEffect(() => {
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
    <main className={appStyles.main}>
      <BurgerIngredients 
        data={ingredients}
        onOpen={handleIngredientModal}
      />
      <BurgerConstructor 
        data={ingredients}
        onOpen={handleOrderModal}
      />
    </main>
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
