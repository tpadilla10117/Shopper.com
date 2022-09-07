import React from 'react';
import { CtaButton } from '../../utils';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { addCartItemCount } from '../../../reduxslices/basketslice';
import {
    Favorite,
} from "@material-ui/icons";

function ProductCards({
    id,
    title,
    description,
    productid,
    image,
    category_id,
    subcategory,
    price,
    quantity
}) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            description,
            productid,
            image,
            category_id,
            subcategory,
            price,
            quantity
        };
        dispatch(addCartItemCount(product) )
    };

  return (
    <div className='productcard-parent-container' key={id}>
        
        <figure className='productcard-img-wrapper'>
            <img src={image} className='productcard-img' alt={title}/>
        </figure>

        <div className='productcard-icon-parent-container'>

            <Favorite 
                className='productcard-favoriteborderoutlined'
                
                /* onClick={(event) => removeSavedItemHandler(event, items.product_id)} */
            />
            {/* <ShoppingCartOutlined 
                className='saveditemspg-shoppingcartoutlined'
            /> */}
        </div>

        <div className='productcard-details-wrapper'>

            <h4 className='productcard-title'>{title}</h4>
            {/* <p className='productcard-description'>{description}</p> */}

            <div className='productcard-price-wrapper'>
                <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} className='productcard-price'/>
            </div>
            
        </div>


        {/* TODO: Dont delete this YET - need to test an add to cart via clicking a product card first*/}

        {/* <CtaButton className={'productcard-button'} text={"Add to Cart"} onClick={addItemToBasket}/> */}

    </div>
  )
}

export default ProductCards;