import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const CustomTab = ({ tabListener }) => {
    const [current, setCurrent] = useState('bun');
    
    const handler = (e) => {
      setCurrent(e);
      tabListener(e);
    }

  return (
    <div style={{ display: 'flex' }} >
      <Tab value="bun" active={current === 'bun'} onClick={handler} >
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={handler} >
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={handler} >
        Начинки
      </Tab>
    </div>
  )
}

export default CustomTab;
