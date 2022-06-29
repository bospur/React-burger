import { SEND_LOGIN_FAILED, SEND_LOGIN_REQUEST, SEND_LOGIN_SUCCESS, SEND_REGISTER_FAILED, SEND_REGISTER_REQUEST, SEND_REGISTER_SUCCESS } from "../actions/auth";

const initialState = {
    isRegister: false,
    isRegisterRequest: false,
    isRegisterFaild: false,
    isLoginRequest: false,
    isLoginFaild: false,
    user: {
        name: null,
        email: null
    },
    accessToken: null,
    refreshToken: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_REGISTER_REQUEST: {
            return {
                ...state,
                isRegisterRequest: true
            }
        }
        case SEND_REGISTER_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.user
                },
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isRegisterRequest: false,
                isRegisterFaild: false,
                isRegister: true
            }
        }
        case SEND_REGISTER_FAILED: {
            return {
                ...state,
                isRegisterFaild: true
            }
        }
        case SEND_LOGIN_REQUEST: {
            return {
                ...state,
                isLoginRequest: true
            }
        }
        case SEND_LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.user
                },
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isLoginRequest: false,
                isLoginFaild: false,
            }
        }
        case SEND_LOGIN_FAILED: {
            return {
                ...state,
                isLoginFaild:true
            }
        }

        default:
            return state;
    }
}