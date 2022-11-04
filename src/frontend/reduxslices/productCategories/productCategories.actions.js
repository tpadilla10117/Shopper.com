import { CATEGORIES_ACTION_TYPES } from "./productCategories.type.js";

const createAction = (type, payload) => ({ type, payload});

export const setCategories= (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);