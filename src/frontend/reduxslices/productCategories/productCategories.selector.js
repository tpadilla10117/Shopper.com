import { createSelector } from 'reselect'; //memoizes selectors

//input Selectors: give us parameters we need to determine selector output
const selectCategoryReducer = (state) => state.categories;

//memoize the selectCategories:
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

//Memoized Selector in Redux:
    //unless the array changes, just use a memoized value instead
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce( (acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, [])
); 
