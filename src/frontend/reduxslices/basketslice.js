/* The redux slice for my shopping basket: */
    import { createNextState, createSlice } from "@reduxjs/toolkit";

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
        /* Removes a specific item from basket: */
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
            clearBasket: (state, action) => {
                state.items = [];
            },
        /* Increments count of a cart item: */
            addCartItemCount: (state, action) => {

                const existingCartItem = state.items.find(
                    (cartItem) => cartItem.productid === action.payload.productid
                );
                
                if(existingCartItem) {
                    
                    return {
                        ...state,
                        items: state.items.map(item => item.productid === action.payload.productid
                            ? {
                                ...item,
                                quantity: item.quantity + 1,
                            }
                            : item
                        ),
                    }
                }

                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
              
            },
        /* Lowers the count of a cart item: */
            removeCartItemCount: ( state, action ) => {
                const existingCartItem = state.items.find(
                    (cartItem) => cartItem.productid === action.payload.productid
                );

                if(existingCartItem.quantity === 1) {
                    state.items.filter( (cartItem ) => cartItem.productid !== action.payload.productid)
                };

                return {
                    ...state,
                    items: state.items.map(item => item.productid === action.payload.productid
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                    ),
                }
            },
        },
    });

/* Export my actions: */
    export const { addToBasket, removeFromBasket, clearBasket, addCartItemCount, removeCartItemCount } = basketSlice.actions;

/* Selectors - how to pull info from Global store slice: */
    export const selectItems = (state) => state.basket.items;

    
    export const selectTotal = (state) => state.basket.items.reduce(
        (total, item) => total + item.quantity * item.price, 0
    );
        
    /*     export const selectTotal = (state) => state.basket.items.reduce( (total, item) => Number(total) + Number(item.price), 0); */

    export default basketSlice.reducer;