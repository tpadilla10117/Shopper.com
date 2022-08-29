/* Memoize selector functions with reselect library: */
import { createSelector } from "reselect";

//input Selectors: give us parameters we need to determine selector output
const selectProductCategoryReducer = (state) => state.categories;

//memoize the selectCategories:
export const selectProductCategories = createSelector(
    [selectProductCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

//Memoized Selector in Redux:
    //unless the array changes, just use a memoized value instead
export const selectProductCategoriesMap = createSelector(
    [selectProductCategories],
    (categories) => categories.reduce( (acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, [])
) 