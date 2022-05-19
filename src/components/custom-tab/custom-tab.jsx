import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './custom-tab.module.css';

const CustomTab = () => {
    const [current, setCurrent] = useState('bun');

    const scrollIngredients = (e) => {
      const section = document.querySelector(`#${e}`);
      section.scrollIntoView({ behavior: "smooth" });
      setCurrent(e)
    }

  return (
    <div className={styles.row} >
      <Tab value="bun" active={current === 'bun'} onClick={scrollIngredients} >
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={scrollIngredients} >
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={scrollIngredients} >
        Начинки
      </Tab>
    </div>
  )
}

export default CustomTab;
