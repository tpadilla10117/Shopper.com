import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../../reduxslices/basketslice';

function CheckoutProductCard({ id, title, description, category, image, price }) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = { id, title, description, category, image, price };
        dispatch(addToBasket(product))
    };
/* TODO: Need to finish component and style: */
  return (
    <div>CheckoutProductCard


        <button className='checkoutProductCard-button' onClick={addItemToBasket}>
            Add Another To Cart
        </button>
        <button className='checkoutProductCard-button'>
            Remove From Cart
        </button>

    </div>
  )
}

export default CheckoutProductCard;