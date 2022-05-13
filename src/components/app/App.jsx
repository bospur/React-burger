import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import appStyles from './app.module.css';


function App() {
  
  return (
    <>
    <AppHeader />
    <main className={appStyles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
    </>
  )
}

export default App;
