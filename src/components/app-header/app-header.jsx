import React from 'react';
import headerStyles from './app-header.module.css';
import { Typography, BurgerIcon, ListIcon, ProfileIcon, Box, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth/useAuth';

const AppHeader = () => {
   const  { isAuth , email } = useAuth();
   const link = isAuth ? '/profile' : '/login';
   const isConstructor = !!useRouteMatch({ path: '/', exact: true});
   const isFeed = !!useRouteMatch('/feed');
   const isProfile = !!useRouteMatch('/profile');
   const history = useHistory();
    
    return (
        <header className={headerStyles.header}>
          <nav className={headerStyles.container}>
            <ul className={headerStyles.ul + " pt-4 pb-4"}>
                <li  className={headerStyles.li}>
                    <NavLink to='/'  className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default 
                        ${isConstructor ? 'text_color_active' : 'text_color_inactive' } 
                        ml-2`}>Конструктор</p>
                    </NavLink>
                    <NavLink to='/' className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ListIcon type={isFeed ? "primary" : "secondary"} />
                        <p className={`text text_type_main-default 
                        ${isFeed ? 'text_color_active' : 'text_color_inactive' } 
                        ml-2`}>Лента заказов</p>
                    </NavLink>
                </li>
                <li className={headerStyles.logo} onClick={() => { history.replace({pathname: '/'})}}>
                    <Logo />
                </li>
                <li className={headerStyles.li}>
                    <NavLink to={link} className={headerStyles.row + " pl-5 pr-5 pb-4 pt-4 mr-2"}>
                        <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                            <p className={`text text_type_main-default 
                        ${isProfile ? 'text_color_active' : 'text_color_inactive' } 
                        ml-2`}>{isAuth ? email : 'Личный кабинет'}</p>
                    </NavLink>
                </li>
            </ul>
          </nav>
        </header>
    );
}

export default AppHeader;
