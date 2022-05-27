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

            <div className='checkoutproductcard-productdetails'>
                <span className='checkoutproductcard-productname'>
                    <b>Product: </b>{title}
                </span>
                {/* <span className='checkoutproductcard-productid'>
                    
                </span> */}
            </div>

        </div>

        <div className='checkoutproductcard-pricedetails'>
            <div className='checkoutproductcard-productamount-container'>
                <Add onClick={addItemToBasket}  />
                
                <Remove onClick={removeItemFromBasket}/>

            </div>
            <div className='checkoutproductcard-productprice'>
                {price}
            </div>

        </div>


    </div>
  )
}

export default CheckoutProductCard;