import React from 'react';
import { CtaButton } from '../../utils';
import CurrencyFormat from 'react-currency-format';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../../../reduxslices/basketslice';

function ProductCards({
    id,
    title,
    description,
    category,
    image,
    price
}) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
        };
        dispatch(addToBasket(product) )

        /* TODO: Only one item at a time gets set in localStorage -> need items to add to basket, not overwrite each other */
        localStorage.setItem('items-cart', JSON.stringify([product]))
        ;
    };

  return (
    <div className='productcard-parent-container' key={id}>
        <p className='productcard-category'>{category}</p>

        <figure className='productcard-img-wrapper'>
            <img src={image} className='productcard-img' alt={title}/>
        </figure>

        <h4 className='productcard-title'>{title}</h4>
        <p className='productcard-description'>{description}</p>

        <div className='productcard-price-wrapper'>
            <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} className='productcard-price'/>
        </div>

        <CtaButton className={'productcard-button'} text={"Add to Cart"} onClick={addItemToBasket}/>

    </div>
  )
}

export default ProductCards;