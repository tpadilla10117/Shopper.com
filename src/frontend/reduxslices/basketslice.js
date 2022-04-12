/* The redux slice for my shopping basket: */
    import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice: */
    const initialState = {
        items: [],
    };

    /* const initialState = user ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null}; */

/* I create actions for the slice to dispatch into global store: */
    export const basketSlice = createSlice({
        name: "basket",
        initialState,
        reducers: {
            //Actions:
            addToBasket: (state, action) => {
                //push payload in global store (contains dispatched product)
                state.items = [...state.items, action.payload];
            },
        /* TODO: Need to finish Remove basket.. */
            removeFromBasket: (state, action) => {
                //look for index of item want to remove...
                const index = state.items.findIndex( basketItem => basketItem.id === action.payload.id);

                //make a copy of the current basket...
                let newBasket = [...state.items];

                if (index >= 0) {
                    newBasket.splice(index, 1)
                } else {
                    console.warn(`Can't remove product (id: ${action.payload.id}) as it is not in the basket`)
                }
                state.items = newBasket;
            },
        },
    });

/* Export my actions: */
    export const { addToBasket, removeFromBasket } = basketSlice.actions;

/* Selectors - how to pull info from Global store slice: */
    export const selectItems = (state) => state.basket.items;

/* use .reduce to loop through items in the array -> each time we iterate, add item price to the total */
/* TODO: total is not adding up properly */

    export const selectTotal = (state) => state.basket.items.reduce( (total, item) => Number(total) + Number(item.price), 0);

    export default basketSlice.reducer;