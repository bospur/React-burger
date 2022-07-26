import { BASE_URL } from "../constants";
import { setCookie, getCookie } from "../utils";

interface IOrderData {
  ingredients: string[];
}
interface IForm {
  email: string;
  password: string;
  name?: string;
}
interface IUserInfo {
  login: string;
  name: string;
}

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchItems = async () => {
  return await fetch(`${BASE_URL}/ingredients`);
};

export const fetchOrder = async (data: IOrderData) => {
  return await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const fetchPasswordForgot = async (email: string) => {
  return await fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: `${email}`,
    }),
  });
};

export const fetchPasswordReset = async (password: string, token: string) => {
  return await fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export const fetchLogoutRequest = async () => {
  return await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken")
    })
  })
}

export const fetchRegisterRequest = async (form: IForm) => {
  return await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const fetchLoginRequest = async (form: IForm) => {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserInfo = () => {
  const token = getCookie('accessToken');
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  const url = `${BASE_URL}/auth/user`;
  return fetchWithRefresh(url, options);
}

export const saveUserInfo = (value: IUserInfo) => {
  const token = getCookie("accessToken");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `${token}`,
    },
    body: JSON.stringify({
      name: value.name,
      email: value.login,
    }),
  };
  const url = `${BASE_URL}/auth/user`;
  return fetchWithRefresh(url, options);
};
