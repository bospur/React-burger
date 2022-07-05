import React, { useState } from "react";
import cl from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Typography,
  Box,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { checkResponse, fetchPasswordReset } from "../../utils/api/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const history = useHistory();

  const resetPassword = (e) => {
    e.preventDefault();
    fetchPasswordReset(password, token)
      .then(checkResponse)
      .then((res) => {
        if (res.success) {
          history.replace({ pathname: "/login" });
        }
      });
  };
  return (
    <section className={cl.reset}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <div className="mb-6">
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type={"text"}
          placeholder={"Введите новый пароль"}
          name={"mail"}
          value={password}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <div className="mb-6">
        <Input
          onChange={(e) => setToken(e.target.value)}
          type={"text"}
          placeholder={"Введите код из письма"}
          name={"mail"}
          value={token}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
      </div>
      <Button type="primary" size="medium" onClick={resetPassword}>
        Сохранить
      </Button>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{" "}
        <Link to={{ pathname: "/login" }} className={cl.link}>
          Войти
        </Link>
      </p>
    </section>
  );
};

export default ResetPassword;
