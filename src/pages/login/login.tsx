import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import cl from "./login.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../services/actions/auth";
import { useAuth } from "../../hooks/useAuth/useAuth";

const Login: FC = () => {
  const { isAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const location = useLocation() as any;

  const login = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(form) as any);
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
            name={"password"}
            value={form.password}
            size={"default"}
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
