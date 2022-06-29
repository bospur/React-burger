import { BASE_URL } from "../constants";

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

export const fetchItems = async () => {
    return await fetch(`${BASE_URL}/ingredients`)
}

export const fetchOrder = async (data) => {
    return await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body : JSON.stringify(data) 
      })
}

export const fetchPasswordForgot = async (email) => {
    return await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "email": `${email}`
        })
    })
}

export const fetchPasswordReset = async (password, token) => {
    return await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "password": password,
            "token": token
        })
    });
}

export const fetchRegisterRequest = async (form) => {
    return await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const fetchLoginRequest = async (form) => {
    return await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}