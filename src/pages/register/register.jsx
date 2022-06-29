import React, { useCallback, useEffect, useState} from 'react';
import cl from './register.module.css';
import { Input, PasswordInput, Typography, Box, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../services/actions/auth';

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });
    const dispatch = useDispatch();
    const { isRegister } = useSelector(state => state.auth);


    const register = (e) => {
        e.preventDefault();
        dispatch(registerRequest(form))
        setForm({
            email: '',
            password: '',
            name: ''
        })
    }
   
    return (
        <section className={cl.register}>
            <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
            <div className='mb-6'>
                <Input
                    onChange={e => setForm({...form, [e.target.name]: e.target.value})}
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                    value={form.name}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>
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
            <Button type="primary" size="medium" onClick={register}>
                Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive mt-20">
                Уже зарегистрированы? <Link to={{ pathname: '/login' }} className={cl.link}>Войти</Link>
            </p>
        </section>
    );
}

export default Register;
