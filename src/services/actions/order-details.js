import { checkResponse, fetchOrder } from "../../components/api/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function getOrderNumber(data) {
    return function(dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        fetchOrder(data)
        .then(checkResponse)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    orderNumber: res.order.number
                })
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            }
        })
        .catch(err => console.log(err))
    }
}