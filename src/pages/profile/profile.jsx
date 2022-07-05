import React, { useRef, useState } from "react";
import { NavLink, Redirect, useRouteMatch } from "react-router-dom";
import cl from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Typography,
  Box,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { getCookie } from "../../utils/utils";
import { BASE_URL } from "../../utils/constants";
import { fetchWithRefresh } from "../../utils/api/api";

const Profile = () => {
  const {isAuth, email, name} = useAuth();
  const [value, setValue] = useState({
    name,
    login: email,
    password: "",
  });
  const activeClass = cl.active;
  const nameRef = useRef();
  const loginRef = useRef();
  const passwordRef = useRef();
  const onIconNameClick = (e) => {
    e.preventDefault();
    setTimeout(() => nameRef.current.focus(), 0)
  }
  const onIconLoginClick = (e) => {
    e.preventDefault();
    setTimeout(() => loginRef.current.focus(), 0)
  }
  const onIconPasswordClick = (e) => {
    e.preventDefault();
    setTimeout(() => passwordRef.current.focus(), 0)
  }
  const saveUserInfo = (evt) => {
    evt.preventDefault();
    const token = getCookie('accessToken');
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
            // Отправляем токен и схему авторизации в заголовке при запросе данных
      Authorization: `${token}`
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }
    const url = `${BASE_URL}/auth/user`;
    fetchWithRefresh(url, options)
    .then( res => console.log(res))
  }
  

  if (!isAuth) {
    return (
      <Redirect 
      to={{
        pathname: '/'
      }}
      />
    )
  }
  return (
    <section className={cl.profile}>
      <nav className={`${cl.menu} mr-15`}>
        <ul className={cl.list}>
          <li className={cl.item}>
            <NavLink
              to="/profile"
              className="text text text_type_main-medium"
              activeClassName={activeClass}
            >
              Профиль
            </NavLink>
          </li>
          <li className={cl.item}>
            <NavLink
              to="/profile/orders"
              className="text text_type_main-medium"
            >
              История заказов
            </NavLink>
          </li>
          <li className={cl.item}>
            <NavLink
              to="/profile/orders/:id"
              className="text text_type_main-medium"
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${cl.text} text text_type_main-default mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={cl.userInfo}>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
            icon={"EditIcon"}
            value={value.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onIconClick={onIconNameClick}
            ref={nameRef}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
            icon={"EditIcon"}
            value={value.login}
            name={"login"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onIconClick={onIconLoginClick}
            ref={loginRef}
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
            type={"password"}
            placeholder={"Пароль"}
            name={"password"}
            value={value.password}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            icon={"EditIcon"}
            ref={passwordRef}
            onIconClick={onIconPasswordClick}
          />
        </div>
        <Button type="primary" size="medium" onClick={saveUserInfo}>
          Сохранить
        </Button>
      </div>
    </section>
  );
};

export default Profile;
