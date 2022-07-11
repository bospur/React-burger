import React, { useCallback, useState } from "react";
import cl from "./login.module.css";
import {
  Input,
  PasswordInput,
  Typography,
  Box,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/auth";
import { useAuth } from "../../hooks/useAuth/useAuth";

const Login = () => {
  const { isAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const location = useLocation();

  const login = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
    setForm({
      email: "",
      password: "",
    });
  };

  if (isAuth) {
    return (
      <Redirect
        to={ location.state?.from || '/' }
      />
    );
  }
  
  return (
    <section className={cl.login}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form onSubmit={login}>
        <div className="mb-6">
          <Input
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type={"text"}
            placeholder={"E-mail"}
            name={"email"}
            value={form.email}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            type={"text"}
            placeholder={"Пароль"}
            name={"password"}
            value={form.password}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            icon={"ShowIcon"}
          />
        </div>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{" "}
        <Link to={{ pathname: "/register" }} className={cl.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link to={{ pathname: "/forgot-password" }} className={cl.link}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
};

export default Login;
