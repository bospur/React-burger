import React, { useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import cl from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Typography,
  Box,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Profile = () => {
  const [value, setValue] = useState();
  const activeClass = cl.active;
  const { path } = useRouteMatch();

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
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={(e) => setValue(e.target.value)}
            icon={"EditIcon"}
            value={value}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
