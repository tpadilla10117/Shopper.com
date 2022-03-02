import React from 'react';
import { CtaButton } from '../../utils';
import CurrencyFormat from 'react-currency-format';

function ProductCards({
    id,
    title,
    description,
    category,
    image,
    price
}) {
  return (
    <div className='productcard-parent-container' key={id}>
        <p className='productcard-category'>{category}</p>

        {/* TODO: Image element */}
        <figure className='productcard-img-wrapper'>
            <img src={image} className='productcard-img' alt={title}/>
        </figure>

        <h4 className='productcard-title'>{title}</h4>
        <p className='productcard-description'>{description}</p>

        <div className='productcard-price-wrapper'>
            <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} className='productcard-price'/>
        </div>

        <CtaButton className={'productcard-button'} text={"Add to Cart"}/>

    </div>
  )
}

export default ProductCards;