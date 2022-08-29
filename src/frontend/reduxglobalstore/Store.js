/*This is the global store to handle state in the app:  */
    import { configureStore } from "@reduxjs/toolkit";
    import { combineReducers } from "redux";
    import { persistReducer } from "redux-persist";
    import storage from 'redux-persist/lib/storage';
    import navReducer from '../reduxslices/navSlice.js';
    import modalReducer from '../reduxslices/modalSlice';
    import authReducer from '../reduxslices/authSlice';
    import authMessageReducer from '../reduxslices/authmessageSlice';
    import basketReducer from '../reduxslices/basketslice';
    import productReducer from '../reduxslices/productSlice.js';
    import ordersReducer from '../reduxslices/ordersSlice';
    import loadingReducer from '../reduxslices/loadingSlice.js';
    import savedItemsReducer from '../reduxslices/savedItemsSlice.js';
    import { productCategoriesReducer } from "../reduxslices/productCategories/productCategories.reducer.js";


/* Config for redux persist: */
    const persistConfig = {
        key: 'root',
        storage,
    }

    const rootReducer = combineReducers({
        nav: navReducer,
        modal: modalReducer,
        message: authMessageReducer,
        auth: authReducer,
        basket: basketReducer,
        products: productReducer,
        orders: ordersReducer,
        loader: loadingReducer,
        productCategories: productCategoriesReducer,
        savedItems: savedItemsReducer,
    })

    const persistedReducer = persistReducer(persistConfig, rootReducer);

/* To change State: 

    1) create 'action' (object describing what happened) -> 
    2) 'dispatch' the action to the store 
    3) To specify how state get's updated in response to the action, write a pure 'reducer' function that calculates new state based on old state and action

*/

    const store = configureStore({
        reducer: persistedReducer, 
    });

    
    export default store;

   /*  export const store = configureStore({
        reducer: {
            nav: navReducer,
            modal: modalReducer,
            message: authMessageReducer,
            auth: authReducer,
            basket: basketReducer,
            products: productReducer,
        }
    }); */