import React from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../../reduxslices/basketslice';
import { Add, Remove } from "@material-ui/icons";

function CheckoutProductCard({ id, title, description, category, image, price }) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = { id, title, description, category, image, price };
        dispatch(addToBasket(product))
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket( {id} ) );
    };

/* TODO: Need to finish component and style: */
  return (
    <div className='checkoutproductcard-parent-container'>
        <div className='checkoutproductcard-details'>

            {/* TODO: Image Section */}
            <figure className='checkoutproductcard-img-wrapper'>
                <img src={image} className='checkoutproductcard-img' alt={title}/>
            </figure>

            {/* TODO: Middle Section */}


            <div>
                <button className='checkoutProductCard-button' onClick={addItemToBasket}>
                    Add Another To Cart
                </button>
                <button className='checkoutProductCard-button' onClick={removeItemFromBasket}>
                    Remove From Cart
                </button>
            </div>

        </div>

        <div className='checkoutproductcard-pricedetails'>

        </div>


    </div>
  )
}

export default CheckoutProductCard;