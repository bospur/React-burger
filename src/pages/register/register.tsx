import React, { FormEvent, useState } from "react";
import cl from "./register.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerRequest } from "../../services/actions/auth";
import { useAuth } from "../../hooks/useAuth/useAuth";

const Register = () => {
  const { isAuth } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const dispatch = useDispatch();

  const register = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerRequest(form) as any);
    setForm({
      email: "",
      password: "",
      name: "",
    });
  };
  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return (
    <section className={cl.register}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form onSubmit={register}>
      <div className="mb-6">
        <Input
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          type={"text"}
          placeholder={"Имя"}
          name={"name"}
          value={form.name}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
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
      <Button type="primary" size="medium" >
        Зарегистрироваться
      </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{" "}
        <Link to={{ pathname: "/login" }} className={cl.link}>
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
