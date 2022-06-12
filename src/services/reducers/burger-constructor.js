import { ADD_INGREDIENT, ADD_BUN, DELETE_INGREDIENT, SORT_INGREDIENTS } from "../actions/burger-constructor";

const initialState = {
    ingredients: [],
    bun: ''
}

export const burgerConstructoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.bun
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.constructorId !== action.id)
            }
        }
        case SORT_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients
            }
        }
        default:
            return state;
    }
}