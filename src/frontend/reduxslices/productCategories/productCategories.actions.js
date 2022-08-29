import { PRODUCT_CATEGORIES_ACTION_TYPES } from "./productCategories.type";

const createAction = (type, payload) => ({ type, payload});

export const setProductCategories = (productCategoriesArray) => createAction(PRODUCT_CATEGORIES_ACTION_TYPES.SET_CATEGORIES, productCategoriesArray);