import React, { FormEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import cl from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserInfo, saveUserInfo } from "../../utils/api/api";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../services/actions/auth";
import { getCookie } from "../../utils/utils";
import { SET_USER } from "../../services/actions/auth";

const Profile = () => {
  const token = getCookie("accessToken");
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "",
    login: "",
    password: "",
  });
  const activeClass = cl.active;
  const nameRef = useRef() as any;
  const loginRef = useRef() as any;
  const passwordRef = useRef() as any;

  const onIconNameClick = () => {
    setTimeout(() => nameRef.current.focus(), 0);
  };
  const onIconLoginClick = () => {
    setTimeout(() => loginRef.current.focus(), 0);
  };
  const onIconPasswordClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const logout = () => {
    dispatch(logoutRequest() as any);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveUserInfo(value).catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        setValue({ ...value, name: res.user.name, login: res.user.email });
        dispatch({
          type: SET_USER,
          user: {
            ...res.user,
          },
        });
      })
      .catch((err) => console.log(err));
  }, []);

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
              onClick={logout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`${cl.text} text text_type_main-default mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form onSubmit={onSubmit} className={cl.userInfo}>
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
      </form>
    </section>
  );
};

export default Profile;
