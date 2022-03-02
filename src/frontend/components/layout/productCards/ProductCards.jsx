import React from 'react';
import {CtaButton} from '../../utils';

function ProductCards({
    id,
    title,
    description,
    category,
    image,
    price
}) {
  return (
    <div className='productcard-parent-container'>
        <p className='productcard-category'>{category}</p>

        {/* TODO: Image element */}
        
        <h4 className='productcard-title'>{title}</h4>
        <p className='prductcard-description'>{description}</p>

        <div className='productcard-price-wrapper'>
            {/* TODO: price element */}
        </div>

        <CtaButton className={'productcard-button'} text={"Add to Cart"}/>

    </div>
  )
}

export default ProductCards;