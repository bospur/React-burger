import React, { useCallback, useState} from 'react';
import cl from './login.module.css';
import { Input, PasswordInput, Typography, Box, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const historty = useHistory();

    const login = (e) => {
        e.preventDefault();

        console.log(form)
    };

    return (
       <section className={cl.login}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1> 
        <div className='mb-6'>
            <Input
                onChange={e => setForm({...form, [e.target.name]: e.target.value})}
                type={'text'}
                placeholder={'E-mail'}
                name={'email'}
                value={form.email}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
            />
        </div>
        <div className='mb-6'>
            <PasswordInput
                onChange={e => setForm({...form, [e.target.name]: e.target.value})}
                type={'text'}
                placeholder={'Пароль'}
                name={'password'}
                value={form.password}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                icon={'ShowIcon'}
            />
        </div>
        <Button type="primary" size="medium" onClick={login}>
            Войти
        </Button>
        <p className="text text_type_main-default text_color_inactive mt-20">
            Вы — новый пользователь? <Link to={{ pathname: '/register' }} className={cl.link}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
            Забыли пароль? <Link to={{ pathname: '/forgot-password' }} className={cl.link}>Восстановить пароль</Link>
        </p>
       </section>
    );
}

export default Login;
