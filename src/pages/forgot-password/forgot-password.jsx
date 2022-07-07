import React, { useState } from 'react';
import cl from './forgot-password.module.css';
import { Input, Typography, Box, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { checkResponse, fetchPasswordForgot } from '../../utils/api/api';
import { useAuth } from '../../hooks/useAuth/useAuth';

const ForgotPassword = () => {
    const {isAuth} = useAuth();
    const [mail, setMail] = useState('');
    const history = useHistory();

    const forgotPassword = (e) => {
        e.preventDefault();
        fetchPasswordForgot(mail)
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                history.replace({ pathname: '/reset-password'})
            }
        })
    }
    if (isAuth) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
      }
    return (
        <section className={cl.forgot}>
            <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
            <form onSubmit={forgotPassword} className={cl.form}>
                <div className='mb-6' >
                    <Input
                        onChange={e => setMail(e.target.value)}
                        type={'text'}
                        placeholder={'Укажите e-mail'}
                        name={'mail'}
                        value={mail}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium">
                    Восстановить
                </Button>
            </form>

            <p className="text text_type_main-default text_color_inactive mt-20">
                Вспомнили пароль? <Link to={{ pathname: '/login' }} className={cl.link}>Войти</Link>
            </p>
        </section>
    );
}

export default ForgotPassword;
