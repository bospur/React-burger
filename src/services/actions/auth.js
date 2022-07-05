import { checkResponse, fetchLoginRequest, fetchRegisterRequest } from "../../utils/api/api";
import { setCookie } from "../../utils/utils";

export const SEND_REGISTER_REQUEST = 'GET_AUTH_REQUEST';
export const SEND_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const SEND_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export const SEND_LOGIN_REQUEST = 'SEND_LOGIN_REQUEST';
export const SEND_LOGIN_SUCCESS = 'SEND_LOGIN_SUCCESS';
export const SEND_LOGIN_FAILED = 'SEND_LOGIN_FAILED';

export function registerRequest(form) {
    return function(dispatch) {
        dispatch({
            type: SEND_REGISTER_REQUEST
        })
        fetchRegisterRequest(form)
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: SEND_REGISTER_SUCCESS,
                    user: {
                        ...res.user
                    },
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                })
                setCookie('token', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
            } else {
                dispatch({
                    type: SEND_REGISTER_FAILED
                })
            }
        })
    }
}

export function loginRequest(form) {
    return function(dispatch) {
        dispatch({
            type: SEND_LOGIN_REQUEST
        })
        fetchLoginRequest(form)
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: SEND_LOGIN_SUCCESS,
                    user: {
                        ...res.user
                    },
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken
                })
                setCookie('token', res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
            } else {
                dispatch({
                    type : SEND_LOGIN_FAILED
                })
            }
        })
    }
}