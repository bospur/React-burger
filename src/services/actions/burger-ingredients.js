import { checkResponse, fetchItems } from "../../utils/api/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_VIEWED_INGREDIENT = 'ADD_VIEWED_INGREDIENT';

export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
          });
          fetchItems()
            .then(checkResponse)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch(err => console.log(err))
    }
}