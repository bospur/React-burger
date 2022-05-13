import React from 'react';
import headerStyles from './app-header.module.css';
import { Typography, BurgerIcon, ListIcon, Box } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={headerStyles.header}>
          <nav className={headerStyles.container}>
            <ul className="pt-4 pb-4">
                <li>
                    <div className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </div>
                    <div className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                    </div>
                </li>

                <li>

                </li>

                <li>

                </li>
            </ul>
          </nav>
        </header>
    );
}

export default AppHeader;
