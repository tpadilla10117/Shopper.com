import { CATEGORIES_ACTION_TYPES } from "./productCategories.type.js";

export const CATEGORIES_INITIAL_STATE = {
    /* categoriesMap: {} */
    categories: []
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} ) => {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {...state, categories: payload};
        default:
            return state;
        
    }
};