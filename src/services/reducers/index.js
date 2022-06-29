import { combineReducers } from "redux";
import { burgerConstructoReducer } from "./burger-constructor";
import { burgersIngredientsReducer } from "./burger-ingredients";
import { orderDetailsReduser } from "./order-details";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
    burgerIngredients: burgersIngredientsReducer,
    burgerConstructor: burgerConstructoReducer,
    orderDetails: orderDetailsReduser,
    auth: authReducer
})