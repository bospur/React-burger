import { Idata, IdataArray } from "../../utils/type";
import { ADD_INGREDIENT, ADD_BUN, DELETE_INGREDIENT, SORT_INGREDIENTS, CLEAR_CONSTRUCTOR } from "../actions/burger-constructor";

export interface IConstructor {
    ingredients?: IdataArray | any;
    bun?: string;
}

const initialState:IConstructor = {
    ingredients: [],
    bun: ''
}

export const burgerConstructoReducer = (state = initialState, action: any) => {
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
                ingredients: state.ingredients.filter((item: Idata) => item.constructorId !== action.id)
            }
        }
        case SORT_INGREDIENTS: {
            return {
                ...state,
                ingredients: action.ingredients
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: '',
                ingredients: []
            }
        }
        default:
            return state;
    }
}