/* The Product Cards Rendered on the Checkout Pg: */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    addToBasket, 
    removeFromBasket,
    addCartItemCount,
    removeCartItemCount 
} from '../../../reduxslices/basketslice';

import { selectItems } from '../../../reduxslices/basketslice';
import { Add, Remove } from "@material-ui/icons";

function CheckoutProductCard({ cartItem }) {

    const  {
        title,
        image,
        price,
        quantity 
    } = cartItem;

    const dispatch = useDispatch();
    const items = useSelector(selectItems);

    console.log(items)

    /* const addItemToBasket = () => {
        const product = { 
            id,
            title,
            description,
            productid,
            image,
            category_id,
            subcategory,
            price };
        dispatch(addToBasket(product))
    }; */

    /* const removeItemFromBasket = () => {
        dispatch(removeFromBasket( {id} ) );
    }; */

    const addItemHandler = () => {
        dispatch(addCartItemCount( cartItem ));
    };

    const removeItemHandler = () => {
        dispatch(removeCartItemCount ( cartItem ));
    }

  return (
    <div className='checkoutproductcard-parent-container'>
        <div className='checkoutproductcard-details'>

            <figure className='checkoutproductcard-img-wrapper'>
                <img src={image} className='checkoutproductcard-img' alt={title}/>
            </figure>

            <div className='checkoutproductcard-productdetails'>
                <span className='checkoutproductcard-productname'>
                    <b>Product: </b>{title}
                </span>
              {/*   <span className='checkoutproductcard-productid'>
                    <b>SKU: </b>
                </span> */}
            </div>

        </div>

        <div className='checkoutproductcard-pricedetails'>
            <div className='checkoutproductcard-productamount-container'>
                {/* <Add onClick={addItemToBasket}  /> */}
                
                {/* <Remove onClick={removeItemFromBasket}/> */}

            </div>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <br/>
            <div className='checkoutproductcard-productprice'>
                <h3>{price}</h3>
            </div>

        </div>
        
    </div>
    
  )
}

export default CheckoutProductCard;