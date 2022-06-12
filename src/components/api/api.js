import { BASE_URL } from "../../utils/constants";

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