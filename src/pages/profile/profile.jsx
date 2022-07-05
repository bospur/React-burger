import React, { useRef, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import cl from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Typography,
  Box,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {
  
  const [value, setValue] = useState({
    name: "",
    login: "",
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
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </section>
  );
};

export default Profile;
