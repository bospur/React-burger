import { GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions/order-details";

const initialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    isOrderModal: false
}

export const orderDetailsReduser = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                rderRequest: false,
                orderFailed: true
            }
        }
        case OPEN_ORDER_MODAL: {
            return {
                ...state,
                isOrderModal: true
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                isOrderModal: false,
                orderNumber: null
            }
        }
        default:
            return state;
    }
}