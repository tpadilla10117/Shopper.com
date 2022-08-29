import { PRODUCT_CATEGORIES_ACTION_TYPES } from "./productCategories.type";

export const PRODUCT_CATEGORIES_INITIAL_STATE = {
    productCategories: []
};

export const productCategoriesReducer = (state = PRODUCT_CATEGORIES_INITIAL_STATE, action = {} ) => {
    const { type, payload } = action;

    switch(type) {
        case PRODUCT_CATEGORIES_ACTION_TYPES.SET_PRODUCT_CATEGORIES:
            return {...state, productCategories: payload};
        default: 
            return state;
    }
};