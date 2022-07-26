import { GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, 
    ADD_VIEWED_INGREDIENT,
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from "../actions/burger-ingredients";


const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    viewedIngredient: {},
    isIngredientModal: false
}

export const burgersIngredientsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true
            }
        }
        case ADD_VIEWED_INGREDIENT: {
            return {
                ...state,
                viewedIngredient: action.viewedIngredient
            }
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                isIngredientModal: true
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                isIngredientModal: false
            }
        }
        default:
            return state;
    }
}