import React, { useState } from 'react';
import headerStyles from './app-header.module.css';
import { Typography, BurgerIcon, ListIcon, ProfileIcon, Box, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';

const AppHeader = () => {
   
    
    return (
        <header className={headerStyles.header}>
          <nav className={headerStyles.container}>
            <ul className={headerStyles.ul + " pt-4 pb-4"}>
                <li  className={headerStyles.li}>
                    <NavLink to='/'  className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <BurgerIcon type="primary" />
                        <p className="text text_type_main-default ml-2">Конструктор</p>
                    </NavLink>
                    <NavLink to='/' className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
                    </NavLink>
                </li>
                <li className={headerStyles.logo}>
                    <Logo />
                </li>
                <li className={headerStyles.li}>
                    <NavLink to='/profile' className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ProfileIcon type="secondary" />
                            <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
                    </NavLink>
                </li>
            </ul>
          </nav>
        </header>
    );
}

export default AppHeader;
